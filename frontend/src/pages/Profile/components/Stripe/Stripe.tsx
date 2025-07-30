import {
  CoachProfile,
  useGetConnectUrlLazyQuery,
  useGetMyProfileQuery,
  useUpdateVisibilityMutation,
} from "@/graphql/hooks";
import IllustrationStripe from "./IllustrationStripe";
import { toast } from "sonner";
import StripeStatusNotice from "./StripeStatusNotice";
import HowItWorks from "./HowItWorks";
import MarketPlaceInfo from "./MarketPlaceInfo";
import AnimatedWrapper from "@/components/Wrapper/AnimatedWrapper";
import { useEffect, useState } from "react";

type StripeProps = {
  profile: CoachProfile;
  refetch: () => void;
};

export type Visibility = {
  profileVisible: boolean;
  programVisible: boolean;
};

export default function Stripe({ profile, refetch }: StripeProps) {
  const [getConnect, { loading }] = useGetConnectUrlLazyQuery({
    fetchPolicy: "no-cache",
  });
  const { data: dataProfile, loading: loadingProfile } = useGetMyProfileQuery({
    fetchPolicy: "cache-and-network",
  });
  const [udpateVisibility] = useUpdateVisibilityMutation();
  const coachProfile = dataProfile?.getCoachProfile;
  const gotStripeAccount = coachProfile?.stripeAccountId !== null;
  const canSell = coachProfile?.chargesEnabled;
  const canPayout = coachProfile?.payoutsEnabled;
  const onboardingComplete = coachProfile?.detailsSubmitted;
  const [visibility, setVisibility] = useState<Visibility>({
    profileVisible: true,
    programVisible: true,
  });

  useEffect(() => {
    setVisibility({
      profileVisible: profile?.profileVisible,
      programVisible: profile?.programVisible,
    });
  }, [profile]);

  const handleCreatePortailStripe = async () => {
    try {
      const { data } = await getConnect();
      if (data?.getConnectUrl) {
        const connectUrl = data?.getConnectUrl;
        if (canSell && canPayout) {
          window.open(connectUrl);
        } else {
          window.location.href = connectUrl;
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur est survenue lors de la redirection vers Stripe."
      );
    }
  };

  const handleUpdateVisibility = async (
    value: boolean,
    key: "profileVisible" | "programVisible"
  ) => {
    setVisibility({
      ...visibility,
      [key]: value,
    });
    try {
      const { data } = await udpateVisibility({
        variables: {
          [key]: value,
        },
      });
      if (data?.updateVisibility) {
        toast.success(data.updateVisibility, {
          style: {
            backgroundColor: "#dcfce7",
            color: "#15803d",
          },
        });
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur est survenue lors de la suppression du programme"
      );
    }
  };

  return (
    <AnimatedWrapper className="w-full h-full pb-4">
      <section className="w-full px-4">
        <IllustrationStripe
          onConnect={handleCreatePortailStripe}
          loading={loading}
          gotStripeAccount={gotStripeAccount}
          canSell={canSell}
          canPayout={canPayout}
          loadingProfile={loadingProfile}
        />
      </section>
      {!loadingProfile && (
        <section className="p-4 w-[50%]">
          <StripeStatusNotice
            canSell={canSell}
            canPayout={canPayout}
            onboardingComplete={onboardingComplete}
          />
        </section>
      )}
      <section className="w-[70%] flex justify-start items-start p-4">
        <HowItWorks />
      </section>
      <section className="w-[70%] flex justify-start items-start p-4">
        <MarketPlaceInfo
          visibility={visibility}
          onChange={handleUpdateVisibility}
        />
      </section>
    </AnimatedWrapper>
  );
}
