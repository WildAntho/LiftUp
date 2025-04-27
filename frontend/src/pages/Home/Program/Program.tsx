import ProgramModal from "@/components/modals/ProgramModal/ProgramModal";
import Configuration from "./components/Configuration";
import { Button } from "@/components/ui/button";
import {
  Plus,
  PlusCircle,
  Search,
  Loader2,
  CircleCheckBig,
  NotepadTextDashed,
  Archive,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ProgramCard from "./components/ProgramCard";
import {
  ProgramStatus,
  useArchiveProgramMutation,
  useGetMyProgramsQuery,
  useValidateProgramMutation,
} from "@/graphql/hooks";
import { Input } from "@heroui/react";
import { toast } from "sonner";
import StatusCard from "./components/StatusCard";

export default function Program() {
  // const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeSection = searchParams.get("section");
  const isConfiguration = activeSection === "configuration";
  const [openProgramModal, setOpenProgramModal] = useState(false);
  const [input, setInput] = useState("");
  const [activeCard, setActiveCard] = useState<ProgramStatus>(
    ProgramStatus.Published
  );
  const { data, loading, refetch } = useGetMyProgramsQuery({
    variables: {
      status: activeCard,
    },
  });
  const [archiveProgram] = useArchiveProgramMutation();
  const [validateProgram] = useValidateProgramMutation();
  const myPrograms = data?.getPrograms ?? [];

  const handleDeleteProgram = async (id: string) => {
    try {
      const { data } = await archiveProgram({ variables: { id } });
      toast.success(data?.archiveProgram, {
        style: {
          backgroundColor: "#dcfce7",
          color: "#15803d",
        },
      });
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de l'archivage du programme");
    }
  };

  const handleValidateProgram = async (id: string) => {
    try {
      const { data } = await validateProgram({ variables: { id } });
      toast.success(data?.publishProgram, {
        style: {
          backgroundColor: "#dcfce7",
          color: "#15803d",
        },
      });
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la validation du programme");
    }
  };
  return (
    <section className="relative w-full h-full flex flex-col justify-start items-center rounded-2xl px-4 py-8 gap-4">
      {!isConfiguration && (
        <section className="w-full flex flex-col justify-start items-center rounded-2xl gap-4 py-10 mt-4 overflow-y-scroll">
          <section className="w-[80%] flex justify-between items-center">
            <section className="flex justify-start items-start gap-4">
              <div onClick={() => setActiveCard(ProgramStatus.Published)}>
                <StatusCard
                  icon={<CircleCheckBig />}
                  title="Terminés"
                  description="Programmes terminés"
                  type={ProgramStatus.Published}
                  isActive={activeCard === ProgramStatus.Published}
                />
              </div>
              <div onClick={() => setActiveCard(ProgramStatus.Draft)}>
                <StatusCard
                  icon={<NotepadTextDashed />}
                  title="Brouillon"
                  description="Programmes en cours"
                  type={ProgramStatus.Draft}
                  isActive={activeCard === ProgramStatus.Draft}
                />
              </div>
              <div onClick={() => setActiveCard(ProgramStatus.Archived)}>
                <StatusCard
                  icon={<Archive />}
                  title="Archivés"
                  description="Programmes archivés"
                  type={ProgramStatus.Archived}
                  isActive={activeCard === ProgramStatus.Archived}
                />
              </div>
            </section>
            <div className="flex justify-end items-center">
              <Button
                className="group shadow-none text-tertiary h-12 w-auto rounded-xl bg-tertiary bg-opacity-20 border border-tertiary border-opacity-20 hover:bg-tertiary hover:bg-opacity-20 hover:translate-y-[-2px] hover:shadow-sm transition-all duration-200"
                onClick={() => setOpenProgramModal(true)}
              >
                <PlusCircle className="transition-all duration-200 group-hover:rotate-90" />
                <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
                  Créer un nouveau programme
                </p>
              </Button>
            </div>
          </section>
          <section className="w-[80%] bg-gray-50 bg-opacity-50 border border-gray-100 shadow-md p-4 flex flex-col justify-start items-start rounded-xl gap-8">
            <Input
              labelPlacement="outside"
              placeholder="Rechercher un programme"
              capture
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInput(e.target.value);
              }}
              startContent={
                <Search className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              type="search"
            />
            {loading ? (
              <div className="w-full h-[200px] flex justify-center items-center">
                <Loader2 className="w-8 h-8 text-black animate-spin" />
              </div>
            ) : myPrograms.length > 0 ? (
              <div className="w-full flex flex-wrap justify-start items-start gap-4">
                {myPrograms.map((program) => (
                  <div key={program.id} className="w-[30%] h-[350px]">
                    <ProgramCard
                      id={program.id}
                      title={program.title}
                      description={program.description ?? ""}
                      status={program.status}
                      duration={program.duration}
                      isPublic={program.public}
                      onDelete={handleDeleteProgram}
                      onValidate={handleValidateProgram}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center gap-2">
                <p className="text-gray-600 text-sm">
                  {activeCard === ProgramStatus.Published
                    ? "Aucun programme terminé pour le moment"
                    : activeCard === ProgramStatus.Draft
                    ? "Aucun programme en cours pour le moment"
                    : "Aucun programme archivé pour le moment"}
                </p>
                {activeCard === ProgramStatus.Published && (
                  <>
                    <p className="text-gray-500 text-xs">
                      Créez un nouveau programme
                    </p>
                    <div
                      className="group rounded-full my-2 cursor-pointer text-tertiary border border-tertiary border-opacity-20 bg-tertiary bg-opacity-20 shadow-sm p-2 hover:translate-y-[-2px] hover:shadow-md transition-all duration-200"
                      onClick={() => setOpenProgramModal(true)}
                    >
                      <Plus className="transition-all duration-200 group-hover:rotate-90" />
                    </div>
                  </>
                )}
              </div>
            )}
          </section>
        </section>
      )}
      {isConfiguration && <Configuration />}
      <ProgramModal
        open={openProgramModal}
        onClose={() => setOpenProgramModal(false)}
        refetch={refetch}
      />
    </section>
  );
}
