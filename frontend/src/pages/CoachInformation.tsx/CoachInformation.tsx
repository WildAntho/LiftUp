import { useNavigate, useParams } from "react-router-dom";
import RequestForm from "./components/RequestForm";
import {
  CoachProfile,
  Offer,
  useGetOneCoachOffersQuery,
  useGetOneCoachProfileQuery,
} from "@/graphql/hooks";
import AboutCoach from "./components/AboutCoach";
import OffersCoach from "./components/OffersCoach";
import SocialCoach from "./components/SocialCoach";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { Badge } from "@/components/ui/badge";

type CoachInformationProps = {
  prevId?: string;
};

export default function CoachInformation({ prevId }: CoachInformationProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: dataOffers, loading: loadingOffers } =
    useGetOneCoachOffersQuery({
      variables: { id: prevId ? prevId : (id as string) },
      fetchPolicy: "cache-and-network",
    });
  const { data: dataProfile, loading: loadingProfile } =
    useGetOneCoachProfileQuery({
      variables: { id: prevId ? prevId : (id as string) },
      fetchPolicy: "cache-and-network",
    });
  const offers = dataOffers?.getOneCoachOffers ?? [];
  const profile = dataProfile?.getOneCoachProfile as CoachProfile;
  const availableOffers = offers.filter((offer) => offer.availability);

  return (
    <>
      {!loadingOffers || !loadingProfile ? (
        <section className="flex flex-col justify-start items-center h-full w-full overflow-y-scroll">
          <div className="relative w-full h-[250px] flex justify-start items-center">
            <div className="relative w-full h-full">
              <img src="/banner.jpg" className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <div className="absolute left-16 flex justify-start items-center gap-2 text-white z-1">
              <UserAvatar
                radius="md"
                className="w-[120px] h-[120px]"
                avatar={profile?.user?.avatar ?? ""}
              />
              <div className="flex flex-col items-start justify-center gap-2">
                <p className="pl-2 text-4xl font-semibold">
                  {profile?.user?.firstname + " " + profile?.user?.lastname}
                </p>
                <p className="pl-2 text-md font-semibold">{profile?.name}</p>
                <div className="flex justify-start items-center gap-2">
                  {profile?.specialisation?.map((s, i) => (
                    <Badge key={i} className="font-semibold">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <section className="w-full">
            {!prevId && (
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
            )}
          </section>
          <section className="p-4 w-full h-full">
            <section className="gap-4 flex justify-start items-start">
              <section
                className={`${
                  prevId ? "w-full" : "w-[70%]"
                } h-full flex flex-col gap-4`}
              >
                <section className="w-full bg-white rounded-2xl p-6">
                  {profile ? (
                    <AboutCoach profile={profile} />
                  ) : (
                    <p className="text-xs">Aucune information renseignée</p>
                  )}
                </section>
                <section className="w-full bg-white rounded-2xl p-6">
                  {offers.length > 0 ? (
                    <OffersCoach offers={offers as Offer[]} />
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
              {!prevId && (
                <section className="sticky top-4 w-[30%] bg-white rounded-2xl p-4 shadow-md">
                  <RequestForm
                    offers={availableOffers as Offer[]}
                    coachId={id}
                  />
                </section>
              )}
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
