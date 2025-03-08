import { useNavigate, useParams } from "react-router-dom";
import RequestForm from "./components/RequestForm";
import {
  CoachProfile,
  useGetOneCoachOffersQuery,
  useGetOneCoachProfileQuery,
} from "@/graphql/hooks";
import AboutCoach from "./components/AboutCoach";
import OffersCoach from "./components/OffersCoach";
import SocialCoach from "./components/SocialCoach";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";

export default function CoachInformation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: dataOffers, loading: loadingOffers } =
    useGetOneCoachOffersQuery({
      variables: { id: id as string },
    });
  const { data: dataProfile, loading: loadingProfile } =
    useGetOneCoachProfileQuery({
      variables: { id: id as string },
    });
  const offers = dataOffers?.getOneCoachOffers ?? [];
  const profile = dataProfile?.getOneCoachProfile as CoachProfile;
  const availableOffers = offers.filter((offer) => offer.availability);
  return (
    <>
      {!loadingOffers || !loadingProfile ? (
        <section className="flex flex-col justify-start items-center h-full w-full overflow-y-scroll">
          <section className="w-full">
            <div className="w-full pl-5 flex justify-start items-start gap-1 p-2">
              <Button
                variant="link"
                className="group p-0 opacity-70 hover:opacity-100"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft className="opacity-50 group-hover:opacity-100" />
                Retour
              </Button>
            </div>
          </section>
          <section className="px-4 pb-4 w-full h-full">
            <section className="h-full gap-4 flex justify-start items-start">
              <section className="w-[70%] h-full flex flex-col gap-4">
                <section className="w-full bg-white rounded-2xl p-6">
                  {profile ? (
                    <AboutCoach profile={profile} />
                  ) : (
                    <p className="text-xs">Aucune information renseignée</p>
                  )}
                </section>
                <section className="w-full bg-white rounded-2xl p-6">
                  {offers.length > 0 ? (
                    <OffersCoach offers={offers} />
                  ) : (
                    <p className="text-xs">Aucune offre renseignée</p>
                  )}
                </section>
                {profile && (
                  <section className="w-full px-6 pb-4 flex justify-end">
                    <SocialCoach profile={profile} />
                  </section>
                )}
              </section>
              <section className="sticky top-4 w-[30%] bg-white rounded-2xl p-4 shadow-md">
                <RequestForm offers={availableOffers} coachId={id} />
              </section>
            </section>
          </section>
        </section>
      ) : (
        <section className="w-full h-full flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </section>
      )}
    </>
  );
}
