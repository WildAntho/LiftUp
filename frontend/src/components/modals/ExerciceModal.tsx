import { SelectField, TextInputField, Textarea } from "evergreen-ui";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState, useCallback, ChangeEvent } from "react";
import IntensityComponent from "../IntensityComponent";
import { Switch } from "@heroui/switch";
import {
  Config,
  Exercice,
  Maybe,
  useAddExerciceMutation,
  useUpdateExerciceMutation,
} from "@/graphql/hooks";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useTypeStore } from "@/services/zustand/typeStore";
import Counter from "../Counter";
import NumberInput from "../NumberInput";

type ExerciceModalProps = {
  open: boolean;
  onClose: () => void;
  setExercices?: (value: Exercice[]) => void;
  exercices?: Exercice[];
  exerciceToEdit?: Exercice | null;
  isNew?: boolean;
  trainingId?: string;
  config?: Config;
};

export default function ExerciceModal({
  open,
  onClose,
  setExercices,
  exercices = [],
  exerciceToEdit,
  isNew = false,
  trainingId,
  config,
}: ExerciceModalProps) {
  const allTypes = useTypeStore((state) => state.types);
  const [activeWeight, setActiveWeight] = useState<boolean>(true);
  const [activeIntensity, setActiveIntensity] = useState<boolean>(true);

  // Transformation de allTypes pour le SelectField : on s'assure d'avoir un id
  const types = allTypes.map((t) => {
    return {
      id: t.id,
      value: t.value,
      label: t.label,
    };
  });

  // Gestion unifiée du formulaire
  // On stocke la propriété "type" sous forme de chaîne (la valeur du type)
  const [formState, setFormState] = useState({
    title: "",
    serie: 1,
    rep: 1,
    weight: 0,
    intensity: 1 as Maybe<number>,
    notes: "",
    type: {
      id: "",
      value: "",
      label: "",
    },
  });
  const [formError, setFormError] = useState({
    title: false,
    rep: false,
    serie: false,
  });

  const [updateExercice] = useUpdateExerciceMutation();
  const [addExercice] = useAddExerciceMutation();

  // Réinitialisation des champs
  const purgeInput = useCallback(() => {
    setFormState({
      title: "",
      serie: 1,
      rep: 1,
      weight: 0,
      intensity: 1,
      notes: "",
      type: {
        id: "",
        value: "",
        label: "",
      },
    });
    setFormError({
      title: false,
      rep: false,
      serie: false,
    });
  }, []);

  // Initialisation des valeurs en mode édition
  useEffect(() => {
    if (exerciceToEdit) {
      setFormState({
        title: exerciceToEdit.title,
        serie: Number(exerciceToEdit.serie ?? 1),
        rep: Number(exerciceToEdit.rep ?? 1),
        weight: Number(exerciceToEdit.weight ?? 0),
        intensity: exerciceToEdit.intensity ?? 1,
        notes: exerciceToEdit.notes ?? "",
        type: exerciceToEdit.type ?? {
          id: "",
          value: "",
          label: "",
        },
      });
    } else {
      purgeInput();
    }
  }, [exerciceToEdit, purgeInput]);

  const handleExercice = async () => {
    const requiredFields: (keyof typeof formError)[] = [
      "title",
      "rep",
      "serie",
    ];
    let hasError = false;
    requiredFields.forEach((key) => {
      if (formState[key] === "") {
        setFormError((prev) => ({
          ...prev,
          [key]: true,
        }));
        hasError = true;
      }
    });
    if (hasError) return;
    const payload = {
      title: formState.title,
      serie: formState.serie,
      rep: formState.rep,
      weight: activeWeight ? formState.weight : 0,
      intensity: activeIntensity ? formState.intensity : 0,
      notes: formState.notes,
      type: formState.type,
      config,
    };

    try {
      // Mode création locale (nouvel entraînement)
      if (isNew && setExercices) {
        const newExercice = {
          ...payload,
          id: exerciceToEdit?.id || `temp-${Date.now()}`,
        };

        const newTab = exerciceToEdit
          ? exercices.map((e) => (e.id === exerciceToEdit.id ? newExercice : e))
          : [...exercices, newExercice];

        setExercices(newTab);
      }
      // Mode API (entraînement existant)
      else {
        let updatedExercice: Exercice;

        if (exerciceToEdit) {
          // Mise à jour
          const { data } = await updateExercice({
            variables: {
              id: exerciceToEdit.id,
              data: payload,
            },
          });

          updatedExercice = {
            ...exerciceToEdit,
            ...data?.updateExercice,
          };

          setExercices?.(
            exercices.map((e) =>
              e.id === exerciceToEdit.id ? updatedExercice : e
            )
          );
        } else if (trainingId) {
          // Création
          const { data } = await addExercice({
            variables: {
              id: trainingId,
              data: payload,
            },
          });

          const newExercice = {
            ...payload,
            id: data?.addExercice.id.toString() || `temp-${Date.now()}`,
          };

          setExercices?.([...exercices, newExercice]);
        }
      }

      purgeInput();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    }
  };

  return (
    <Modal
      scrollBehavior="inside"
      isOpen={open}
      onOpenChange={onClose}
      size="2xl"
      isDismissable={false}
      classNames={{
        closeButton: "text-black hover:bg-black/5 active:bg-black/10",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "max-h-[80vh]",
      }}
    >
      <ModalContent className="h-full flex flex-col">
        <ModalHeader className="flex-none flex justify-center border-b">
          <p>
            {exerciceToEdit ? "Modifier l'exercice" : "Ajouter un exercice"}
          </p>
        </ModalHeader>
        <ModalBody className="flex-1 overflow-y-auto py-4">
          <div className="flex flex-col gap-4">
            <section className="flex justify-center items-center gap-2 w-full">
              <div className="relative w-[65%]">
                <TextInputField
                  required
                  isInvalid={formError.title}
                  label="Titre"
                  type="text"
                  placeholder="Titre de l'exercice"
                  value={formState.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormState((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
                {formError.title && (
                  <p className="text-red-500 text-xs absolute top-[65px] left-1">
                    Veuillez renseigner ce champ
                  </p>
                )}
              </div>
              <div className="w-[35%]">
                <SelectField
                  label="Type"
                  value={formState.type.value}
                  onChange={(e) => {
                    const selectedType = types.find(
                      (t) => t.value === e.target.value
                    );
                    setFormState((prev) => ({
                      ...prev,
                      type: selectedType || { id: "", value: "", label: "" },
                    }));
                  }}
                >
                  <option value="">Aucun type</option>
                  {types.map((type, i) => (
                    <option key={i} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </SelectField>
              </div>
            </section>
            <section className="flex justify-center items-center mb-4 gap-2">
              <section className="flex w-[80%] justify-start items-center gap-2">
                <div className="flex-1 flex-col items-center justify-center gap-2">
                  <p className="text-sm w-full text-center">Séries</p>
                  <Counter
                    setValue={(value) =>
                      setFormState((prev) => ({ ...prev, serie: value }))
                    }
                    value={formState.serie}
                    withNegative={false}
                  />
                </div>
                <div className="flex-1 flex-col items-center justify-center gap-2">
                  <p className="text-sm w-full text-center">Répétitions</p>
                  <Counter
                    setValue={(value) =>
                      setFormState((prev) => ({ ...prev, rep: value }))
                    }
                    value={formState.rep}
                    withNegative={false}
                  />
                </div>
              </section>
              {activeWeight && (
                <div className="w-[20%] flex-col items-center justify-center gap-2">
                  <p className="text-sm w-full text-center">Poids (Kg)</p>
                  <NumberInput
                    setValue={(value) =>
                      setFormState((prev) => ({ ...prev, weight: value }))
                    }
                    value={formState.weight}
                  />
                </div>
              )}
            </section>
            {activeIntensity && (
              <section className="flex flex-col mb-4 w-full justify-center items-start">
                <p className="text-sm w-full text-center">RPE</p>
                <div className="w-full bg-white border border-tertiary border-opacity-20 hover:border-opacity-70 shadow-sm rounded-xl px-4 py-3 flex items-center justify-center">
                  <IntensityComponent
                    value={formState.intensity}
                    setValue={(value) =>
                      setFormState((prev) => ({ ...prev, intensity: value }))
                    }
                  />
                </div>
              </section>
            )}
            <section className="flex flex-col w-full items-start justify-center gap-2">
              <Switch
                isSelected={activeWeight}
                onValueChange={setActiveWeight}
                size="sm"
              >
                <p className="text-xs">Charge</p>
              </Switch>
              <Switch
                isSelected={activeIntensity}
                onValueChange={setActiveIntensity}
                size="sm"
                className="text-xs"
              >
                <p className="text-xs">RPE</p>
              </Switch>
              <Textarea
                className="mt-4"
                placeholder="Ajouter des notes"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setFormState((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                value={formState.notes}
              />
            </section>
          </div>
        </ModalBody>
        <ModalFooter className="flex-none flex justify-between items-center w-full border-t">
          <div className="flex-1">
            <p className="flex-1 text-xs text-gray-600">
              * Champs obligatoires
            </p>
          </div>
          <div className="flex flex-1 justify-end items-center w-full gap-2">
            <Button
              variant="outline"
              onClick={() => {
                purgeInput();
                onClose();
              }}
            >
              Annuler
            </Button>
            <Button
              className="bg-primary hover:bg-blue-600 flex justify-center items-center gap-2"
              onClick={handleExercice}
            >
              {exerciceToEdit ? "Modifier" : "Ajouter"}
              <Plus />
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
