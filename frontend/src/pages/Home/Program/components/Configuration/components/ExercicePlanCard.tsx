import {
  Exercice,
  ExerciceData,
  IntensityFormat,
  Maybe,
  RepFormat,
  WeightFormat,
} from "@/graphql/hooks";
import {
  Checkbox,
  Input,
  Select,
  SelectItem,
  Textarea,
  Tooltip,
} from "@heroui/react";
import { ChevronRight, Grip, Notebook, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LogoAction from "./LogoActions";
import PulsingCircle from "./PulsingCircle";
import { Separator } from "@/components/ui/separator";
import { useDebouncedCallback } from "@/services/useDebouncedCallback";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  allFormatIntensity,
  allFormatReps,
  allFormatWeight,
} from "@/services/utils";
import InfoPopUp from "./InfoPopUp";
import { useExerciceURL } from "@/services/zustand/useExerciceUrl";

type ExercicePlanCardProps = {
  exercice: Exercice;
  onDelete: (id: string) => void;
  onUpdate: (id: string, exercice: ExerciceData) => void;
};

export default function ExercicePlanCard({
  exercice,
  onDelete,
  onUpdate,
}: ExercicePlanCardProps) {
  const exercicesURL = useExerciceURL();
  const [showAll, setShowAll] = useState(false);
  const [currentExercice, setCurrentExercice] = useState(exercice);
  const serieRef = useRef<number>(currentExercice.serie);
  const repRef = useRef<number>(currentExercice.rep);
  const weightRef = useRef<Maybe<number>>(currentExercice.weight ?? null);
  const intensityRef = useRef<Maybe<number>>(currentExercice.intensity ?? null);
  const noteRef = useRef<Maybe<string>>(currentExercice.notes ?? "");
  const tempoRef = useRef<Maybe<number>>(currentExercice.tempo ?? null);
  const repFormat = useRef<Maybe<RepFormat>>(
    currentExercice.repFormat ?? RepFormat.Standard
  );
  const weightFormat = useRef<Maybe<WeightFormat>>(
    currentExercice.weightFormat ?? WeightFormat.Kg
  );
  const intensityFormat = useRef<Maybe<IntensityFormat>>(
    currentExercice.intensityFormat ?? IntensityFormat.Rpe
  );

  const disabledWeight =
    currentExercice.weightFormat === WeightFormat.Choice ||
    currentExercice.weightFormat === WeightFormat.Bodyweight;

  const [withTempo, setWithTempo] = useState<boolean>(
    currentExercice.tempo !== null
  );

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const handleDeleteExercice = () => {
    onDelete(exercice.id);
  };

  const debouncedUpdate = useDebouncedCallback(async () => {
    const refExercice = {
      serie: serieRef.current,
      rep: repRef.current,
      repFormat: repFormat.current,
      weight: weightRef.current,
      weightFormat: weightFormat.current,
      intensity: intensityRef.current,
      intensityFormat: intensityFormat.current,
      notes: noteRef.current,
      tempo: tempoRef.current,
    };
    const cleanExercice = {
      ...currentExercice,
      ...refExercice,
    };
    onUpdate(exercice.id, cleanExercice);
  }, 2000);

  const saveChanges = () => {
    debouncedUpdate();
  };

  useEffect(() => {
    setCurrentExercice(exercice);
  }, [exercice]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: exercice.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Handlers pour les mises à jour de champs
  const handleUpdateField = <
    T extends
      | number
      | string
      | null
      | RepFormat
      | WeightFormat
      | IntensityFormat
  >(
    field: string,
    value: T,
    ref: React.MutableRefObject<T>
  ) => {
    setCurrentExercice((prev) => ({ ...prev, [field]: value }));
    ref.current = value;
    saveChanges();
  };

  const renderInfoReps = () => {
    switch (currentExercice.repFormat) {
      case RepFormat.Amrap:
        return (
          <InfoPopUp
            title="As Many Reps As Possible"
            description="Autant de répétions que possible"
          />
        );
      case RepFormat.Emom:
        return (
          <InfoPopUp
            title="Every Minute On Minute"
            description="Exécuter les répétitions au début de chaque minute"
          />
        );
      case RepFormat.E2Mom:
        return (
          <InfoPopUp
            title="Every Minute On 2 Minute"
            description="Exécuter les répétitions toutes les 2 minutes"
          />
        );
      case RepFormat.Time:
        return <p className="text-sm text-red-500">s</p>;
    }
  };

  const renderUnitWeight = () => {
    switch (currentExercice.weightFormat) {
      case WeightFormat.Kg:
        return <p className="text-sm text-red-500">Kg</p>;
      case WeightFormat.Lbs:
        return <p className="text-sm text-red-500">Lbs</p>;
      case WeightFormat.Percentage:
        return <p className="text-sm text-red-500">%</p>;
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      <section
        className="w-full h-full flex flex-col items-center justify-center p-4 gap-3 rounded-2xl bg-white border border-gray-200 transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-1"
        onClick={toggleShowAll}
      >
        <section className="w-full flex items-center justify-between cursor-pointer">
          <div className="flex items-center justify-center gap-6">
            <Tooltip
              content="Déplacer"
              showArrow={true}
              color="foreground"
              className="text-xs"
            >
              <div
                {...attributes}
                {...listeners}
                className="hover:bg-gray-200 p-3 rounded-full cursor-grab active:cursor-grabbing"
              >
                <Grip size={18} className="text-gray-500" />
              </div>
            </Tooltip>
            <img
              src={`${exercicesURL}${exercice.image}`}
              alt="Image Exercice"
              className="w-16 h-16 object-cover object-top rounded-md"
            />
            <div className="flex flex-col items-start justify-center gap-2">
              <p className="text-sm font-semibold">{exercice.title}</p>
              <p className="text-xs text-gray-500">
                {exercice.serie} {`série${exercice.serie > 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
          <section className="flex justify-center items-center gap-4">
            <div
              className="flex justify-center items-center gap-2 px-3 py-2 bg-gray-50 rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              <section className="group relative transition-all duration-200 ease-in-out hover:-translate-y-0.5">
                <LogoAction
                  logo={<Notebook size={20} />}
                  title="Note d'exercice"
                  onClick={toggleShowAll}
                />
                {exercice.notes && exercice.notes.length > 0 && (
                  <PulsingCircle />
                )}
              </section>
              <div className="group relative transition-all duration-200 ease-in-out hover:-translate-y-0.5">
                <LogoAction
                  logo={<Trash2 size={20} />}
                  title="Supprimer"
                  onClick={handleDeleteExercice}
                />
              </div>
            </div>
            <ChevronRight
              size={20}
              className={`text-gray-500 transition-all duration-200 ease-in-out ${
                showAll ? "rotate-90" : ""
              }`}
            />
          </section>
        </section>
        <section
          className={`w-full h-full flex flex-col justify-start items-center overflow-hidden transition-all duration-500 ease-in-out ${
            showAll ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full h-full flex justify-center items-end gap-1">
            <div className="flex-1" onClick={(e) => e.stopPropagation()}>
              <Input
                label="Série"
                radius="none"
                type="number"
                className="flex-1"
                variant="bordered"
                classNames={{ inputWrapper: "border-1" }}
                value={(currentExercice.serie ?? 1).toString()}
                onChange={(e) =>
                  handleUpdateField("serie", Number(e.target.value), serieRef)
                }
              />
            </div>
            <Separator orientation="vertical" className="h-24" />
            <div className="flex-1">
              <Select
                placeholder="Format répétitions"
                aria-label="Format répétitions"
                radius="none"
                selectedKeys={
                  currentExercice.repFormat
                    ? [currentExercice.repFormat]
                    : [RepFormat.Standard]
                }
                onChange={(e) =>
                  handleUpdateField(
                    "repFormat",
                    e.target.value as RepFormat,
                    repFormat
                  )
                }
              >
                {allFormatReps.map((r) => (
                  <SelectItem key={r.key} className="text-xs">
                    {r.label}
                  </SelectItem>
                ))}
              </Select>
              <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                <Input
                  label="Répétitions"
                  radius="none"
                  type={`${
                    currentExercice.repFormat === RepFormat.Amrap
                      ? "string"
                      : "number"
                  }`}
                  variant="bordered"
                  readOnly={currentExercice.repFormat === RepFormat.Amrap}
                  endContent={renderInfoReps()}
                  classNames={{ inputWrapper: "border-1" }}
                  value={
                    currentExercice.repFormat === RepFormat.Amrap
                      ? "-"
                      : (currentExercice.rep ?? 1).toString()
                  }
                  onChange={(e) =>
                    handleUpdateField("rep", Number(e.target.value), repRef)
                  }
                />
              </div>
            </div>
            <Separator orientation="vertical" className="h-24" />
            <div className="flex-1">
              <Select
                placeholder="Format de poids"
                aria-label="Format poids"
                radius="none"
                selectedKeys={
                  currentExercice.weightFormat
                    ? [currentExercice.weightFormat]
                    : [WeightFormat.Kg]
                }
                onChange={(e) => {
                  setCurrentExercice((prev) => ({
                    ...prev,
                    weightFormat: e.target.value as WeightFormat,
                  }));
                  weightFormat.current = e.target.value as WeightFormat;
                  if (
                    weightFormat.current === WeightFormat.Bodyweight ||
                    weightFormat.current === WeightFormat.Choice
                  )
                    weightRef.current = null;
                  saveChanges();
                }}
              >
                {allFormatWeight.map((w) => (
                  <SelectItem key={w.key} className="text-xs">
                    {w.label}
                  </SelectItem>
                ))}
              </Select>
              <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                <Input
                  label="Poids"
                  radius="none"
                  type={`${disabledWeight ? "string" : "number"}`}
                  variant="bordered"
                  readOnly={disabledWeight}
                  endContent={renderUnitWeight()}
                  classNames={{ inputWrapper: "border-1" }}
                  value={
                    disabledWeight
                      ? "-"
                      : (currentExercice.weight ?? 0).toString()
                  }
                  onChange={(e) =>
                    handleUpdateField(
                      "weight",
                      Number(e.target.value),
                      weightRef
                    )
                  }
                />
              </div>
            </div>
            <Separator orientation="vertical" className="h-24" />
            <div className="flex-1">
              <Select
                placeholder="Format d'intensité"
                aria-label="Format intensité"
                radius="none"
                selectedKeys={
                  currentExercice.intensityFormat
                    ? [currentExercice.intensityFormat]
                    : [IntensityFormat.Rpe]
                }
                onChange={(e) =>
                  handleUpdateField(
                    "intensityFormat",
                    e.target.value as IntensityFormat,
                    intensityFormat
                  )
                }
              >
                {allFormatIntensity.map((i) => (
                  <SelectItem key={i.key} className="text-xs">
                    {i.label}
                  </SelectItem>
                ))}
              </Select>
              <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                <Input
                  label="Intensité"
                  radius="none"
                  type="number"
                  variant="bordered"
                  classNames={{ inputWrapper: "border-1" }}
                  value={(currentExercice.intensity ?? 1).toString()}
                  onChange={(e) =>
                    handleUpdateField(
                      "intensity",
                      Number(e.target.value),
                      intensityRef
                    )
                  }
                />
              </div>
            </div>
            <Separator orientation="vertical" className="h-24" />
            <div className="flex-1">
              <div className="mb-2">
                <Checkbox
                  aria-label="Tempo"
                  isSelected={withTempo}
                  onValueChange={(isSelected) => {
                    setWithTempo(isSelected);
                    const updatedTempo = isSelected ? 2020 : null;
                    handleUpdateField("tempo", updatedTempo, tempoRef);
                  }}
                >
                  <p className="text-xs">Ajouter un tempo</p>
                </Checkbox>
              </div>
              <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                <Input
                  label="Tempo"
                  radius="none"
                  type="number"
                  variant="bordered"
                  className="flex-1"
                  isDisabled={!withTempo}
                  classNames={{ inputWrapper: "border-1" }}
                  value={(currentExercice.tempo ?? "").toString()}
                  endContent={
                    <InfoPopUp
                      title="EPCP"
                      description="Excentrique, Pause, Contentrique, Pause"
                    />
                  }
                  onChange={(e) =>
                    handleUpdateField("tempo", Number(e.target.value), tempoRef)
                  }
                />
              </div>
            </div>
          </div>
          <Separator className="mt-2" />
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            <Textarea
              label="Ajouter des notes"
              className="mt-2"
              value={currentExercice.notes ?? ""}
              onChange={(e) =>
                handleUpdateField("notes", e.target.value, noteRef)
              }
            />
          </div>
        </section>
      </section>
    </div>
  );
}
