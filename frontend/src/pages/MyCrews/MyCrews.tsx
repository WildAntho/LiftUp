import CrewCard from "@/components/CrewCard";
import CrewModal from "@/components/modals/CrewModal";
import { Button } from "@/components/ui/button";
import { useGetCoachCrewsQuery } from "@/graphql/hooks";
import { UserWithoutPassword } from "@/services/zustand/userStore";
import { Info, Plus } from "lucide-react";
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
      <section className="h-full w-full pt-4 pb-4 gap-4 flex justify-center items-center">
        <section className="w-[80%] h-full bg-white rounded-2xl flex flex-col justify-start items-center overflow-y-scroll gap-7">
          <section className="w-[90%] h-full p-5 flex flex-col items-start justify-start gap-7">
            <div className="w-full">
              <Button
                type="button"
                className="bg-primary hover:bg-blue-600"
                onClick={() => setOpen(true)}
              >
                <Plus /> Créer une nouvelle équipe
              </Button>
            </div>
            <p className="text-xs text-gray-500 flex justify-start items-center gap-4 w-[70%]">
              <Info size={40} />
              Si vous souhaitez assigner une offre à une équipe, vous pouvez
              créer une équipe sans élève et ensuite assigner une offre à cette
              équipe dans la section "Profil / Mes offres". Les élèves qui
              souscriront à l'offre seront automatiquement ajoutés à l'équipe.
            </p>
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
