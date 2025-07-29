import {
  useGetConnectUrlLazyQuery,
  useGetMyProfileQuery,
} from "@/graphql/hooks";
import IllustrationStripe from "./IllustrationStripe";
import { toast } from "sonner";
import StripeStatusNotice from "./StripeStatusNotice";
import HowItWorks from "./HowItWorks";
import MarketPlaceInfo from "./MarketPlaceInfo";
import AnimatedWrapper from "@/components/AnimatedWrapper";

export default function Stripe() {
  const [getConnect, { loading }] = useGetConnectUrlLazyQuery({
    fetchPolicy: "no-cache",
  });
  const { data: dataProfile, loading: loadingProfile } = useGetMyProfileQuery({
    fetchPolicy: "cache-and-network",
  });
  const coachProfile = dataProfile?.getCoachProfile;
  const gotStripeAccount = coachProfile?.stripeAccountId !== null;
  const canSell = coachProfile?.chargesEnabled;
  const canPayout = coachProfile?.payoutsEnabled;
  const onboardingComplete = coachProfile?.detailsSubmitted;

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
        <MarketPlaceInfo />
      </section>
    </AnimatedWrapper>
  );
}
