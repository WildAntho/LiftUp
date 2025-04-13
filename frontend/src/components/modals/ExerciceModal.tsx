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
import { removeTypename } from "@/services/utils";

type ExerciceModalProps = {
  open: boolean;
  onClose: () => void;
  setExercices?: (value: Exercice[]) => void;
  exercices?: Exercice[];
  exerciceToEdit?: Exercice | null;
  isNew?: boolean;
  trainingId?: string;
};

export default function ExerciceModal({
  open,
  onClose,
  setExercices,
  exercices = [],
  exerciceToEdit,
  isNew = false,
  trainingId,
}: ExerciceModalProps) {
  const allTypes = useTypeStore((state) => state.types);
  const [activeWeight, setActiveWeight] = useState<boolean>(true);
  const [activeIntensity, setActiveIntensity] = useState<boolean>(true);
  const [config, setConfig] = useState<Config>({
    rep: 0,
    serie: 0,
    intensity: 0,
  });

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
    serie: "",
    rep: "",
    weight: "",
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
      serie: "",
      rep: "",
      weight: "",
      intensity: 1,
      notes: "",
      type: {
        id: "",
        value: "",
        label: "",
      },
    });
    setConfig({
      rep: 0,
      serie: 0,
      intensity: 0,
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
        serie: String(exerciceToEdit.serie ?? ""),
        rep: String(exerciceToEdit.rep ?? ""),
        weight: String(exerciceToEdit.weight ?? ""),
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
      serie: Number(formState.serie),
      rep: Number(formState.rep),
      weight: activeWeight ? Number(formState.weight) : 0,
      intensity: activeIntensity ? formState.intensity : 0,
      notes: formState.notes,
      type: formState.type, // objet complet de type ExerciceType (avec id, value, label)
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
        const cleanedPayload = {
          ...payload,
          type: removeTypename(payload.type),
        };

        if (exerciceToEdit) {
          // Mise à jour
          const { data } = await updateExercice({
            variables: {
              id: exerciceToEdit.id,
              data: cleanedPayload,
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
      scrollBehavior="outside"
      isOpen={open}
      onOpenChange={onClose}
      size="xl"
      isDismissable={false}
      classNames={{
        closeButton: "text-black hover:bg-black/5 active:bg-black/10",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
      }}
    >
      <ModalContent>
        <ModalHeader className="w-full h-full flex justify-center">
          <p>
            {exerciceToEdit ? "Modifier l'exercice" : "Ajouter un exercice"}
          </p>
        </ModalHeader>
        <ModalBody style={{ gap: "4px" }} className="h-full">
          <section className="flex justify-center items-center gap-2 w-full overflow-y-scroll">
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
          <section className="flex justify-between items-center">
            <section className="flex justify-start items-center gap-2 flex-1">
              <div className="relative flex-1">
                <TextInputField
                  required
                  isInvalid={formError.serie}
                  label="Série"
                  type="number"
                  placeholder="Nombre de série"
                  value={formState.serie}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormState((prev) => ({ ...prev, serie: e.target.value }))
                  }
                />
                {formError.serie && (
                  <p className="text-red-500 text-xs absolute top-[65px] left-1">
                    Veuillez renseigner ce champ
                  </p>
                )}
              </div>
              <p>X</p>
              <div className="relative flex-1">
                <TextInputField
                  required
                  isInvalid={formError.rep}
                  label="Répétitions"
                  type="number"
                  placeholder="Nombre de répétitions"
                  value={formState.rep}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormState((prev) => ({ ...prev, rep: e.target.value }))
                  }
                />
                {formError.rep && (
                  <p className="text-red-500 text-xs absolute top-[65px] left-1">
                    Veuillez renseigner ce champ
                  </p>
                )}
              </div>
            </section>
            {activeWeight && (
              <div className="flex justify-center items-center gap-1 pl-5 w-[25%]">
                <TextInputField
                  label="Charge"
                  type="number"
                  placeholder="Charge"
                  value={formState.weight}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormState((prev) => ({
                      ...prev,
                      weight: e.target.value,
                    }))
                  }
                />
                <p className="text-xs">Kg</p>
              </div>
            )}
          </section>
          <section className="flex mb-4 w-full justify-center">
            <div className="w-[90%]">
              {activeIntensity && (
                <IntensityComponent
                  size="md"
                  value={formState.intensity}
                  setValue={(value) =>
                    setFormState((prev) => ({ ...prev, intensity: value }))
                  }
                />
              )}
            </div>
          </section>
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
              placeholder="Renseigner vos notes"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setFormState((prev) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
              value={formState.notes}
            />
          </section>
          <section className="flex flex-col items-start justify-center gap-2 mt-4">
            <p className="text-xs">
              Si une récurrence est appliquée vous pouvez adapter les différents
              paramètres ci-dessous (+1 rep par semaine avec -1 série à la même
              intensité par exemple)
            </p>
            <section className="flex justify-center items-center gap-2">
              <TextInputField
                label="Séries"
                type="number"
                placeholder="Séries à ajouter ou enlever"
                value={config.serie ? config.serie : 0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfig((prev) => ({
                    ...prev,
                    serie: Number(e.target.value),
                  }))
                }
              />
              <TextInputField
                label="Répétitions"
                type="number"
                placeholder="Répétitions à ajouter ou enlever"
                value={config.rep ? config.rep : 0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfig((prev) => ({
                    ...prev,
                    rep: Number(e.target.value),
                  }))
                }
              />
              <TextInputField
                label="Intensité"
                type="number"
                placeholder="Intensité à ajouter ou enlever"
                value={config.intensity ? config.intensity : 0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfig((prev) => ({
                    ...prev,
                    intensity: Number(e.target.value),
                  }))
                }
              />
            </section>
          </section>
        </ModalBody>
        <ModalFooter className="flex justify-between items-center w-full">
          <div className="flex-1">
            <p className="flex-1 text-xs text-gray-600">
              * Champs obligatoires
            </p>
          </div>
          <div className="flex flex-1 justify-end items-center w-full gap-2">
            <Button
              variant="secondary"
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
