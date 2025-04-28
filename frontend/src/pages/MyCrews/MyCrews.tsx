import CrewCard from "@/components/CrewCard";
import CrewModal from "@/components/modals/CrewModal";
import { Button } from "@/components/ui/button";
import { useGetCoachCrewsQuery } from "@/graphql/hooks";
import { UserWithoutPassword } from "@/services/zustand/userStore";
import { Info, PlusCircle } from "lucide-react";
import { useState } from "react";

export default function MyCrews() {
  const [open, setOpen] = useState<boolean>(false);
  const onClose = () => {
    setOpen(false);
  };
  const { data, refetch } = useGetCoachCrewsQuery({
    fetchPolicy: "no-cache",
  });
  const allCrews = data?.getCoachCrews ?? [];

  return (
    <>
      <CrewModal open={open} onClose={onClose} refetch={refetch} />
      <section className="h-full w-full p-4 gap-4 flex justify-center items-center">
        <section className="w-[80%] 2xl:w-[60%] h-full bg-white rounded-2xl flex flex-col justify-start items-center overflow-y-scroll gap-7">
          <section className="w-[90%] h-full p-5 flex flex-col items-start justify-start gap-7 mt-7">
            <div className="w-full flex justify-between items-center">
              <p className="text-xs text-gray-500 flex justify-start items-center gap-4 max-w-[60%]">
                <Info size={40} />
                Si vous souhaitez assigner une offre à une équipe, vous pouvez
                créer une équipe sans élève et ensuite assigner une offre à
                cette équipe dans la section "Profil / Mes offres". Les élèves
                qui souscriront à l'offre seront automatiquement ajoutés à
                l'équipe.
              </p>
              <Button
                className="group h-12 w-[300px] text-black bg-gray-100 hover:bg-gray-200 border border-black rounded-xl hover:translate-y-[-2px] hover:shadow-md transition-all duration-200"
                onClick={() => setOpen(true)}
              >
                <PlusCircle className="transition-all duration-200 group-hover:rotate-90" />
                <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
                  Créer une nouvelle équipe
                </p>
              </Button>
            </div>
            <section className="flex justify-start items-start flex-wrap w-full gap-2">
              {allCrews?.map((crew) => (
                <div
                  key={crew.id}
                  className="relative w-[49%] h-[100px] p-4 rounded-2xl border border-gray-100 hover:border-gray-300"
                >
                  <CrewCard
                    id={crew.id}
                    name={crew.name}
                    students={crew.students as UserWithoutPassword[]}
                    refetch={refetch}
                    isEditable={true}
                  />
                </div>
              ))}
            </section>
          </section>
        </section>
      </section>
    </>
  );
}
