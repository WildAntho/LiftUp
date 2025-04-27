import Privacy from "@/components/modals/ProgramModal/components/Privacy";
import { Button } from "@/components/ui/button";
import { ProgramStatus, UpdateProgramInput } from "@/graphql/hooks";
import { useProgramStore } from "@/services/zustand/programStore";
import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import {
  Archive,
  CircleCheckBig,
  NotepadTextDashed,
  PlusCircle,
} from "lucide-react";
import { useState } from "react";

type UpdateProgramProps = {
  onUpdate: (id: string, program: UpdateProgramInput) => void;
};

export default function UpdateProgram({ onUpdate }: UpdateProgramProps) {
  const currentProgram = useProgramStore((state) => state.program);
  const [form, setForm] = useState({
    public: currentProgram?.public ?? false,
    title: currentProgram?.title ?? "",
    description: currentProgram?.description ?? "",
    duration: currentProgram?.duration ?? 1,
    price: currentProgram?.price ?? 0,
    status: currentProgram?.status ?? ProgramStatus.Draft,
  });

  const allStatus = [
    {
      key: ProgramStatus.Published,
      label: "Validé",
      startContent: <CircleCheckBig className="w-4 h-4" />,
    },
    {
      key: ProgramStatus.Draft,
      label: "Brouillon",
      startContent: <NotepadTextDashed className="w-4 h-4" />,
    },
    {
      key: ProgramStatus.Archived,
      label: "Archivé",
      startContent: <Archive className="w-4 h-4" />,
    },
  ];

  return (
    <section className="w-full h-full flex justify-center items-start">
      <section className="max-w-[900px] w-full flex flex-row gap-8 p-4">
        {/* LEFT SIDE: Privacy cards */}
        <div className="flex flex-col gap-4 w-1/2">
          <Privacy
            type="private"
            title="Privé"
            description="Gardez votre programme privé et personnalisé pour vos clients"
            selected={!form.public}
            onSelect={() => setForm({ ...form, public: false })}
          />
          <Privacy
            type="public"
            title="Public"
            description="Partagez votre programme avec la communauté et monétisez votre expertise"
            selected={form.public}
            onSelect={() => setForm({ ...form, public: true })}
          />
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="flex flex-col gap-4 w-1/2">
          <div>
            <Select
              label="Statut"
              selectedKeys={form.status ? [form.status] : []}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as ProgramStatus })
              }
            >
              {allStatus.map((s) => (
                <SelectItem
                  key={s.key}
                  value={s.key}
                  startContent={s.startContent}
                >
                  {s.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <Input
              label="Titre du programme"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <Textarea
              label="Description"
              radius="sm"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div>
            <Input
              label="Durée (semaines)"
              type="number"
              min={1}
              value={form.duration.toString()}
              onChange={(e) =>
                setForm({ ...form, duration: parseInt(e.target.value) })
              }
            />
          </div>
          {form.public && (
            <div>
              <Input
                label="Prix (€)"
                type="number"
                min={0}
                step={1}
                value={form.price.toString()}
                onChange={(e) =>
                  setForm({ ...form, price: parseFloat(e.target.value) })
                }
              />
            </div>
          )}
          <div className="w-full flex items-center justify-end">
            <Button
              className="group shadow-none text-tertiary h-12 w-[50%] rounded-xl bg-tertiary bg-opacity-20 border border-tertiary border-opacity-20 hover:bg-tertiary hover:bg-opacity-20 hover:translate-y-[-2px] hover:shadow-sm transition-all duration-200"
              onClick={() => onUpdate(currentProgram?.id as string, form)}
            >
              <PlusCircle className="transition-all duration-200 group-hover:rotate-90" />
              <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
                Sauvegarder
              </p>
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}
