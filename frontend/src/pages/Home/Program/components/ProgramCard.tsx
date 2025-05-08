import { Separator } from "@/components/ui/separator";
import { ProgramLevel, ProgramStatus } from "@/graphql/hooks";
import { useProgramStore } from "@/services/zustand/programStore";
import { Clock, Lock, Globe2, PlayCircle, Workflow } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PopEllipsis from "./PopEllipsis";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useState } from "react";
import SelectStudentModal from "@/components/modals/SelectStudentModal";
import ChooseDateModal from "@/components/modals/ChooseDateModal";
import { format } from "date-fns";

type ProgramCardProps = {
  id: string;
  title: string;
  description?: string;
  status: ProgramStatus;
  duration: number;
  price?: number | null;
  level?: ProgramLevel;
  isPublic: boolean;
  onDelete: (id: string) => void;
  onValidate: (id: string) => void;
  onArchive: (id: string) => void;
  onGenerate: (programId: string, startDate: Date, userIds: string[]) => void;
};

export default function ProgramCard({
  id,
  title,
  description,
  status,
  duration,
  level,
  price,
  isPublic,
  onDelete,
  onValidate,
  onArchive,
  onGenerate,
}: ProgramCardProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDateModal, setOpenDateModal] = useState<boolean>(false);
  const [openGenerationModal, setOpenGenerationModal] = useState(false);
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const setProgram = useProgramStore((state) => state.set);
  const getStatusLabel = (status: string) => {
    switch (status) {
      case ProgramStatus.Draft:
        return "Brouillon";
      case ProgramStatus.Published:
        return "Publié";
      case ProgramStatus.Archived:
        return "Archivé";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case ProgramStatus.Draft:
        return "bg-blue-100 text-blue-700";
      case ProgramStatus.Published:
        return "bg-green-100 text-green-700";
      case ProgramStatus.Archived:
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleOpenConfirm = () => {
    setOpen(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleArchive = () => {
    onArchive(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleGenerate = () => {
    onGenerate(id, new Date(startDate), multiSelect);
    setOpenDateModal(false);
    setOpenGenerationModal(false);
  };

  const handleNavigate = () => {
    setProgram({
      id: id as string,
      duration: duration as number,
      title: title as string,
      description,
      status,
      public: isPublic,
      price: price ?? 0,
      level,
    });
    navigate(`/home?tab=program&section=configuration`);
  };

  const handleValidate = () => {
    onValidate(id);
  };
  return (
    <article className="w-full h-full flex flex-col justify-between items-start bg-white rounded-lg shadow-xs border border-gray-200 p-6 space-y-6 hover:border-gray-300 hover:shadow-md hover:translate-y-[-2px] transition-all duration-200">
      <div className="space-y-4 w-full flex-1">
        <div className="w-full flex justify-between items-center">
          <h1
            className="text-md font-semibold hover:underline underline-offset-2 decoration-1 line-clamp-1 cursor-pointer"
            onClick={handleNavigate}
          >
            {title}
          </h1>
          <PopEllipsis
            onArchive={handleOpenConfirm}
            status={status}
            navigate={handleNavigate}
            onValidate={handleValidate}
            onDelete={handleOpenDelete}
            openGeneration={() => setOpenGenerationModal(true)}
          />
        </div>
        <div className="h-[80%] w-full relative">
          <p className="text-gray-500 text-sm absolute inset-0 overflow-hidden">
            {description ?? "Aucune description"}
            <span className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-5">
        <Separator />
        <div className="flex flex-wrap gap-3">
          <div
            className={`px-3 py-1 rounded-md text-xs font-medium flex items-center gap-2 ${getStatusColor(
              status
            )}`}
          >
            <PlayCircle className="w-4 h-4" />
            {getStatusLabel(status)}
          </div>
          <div className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {duration} semaines
          </div>
          <div className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-2">
            {isPublic ? (
              <>
                <Globe2 className="w-4 h-4" />
                Public
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Privé
              </>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleArchive}
        description="Êtes-vous sûr de vouloir archiver ce programme ?"
        title="Archivage"
      />
      <ConfirmModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        description="Êtes-vous sûr de vouloir supprimer ce programme ? Tous les entraînements seront supprimés également."
        title="Suppression"
      />
      <SelectStudentModal
        open={openGenerationModal}
        setOpen={setOpenGenerationModal}
        isMulti
        multiSelect={multiSelect}
        setMultiSelect={setMultiSelect}
        customButton={
          <button
            className="w-full relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={() => setOpenDateModal(true)}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-white hover:bg-gray-100 px-3 py-1 text-sm font-medium text-dark backdrop-blur-3xl">
              <Workflow className="w-4 h-4" />
              <p>Choisir une date de début !</p>
            </span>
          </button>
        }
      />
      <ChooseDateModal
        isOpen={openDateModal}
        onClose={() => setOpenDateModal(false)}
        setStartDate={setStartDate}
        startDate={startDate}
        onGenerate={handleGenerate}
      />
    </article>
  );
}
