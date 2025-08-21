import ProgramModal from "@/components/modals/ProgramModal/ProgramModal";
import { Button } from "@/components/ui/button";
import { Plus, PlusCircle, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProgramCard from "./components/ProgramCard";
import {
  ProgramLevel,
  ProgramStatus,
  UpdateProgramInput,
  useArchiveProgramMutation,
  useDeleteProgramMutation,
  useGenerateProgramMutation,
  useGetMyProgramsQuery,
  UserRole,
  useUpdateProgramMutation,
  useValidateProgramMutation,
} from "@/graphql/hooks";
import { Input } from "@heroui/react";
import { toast } from "sonner";
import StatusCard from "./components/StatusCard";
import { useProgramStore } from "@/services/zustand/programStore";
import { useUserStore } from "@/services/zustand/userStore";
import { FaCheckCircle } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import { BiSolidNotepad } from "react-icons/bi";
import { useRole } from "@/services/hooks/useRole";
import AnimatedWrapper from "@/components/Wrapper/AnimatedWrapper";
import { ApolloError } from "@apollo/client";
import Configuration from "./Configuration/Configuration";

export default function Program() {
  const currentUser = useUserStore((state) => state.user);
  const isCoach = useRole(UserRole.Coach);
  const setProgram = useProgramStore((state) => state.set);
  const navigate = useNavigate();
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
    fetchPolicy: "cache-and-network",
  });
  const [updateProgram] = useUpdateProgramMutation();
  const [archiveProgram] = useArchiveProgramMutation();
  const [validateProgram] = useValidateProgramMutation();
  const [deleteProgram] = useDeleteProgramMutation();
  const [generateProgram] = useGenerateProgramMutation();
  const myPrograms = data?.getPrograms ?? [];

  useEffect(() => {
    if (!isCoach) {
      navigate("/home");
    }
  }, [currentUser, navigate, isCoach]);

  const handleArchiveProgram = async (id: string) => {
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

  const handleDeleteProgram = async (id: string) => {
    try {
      const { data } = await deleteProgram({ variables: { id } });
      toast.success(data?.deleteProgram, {
        style: {
          backgroundColor: "#dcfce7",
          color: "#15803d",
        },
      });
      refetch();
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur est survenue lors de la suppression du programme"
      );
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

  const handleUpdateProgram = async (
    id: string,
    program: UpdateProgramInput
  ) => {
    try {
      const { data } = await updateProgram({
        variables: {
          data: program,
          id,
        },
      });
      toast.success(data?.updateProgram, {
        style: {
          backgroundColor: "#dcfce7",
          color: "#15803d",
        },
      });
      setProgram({
        id,
        ...program,
        description: program.description ?? undefined,
        status: program.status as ProgramStatus,
        price: program.price as number,
        level: program.level as ProgramLevel,
        categoryId: program.categoryId as string,
      });
      refetch();
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.message, {
          style: {
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
          },
        });
      }
    }
  };

  const handleGenerateProgram = async (
    programId: string,
    startDate: Date,
    userIds: string[]
  ) => {
    try {
      const { data } = await generateProgram({
        variables: {
          userIds,
          programId,
          coachId: currentUser?.id.toString() as string,
          startDate,
        },
      });
      toast.success(data?.generateProgram, {
        style: {
          backgroundColor: "#dcfce7",
          color: "#15803d",
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la validation du programme");
    }
  };

  return (
    <section className="relative w-full h-full flex flex-col justify-start items-center bg-white rounded-2xl px-4 pt-10 gap-4">
      {!isConfiguration && (
        <section className="w-full h-full flex flex-col justify-start items-center rounded-2xl gap-4 pt-6 pb-4">
          <section className="w-[90%] 2xl:w-[85%] flex justify-between items-center gap-2">
            <AnimatedWrapper
              animation="slideUp"
              className="flex justify-start items-start gap-2 overflow-x-scroll"
            >
              <div onClick={() => setActiveCard(ProgramStatus.Published)}>
                <StatusCard
                  icon={<FaCheckCircle size={20} />}
                  title="Terminés"
                  description="Programmes terminés"
                  type={ProgramStatus.Published}
                  isActive={activeCard === ProgramStatus.Published}
                />
              </div>
              <div onClick={() => setActiveCard(ProgramStatus.Draft)}>
                <StatusCard
                  icon={<BiSolidNotepad size={22} />}
                  title="Brouillon"
                  description="Programmes en cours"
                  type={ProgramStatus.Draft}
                  isActive={activeCard === ProgramStatus.Draft}
                />
              </div>
              <div onClick={() => setActiveCard(ProgramStatus.Archived)}>
                <StatusCard
                  icon={<FaBoxArchive size={18} />}
                  title="Archivés"
                  description="Programmes archivés"
                  type={ProgramStatus.Archived}
                  isActive={activeCard === ProgramStatus.Archived}
                />
              </div>
            </AnimatedWrapper>
            <AnimatedWrapper
              animation="slideLeft"
              className="h-full flex items-end"
            >
              <Button
                data-testid="create-program-button"
                className="group shadow-none text-tertiary h-12 w-auto rounded-xl bg-tertiary bg-opacity-20 border border-tertiary border-opacity-20 hover:bg-tertiary hover:bg-opacity-20 hover:translate-y-[-2px] hover:shadow-sm transition-all duration-200"
                onClick={() => setOpenProgramModal(true)}
              >
                <PlusCircle className="transition-all duration-200 group-hover:rotate-90" />
                <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
                  Créer un nouveau programme
                </p>
              </Button>
            </AnimatedWrapper>
          </section>
          <section className="h-full w-[90%] 2xl:w-[85%] bg-gray-50 bg-opacity-50 border border-gray-100 shadow-md p-4 flex flex-col justify-start items-start rounded-xl gap-4 overflow-y-scroll">
            <Input
              label="Recherche"
              placeholder="Rechercher un programme"
              capture
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInput(e.target.value);
              }}
              startContent={<Search size={20} className="text-gray-500" />}
              type="search"
            />
            {loading ? (
              <div className="w-full min-h-[350px] flex justify-center items-center" />
            ) : myPrograms.length > 0 ? (
              <div className="w-full h-full grid grid-cols-3 2xl:grid-cols-4 justify-start items-start gap-2">
                {myPrograms.map((program) => (
                  <div key={program.id} className="h-[400px]">
                    <ProgramCard
                      id={program.id}
                      title={program.title}
                      description={program.description ?? ""}
                      status={program.status}
                      duration={program.duration}
                      price={program.price}
                      level={program.level}
                      categoryId={program.category?.id}
                      isPublic={program.public}
                      onArchive={handleArchiveProgram}
                      onValidate={handleValidateProgram}
                      onDelete={handleDeleteProgram}
                      onGenerate={handleGenerateProgram}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-[350px] flex flex-col justify-center items-center gap-2">
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
                      Créer un nouveau programme
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
      {isConfiguration && <Configuration onUpdate={handleUpdateProgram} />}
      <ProgramModal
        open={openProgramModal}
        onClose={() => setOpenProgramModal(false)}
        refetch={refetch}
      />
    </section>
  );
}
