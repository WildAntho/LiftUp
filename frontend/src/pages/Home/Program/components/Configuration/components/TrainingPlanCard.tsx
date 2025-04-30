import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input"; // Shadcn Input
import { Textarea } from "@heroui/react";
import { Dumbbell, Notebook, Pen, Save, Trash2 } from "lucide-react";
import LogoAction from "./LogoActions";
import { useDebouncedCallback } from "@/services/useDebouncedCallback";

type TrainingPlanProps = {
  id: string;
  title: string;
  notes: string;
  onUpdate: (id: string, title: string, notes: string) => void;
  onDelete: (id: string) => void;
};

export default function TrainingPlanCard({
  id,
  title,
  notes,
  onUpdate,
  onDelete,
}: TrainingPlanProps) {
  const [showDescription, setShowDescription] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [hoverTitle, setHoverTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentNotes, setCurrentNotes] = useState(notes);

  const inputRef = useRef<HTMLInputElement>(null);

  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsEditingTitle(false);
      }
    };

    if (isEditingTitle) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditingTitle]);

  const debouncedUpdate = useDebouncedCallback(
    async () => {
      onUpdate(id, currentTitle, currentNotes);
    },
    2000,
    { leading: true }
  );

  return (
    <section className="w-full flex flex-col items-center justify-center gap-4 px-4 py-6 rounded-2xl bg-white border border-gray-200 transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-1">
      <section className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start justify-center gap-2 px-2 w-full">
          {isEditingTitle ? (
            <Input
              ref={inputRef}
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              className="text-base w-full"
              autoFocus
            />
          ) : (
            <div
              onClick={() => setIsEditingTitle(true)}
              onMouseEnter={() => setHoverTitle(true)}
              onMouseLeave={() => setHoverTitle(false)}
              className="w-full flex items-center gap-2 cursor-pointer p-1 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100"
            >
              <p className="font-semibold text-base">{currentTitle}</p>
              {hoverTitle && (
                <span className="flex justify-start items-center gap-1 text-xs text-gray-400 transition-all duration-200">
                  <Pen size={14} />
                  <p>Éditer</p>
                </span>
              )}
            </div>
          )}
          <div className="flex justify-start items-center gap-2 text-xs text-gray-500">
            <Dumbbell size={12} />
            <p>4 exercices</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 px-3 py-2 bg-gray-50 rounded-full">
          <div className="group relative transition-all duration-200 ease-in-out hover:-translate-y-0.5">
            <LogoAction
              logo={<Notebook size={20} />}
              title="Note d'entraînement"
              onClick={toggleDescription}
            />
            {notes.length > 0 && (
              <div className="absolute top-[3px] right-[6px] w-[15px] h-[15px] bg-gray-400/50 rounded-full flex justify-center items-center">
                <div className="w-[8px] h-[8px] bg-dark rounded-full" />
              </div>
            )}
          </div>
          <LogoAction
            logo={<Save size={20} />}
            title="Enregistrer"
            onClick={() => {
              debouncedUpdate();
              setShowDescription(false);
            }}
          />
          <LogoAction
            logo={<Trash2 size={20} />}
            title="Supprimer"
            onClick={() => onDelete(id)}
          />
        </div>
      </section>

      <div
        className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${
          showDescription ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Textarea
          label="Ajouter des notes"
          value={currentNotes}
          onChange={(e) => setCurrentNotes(e.target.value)}
        />
      </div>
    </section>
  );
}
