import { useTrainingStore } from "@/services/zustand/trainingStore";
import FloatingDockDesktop from "./FloatingMenu";
import { Home, Undo2, Copy, PlusCircle, ClipboardPaste } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TrainingPlan } from "@/graphql/hooks";

type FloatingDockProps = {
  onCreate: () => void;
  onCopy: () => void;
  onPaste: () => void;
  trainings?: TrainingPlan[];
};

export default function FloatingDock({
  onCreate,
  onCopy,
  onPaste,
  trainings,
}: FloatingDockProps) {
  const copyTraining = useTrainingStore((state) => state.ids);
  const navigate = useNavigate();
  const links = [
    {
      title: "Accueil",
      icon: <Home className="h-full w-full" />,
      action: () => {
        navigate("/home");
      },
    },
    {
      title: "Créer une séance",
      icon: <PlusCircle className="h-full w-full" />,
      action: () => {
        onCreate();
      },
    },
    ...(trainings && trainings.length > 0
      ? [
          {
            title: "Copier la séance",
            icon: <Copy className="h-full w-full" />,
            action: () => {
              toast.success("La séance a bien été copiée", {
                style: {
                  backgroundColor: "#dcfce7",
                  color: "#15803d",
                },
              });
              onCopy();
            },
          },
        ]
      : []),
    ...(copyTraining
      ? [
          {
            title: "Coller la séance",
            icon: <ClipboardPaste className="h-full w-full" />,
            action: () => {
              onPaste();
            },
          },
        ]
      : []),
    {
      title: "Retour",
      icon: <Undo2 className="h-full w-full" />,
      action: () => {
        navigate("/home?tab=program");
      },
    },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-4 z-10">
      <FloatingDockDesktop
        items={links}
        className="shadow-lg border border-gray-100 "
      />
    </div>
  );
}
