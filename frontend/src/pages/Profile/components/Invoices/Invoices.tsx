import {
  Invoice,
  ProfileSubscription,
  ProfileSubscriptionStatus,
  useCancelProfileSubscriptionMutation,
  useGetCurrentProfileSubscriptionQuery,
  useGetInvoicesQuery,
  useGetPortailStripLazyQuery,
  useGetUserProgramsQuery,
  useReactivateProfileSubscriptionMutation,
  UserProgram,
} from "@/graphql/hooks";
import TabInvoices from "./TabInvoices";
import IllustrationComponent from "./IllustrationComponent";
import FloatingDockInvoice from "./FloatingDockInvoice";
import TabProgramReceip from "./TabProgramReceip";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@heroui/react";
import { FaStar } from "react-icons/fa";
import { useUserStore } from "@/services/zustand/userStore";
import MembershipView from "./MembershipView";
import SubscriptionModal from "./SubscriptionModal";
import AnimatedWrapper from "@/components/AnimatedWrapper";

export default function Invoices() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useUserStore((state) => state.user);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [getPortail, { loading }] = useGetPortailStripLazyQuery({
    fetchPolicy: "no-cache",
  });
  const { data: dataProfileSub, refetch: refetchSubscription } =
    useGetCurrentProfileSubscriptionQuery({
      fetchPolicy: "no-cache",
    });
  const [cancelSubscription, { loading: loadingCancel }] =
    useCancelProfileSubscriptionMutation();
  const [reactivateSubscription, { loading: loadingReactivate }] =
    useReactivateProfileSubscriptionMutation();

  // Récupère les paramètres de l'URL
  const searchParams = new URLSearchParams(location.search);
  const sectionParam = searchParams.get("section");

  const { data, refetch: refetchInvoice } = useGetInvoicesQuery({
    fetchPolicy: "no-cache",
  });
  const { data: dataProgram } = useGetUserProgramsQuery();
  const allInvoices = data?.getInvoices ?? [];
  const allPrograms = dataProgram?.getUserPrograms ?? [];
  const currentSubscription = dataProfileSub?.getCurrentProfileSubscription;

  const getParams = (value?: string | null) => {
    switch (value) {
      case "subscription":
        return "SUBSCRIPTION";
      case "membership":
        return "INVOICE";
      case "program":
        return "PROGRAM";
      default:
        return "SUBSCRIPTION";
    }
  };
  const [active, setActive] = useState<"SUBSCRIPTION" | "INVOICE" | "PROGRAM">(
    getParams(sectionParam) ?? "SUBSCRIPTION"
  );

  const onChangeActive = (value: "SUBSCRIPTION" | "INVOICE" | "PROGRAM") => {
    setActive(value);
  };

  const handleCreatePortailStripe = async () => {
    try {
      const { data } = await getPortail();
      if (data?.getPortailStrip) {
        const portailUrl = data?.getPortailStrip;
        window.location.href = portailUrl;
      } else {
        toast.info(
          <div className="flex justify-center items-center gap-2 text-sm text-gray-800">
            Tu n’as pas encore d’abonnement.{" "}
            <Button
              onPress={() => navigate("/pricing")}
              className="text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600"
              isIconOnly
            >
              <FaStar />
            </Button>
          </div>
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur est survenue lors de la redirection vers Stripe."
      );
    }
  };

  const handleSubscription = async () => {
    try {
      if (currentSubscription?.status === ProfileSubscriptionStatus.Active) {
        const { data } = await cancelSubscription();
        if (data?.cancelProfileSubscription) {
          setOpenModal(true);
        }
      }
      if (
        currentSubscription?.status === ProfileSubscriptionStatus.ScheduleCancel
      ) {
        const { data } = await reactivateSubscription();
        if (data?.reactivateProfileSubscription) {
          setOpenModal(true);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur est survenue lors de la redirection vers Stripe."
      );
    }
  };

  const handleCloseModal = () => {
    refetchSubscription();
    refetchInvoice();
    setOpenModal(false);
  };

  const renderTitle = () => {
    switch (currentSubscription?.status) {
      case ProfileSubscriptionStatus.Active:
        return "Abonnement résilié avec succès";
      case ProfileSubscriptionStatus.ScheduleCancel:
        return "Abonnement réactivé avec succès";
      default:
        return "";
    }
  };

  const renderDescription = () => {
    switch (currentSubscription?.status) {
      case ProfileSubscriptionStatus.Active:
        return "Ton abonnement a été annulé. Tu continueras à bénéficier de nos services jusqu'à la fin de ta période de facturation actuelle le";
      case ProfileSubscriptionStatus.ScheduleCancel:
        return "Ton abonnement a été réactivé. Tu n'as rien d'autre à faire on s'occupe de tout !";
      default:
        return "";
    }
  };

  const renderDate = () => {
    switch (currentSubscription?.status) {
      case ProfileSubscriptionStatus.Active:
        return currentSubscription.currentPeriodEnd;
      case ProfileSubscriptionStatus.ScheduleCancel:
        return undefined;
      default:
        return undefined;
    }
  };
  return (
    <AnimatedWrapper className="w-full h-full pb-4">
      <SubscriptionModal
        isOpen={openModal}
        onClose={handleCloseModal}
        title={renderTitle()}
        description={renderDescription()}
        date={renderDate()}
      />
      <section className="w-full px-4">
        <IllustrationComponent
          onStripe={handleCreatePortailStripe}
          loading={loading}
        />
      </section>
      <section className="w-full h-full pb-10 mb-5">
        {active === "SUBSCRIPTION" && (
          <div className="w-[60%] 2xl:w-[50%]">
            <MembershipView
              isMaestro={currentUser?.profile !== null}
              currentSubscription={currentSubscription as ProfileSubscription}
              onAction={handleSubscription}
              loading={loadingCancel || loadingReactivate}
            />
          </div>
        )}
        {active === "INVOICE" && (
          <TabInvoices invoices={allInvoices as Invoice[]} />
        )}
        {active === "PROGRAM" && (
          <TabProgramReceip programs={allPrograms as UserProgram[]} />
        )}
          <FloatingDockInvoice onChange={onChangeActive} active={active} />
      </section>
    </AnimatedWrapper>
  );
}
