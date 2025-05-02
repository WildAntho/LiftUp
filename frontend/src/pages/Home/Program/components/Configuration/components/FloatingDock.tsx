import FloatingDockDesktop from "./FloatingMenu";
import { Home, Undo2, Copy, PlusCircle, ClipboardCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

type FloatingDockProps = {
  onCreate: () => void;
};

export default function FloatingDock({ onCreate }: FloatingDockProps) {
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
    {
      title: "Copier la séance",
      icon: <Copy className="h-full w-full" />,
      action: () => {
        console.log("clicked");
      },
    },
    {
      title: "Coller la séance",
      icon: <ClipboardCheck className="h-full w-full" />,
      action: () => {
        console.log("clicked");
      },
    },
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
