import { Separator } from "@/components/ui/separator";
import imgDefault from "../../../../public/default.jpg";
import {
  useCancelMembershipMutation,
  useGetMyCoachQuery,
  useGetMyMembershipQuery,
} from "@/graphql/hooks";
import { uploadURL } from "@/services/utils";
import { Avatar, Button } from "@heroui/react";
import {
  BadgeEuro,
  CheckCircle,
  HandCoins,
  Ban,
  Handshake,
  Info,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useState } from "react";
import { toast } from "sonner";

export default function Coaching() {
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const { data: dataCoach } = useGetMyCoachQuery({
    fetchPolicy: "no-cache",
  });
  const { data: dataMembership } = useGetMyMembershipQuery({
    fetchPolicy: "no-cache",
  });
  const [canceMembership] = useCancelMembershipMutation();
  const myCoach = dataCoach?.getMyCoach;
  const myMembership = dataMembership?.getMembership;

  const handleCancelMembership = async () => {
    try {
      const { data } = await canceMembership();
      toast.success(data?.cancelMembership, {
        style: {
          backgroundColor: "#dcfce7",
          color: "#15803d",
        },
      });
      navigate("/home");
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur est survenue lors de la clôture de votre souscription"
      );
    }
  };
  return (
    <section className="w-full h-full flex flex-col justify-start items-start bg-white rounded-2xl mx-10 pb-8 gap-4 mt-5">
      <ConfirmModal
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        description="Êtes-vous sûr de vouloir clôturer votre souscription ?"
        title="Clôture"
        additionalContent={
          <p className="text-xs text-gray-500 font-semibold flex justify-start items-center gap-1">
            <Info size={16} />
            Vous serez automatiquement supprimez de la liste d'élève de votre
            coach
          </p>
        }
        onConfirm={handleCancelMembership}
      />
      {myCoach ? (
        <section className="w-[50%] 2xl:w-[40%] rounded-xl bg-gray-50 bg-opacity-50 border border-gray-100 shadow-md p-8 mt-10 flex flex-col gap-4">
          <section className="w-full flex flex-col items-start justify-start gap-6">
            <div className="w-full">
              <div className="flex justify-start items-center gap-2">
                <HandCoins className="size-6" />
                <p className="text-lg font-semibold">Mon coach</p>
              </div>
              <Separator className="mt-2 mb-4" />
              <div className="flex justify-start items-center gap-2 my-5">
                <Avatar
                  size="lg"
                  src={
                    myCoach.avatar
                      ? `${uploadURL + myCoach.avatar}`
                      : imgDefault
                  }
                />
                <div className="flex flex-col items-start justify-center">
                  <p className="text-md font-semibold text-dark">
                    {myCoach.firstname + " " + myCoach.lastname}
                  </p>
                  <p className="text-sm text-gray-500">{myCoach.email}</p>
                </div>
              </div>
            </div>
            <div className="w-full">
              {myMembership ? (
                <div className="w-full">
                  <div className="flex justify-start items-center gap-2">
                    <BadgeEuro className="size-6" />
                    <p className="text-lg font-semibold">Mon abonnement</p>
                  </div>
                  <Separator className="mt-2 mb-4" />
                  <div className="w-full my-6">
                    <div className="w-full">
                      <h2 className="text-lg font-semibold text-dark">
                        {myMembership.offer.name}
                      </h2>
                      <p className="text-gray-500 mt-2 text-sm max-w-lg">
                        {myMembership.offer.description}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center text-green-500">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="text-green-500 font-medium text-xs">
                        Valide jusqu'au{" "}
                        {format(myMembership.endDate, "d MMMM yyyy", {
                          locale: fr,
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex justify-end mt-4">
                    <Button
                      data-testid="saving-button"
                      className="group shadow-none text-white h-[55px] w-[230px] rounded-xl bg-red-500 hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
                      startContent={<Ban size={16} />}
                      onPress={() => setOpenConfirm(true)}
                    >
                      <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
                        Clôturer mon abonnement
                      </p>
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 font-semibold">
                  Votre abonnement n'a pas encore été activé par votre coach
                </p>
              )}
            </div>
          </section>
        </section>
      ) : (
        <section className="w-[50%] 2xl:w-[30%] 2xl:h-[30%] h-[50%] rounded-xl bg-gray-50 bg-opacity-50 border border-gray-100 shadow-md p-8 mt-10 flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-2xl font-semibold text-center text-gray-500">
              Vous n'avez pas encore de coach
            </h2>
            <div className="flex flex-col justify-center items-center">
              <p className="text-md text-gray-400 text-center">
                Besoin d'un coach ?
              </p>
              <p className="text-md text-gray-400 text-center">
                Rendez vous sur le market place
              </p>
            </div>
            <Button
              data-testid="saving-button"
              className="group shadow-none my-5 text-white h-[55px] w-[230px] rounded-xl bg-primary hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
              startContent={<Handshake size={16} />}
              onPress={() => navigate("/coach")}
            >
              <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
                Trouver un coach
              </p>
            </Button>
          </div>
        </section>
      )}
    </section>
  );
}
