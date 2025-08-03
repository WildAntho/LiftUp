import { useNavigate, useParams } from "react-router-dom";
import {
  Program,
  ProgramLevel,
  useGetOneProgramMarketPlaceQuery,
  useSubscribeProgramMutation,
} from "@/graphql/hooks";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { Badge } from "@/components/ui/badge";
import BuyForm from "./components/BuyForm";
import AboutProgram from "./components/AboutProgram";
import Instruction from "./components/Instruction";
import Overview from "./components/Overview";

export default function ProgramInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useGetOneProgramMarketPlaceQuery({
    variables: {
      id: id as string,
    },
    skip: !id,
  });
  const [subscribe, { loading: loadingSubscribe }] =
    useSubscribeProgramMutation();
  const program = data?.getOneProgramMarketPlace.program;
  const trainingCount = data?.getOneProgramMarketPlace.trainingsCount;

  const renderLevel = (level: ProgramLevel) => {
    switch (level) {
      case ProgramLevel.Advanced:
        return "Avancé";
      case ProgramLevel.Intermediate:
        return "Intermédiaire";
      case ProgramLevel.Beginner:
        return "Débutant";
    }
  };

  const handleSubscribe = async (startDate: string, politic: boolean) => {
    try {
      const { data } = await subscribe({
        variables: {
          coachId: program?.coach.id as string,
          programId: program?.id as string,
          startDate: new Date(startDate),
          politic,
        },
      });

      if (data?.subscribeProgram) {
        window.location.href = data.subscribeProgram;
      } else {
        console.error("Aucune URL Stripe renvoyée.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!loading ? (
        <section className="flex flex-col justify-start items-center h-full w-full overflow-y-scroll">
          <div className="relative w-full h-[250px] flex justify-start items-center">
            <div className="relative w-full h-full">
              <img
                src="/bannerprogram.webp"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <div className="absolute left-16 flex justify-start items-center gap-2 text-white z-1">
              <UserAvatar
                radius="md"
                className="w-[120px] h-[120px]"
                avatar={program?.coach?.avatar ?? ""}
              />
              <div className="flex flex-col items-start justify-center gap-2">
                <p className="pl-2 text-4xl font-semibold">{program?.title}</p>
                <p className="pl-2 text-md font-semibold">
                  {program?.coach?.firstname + " " + program?.coach?.lastname}
                </p>
                <div className="flex justify-start items-center gap-2">
                  <Badge>{program?.level && renderLevel(program.level)}</Badge>
                  <Badge>{program?.category?.label}</Badge>
                  <Badge className="text-green-500">
                    {program?.duration} semaines
                  </Badge>
                </div>
              </div>
            </div>
          </div>
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
          <section className="p-4 w-full h-full">
            <section className="gap-4 flex justify-start items-start">
              <section className="w-[70%] h-full flex flex-col gap-4 pb-4">
                <section className="w-full bg-white rounded-2xl p-6">
                  <Overview
                    program={program as Program}
                    trainingCount={trainingCount}
                  />
                </section>
                <section className="w-full bg-white rounded-2xl p-6">
                  {program?.description ? (
                    <AboutProgram program={program as Program} />
                  ) : (
                    <p className="text-xs">Aucune information renseignée</p>
                  )}
                </section>
                <section className="w-full bg-white rounded-2xl p-6">
                  <Instruction />
                </section>
              </section>
              <section className="sticky top-4 w-[30%] bg-white rounded-2xl p-4 shadow-md">
                <BuyForm
                  program={program as Program}
                  coachId={id}
                  onSubscribe={handleSubscribe}
                  loading={loadingSubscribe}
                />
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
