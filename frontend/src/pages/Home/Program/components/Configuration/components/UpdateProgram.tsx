import Privacy from "@/components/modals/ProgramModal/components/Privacy";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ProgramLevel,
  ProgramStatus,
  UpdateProgramInput,
} from "@/graphql/hooks";
import { allLevel, allStatus } from "@/services/utils";
import { useProgramStore } from "@/services/zustand/programStore";
import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import { Info, Lightbulb, Save, TriangleAlert } from "lucide-react";
import { useState } from "react";

type UpdateProgramProps = {
  onUpdate: (id: string, program: UpdateProgramInput) => void;
  backConfig: () => void;
};

export default function UpdateProgram({
  onUpdate,
  backConfig,
}: UpdateProgramProps) {
  const currentProgram = useProgramStore((state) => state.program);
  const [form, setForm] = useState({
    public: currentProgram?.public ?? false,
    title: currentProgram?.title ?? "",
    description: currentProgram?.description ?? "",
    duration: currentProgram?.duration ?? 1,
    price: currentProgram?.price ?? 0,
    status: currentProgram?.status ?? ProgramStatus.Draft,
    level: currentProgram?.level ?? "",
  });

  return (
    <section className="w-full h-full flex justify-center items-start">
      <section className="max-w-[900px] w-full flex flex-col gap-8 p-4">
        {/* LEFT SIDE: Privacy cards */}
        <div className="flex gap-4 w-full">
          <div className="w-[50%]">
            <Privacy
              type="private"
              title="Privé"
              description="Gardez votre programme privé et personnalisé pour vos clients"
              selected={!form.public}
              onSelect={() => setForm({ ...form, public: false })}
            />
          </div>
          <div className="w-[50%]">
            <Privacy
              type="public"
              title="Public"
              description="Partagez votre programme avec la communauté et monétisez votre expertise"
              selected={form.public}
              onSelect={() => setForm({ ...form, public: true })}
            />
          </div>
        </div>
        {/* RIGHT SIDE: Form */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col items-start justify-center gap-2">
            <p className="font-semibold flex justify-start items-start gap-2">
              <Info className="text-gray-500" />
              Informations générales
            </p>
            <Separator />
          </div>
          <div className="flex gap-2">
            <div className="w-[65%]">
              <Input
                label="Titre du programme"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="w-[35%]">
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
          <div className="flex gap-2">
            <div className="flex-1">
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
          </div>
          {form.public && (
            <>
              <div className="flex flex-col items-start justify-center gap-2 mt-4">
                <p className="font-semibold flex justify-start items-center gap-2">
                  <Lightbulb className="text-gray-500" />
                  Informations complémentaires
                </p>
                <Separator />
              </div>
              <div className="w-full flex items-start gap-2">
                <div className="flex-1">
                  <Input
                    label="Prix (€)"
                    type="number"
                    description={
                      <div className="flex items-center justify-start gap-2">
                        <TriangleAlert className="w-6 h-6" />
                        <p>
                          Si aucun prix n'est renseigné, le programme ne sera
                          pas visible dans le marketplace.
                        </p>
                      </div>
                    }
                    min={0}
                    step={1}
                    value={form.price.toString()}
                    onChange={(e) =>
                      setForm({ ...form, price: parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div className="flex-1">
                  <Select
                    label="Niveau de pratique"
                    selectedKeys={form.level ? [form.level] : []}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        level: e.target.value as ProgramLevel,
                      })
                    }
                  >
                    {allLevel.map((l) => (
                      <SelectItem
                        key={l.key}
                        value={l.key}
                        startContent={l.startContent}
                      >
                        {l.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            </>
          )}
          <div className="w-full flex items-center justify-end">
            <Button
              className="group shadow-none text-tertiary h-12 w-[30%] rounded-xl bg-tertiary bg-opacity-20 border border-tertiary border-opacity-20 hover:bg-tertiary hover:bg-opacity-20 hover:translate-y-[-2px] hover:shadow-sm transition-all duration-200"
              onClick={() => {
                onUpdate(currentProgram?.id as string, form);
                backConfig();
              }}
            >
              <Save className="transition-all duration-200 group-hover:scale-105" />
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
