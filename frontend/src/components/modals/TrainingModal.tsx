import { ChangeEvent, useEffect, useState } from "react";
import { format, setDay } from "date-fns";
import { addWeeks } from "date-fns";
import { fr } from "date-fns/locale";
import { useUserStore } from "@/services/zustand/userStore";
import { useStudentStore } from "@/services/zustand/studentStore";
import FeedbackModal from "./FeedbackModal";
import useIsDesktop from "@/pages/UnsupportedScreen/useIsDesktop";
import {
  Exercice,
  ExerciceModel,
  Training,
  useAddTrainingCrewMutation,
  useAddTrainingMutation,
  useAddTrainingStudentMutation,
  useDeleteExerciceMutation,
  useDeleteTrainingMutation,
  useGetAllExercicesModelQuery,
  useUpdateTrainingMutation,
} from "@/graphql/hooks";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Switch,
  Checkbox,
} from "@heroui/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip } from "@heroui/react";
import { TextInputField, Textarea } from "evergreen-ui";
import { Loader2, Plus, SlidersHorizontal } from "lucide-react";
import Delete from "../Delete";
import Edit from "../Edit";
import ExerciceModal from "./ExerciceModal";
import ExerciceCard from "../ExerciceCard";
import { Input } from "../ui/input";
import ExerciceModelCard from "../ExerciceModelCard";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useCrewStore } from "@/services/zustand/crewStore";

interface Config {
  rep: number;
  serie: number;
  intensity: number;
}

type TrainingModalProps = {
  training?: Training;
  open: boolean;
  close: () => void;
  date: Date;
  refetch: {
    refetchMyTraining: () => void;
    refetchStudentTraining: () => void;
    refetchMyFeedbacks: () => void;
    refetchStudentFeedbacks: () => void;
    refetchCrewTraining: () => void;
  };
  isShow?: boolean;
  isNew?: boolean;
  setIsShow?: (value: boolean) => void;
};

export default function TrainingModal({
  training,
  date,
  close,
  open,
  refetch,
  isShow = false,
  setIsShow,
  isNew = false,
}: TrainingModalProps) {
  const currentUser = useUserStore((state) => state.user);
  const currentStudent = useStudentStore((state) => state.student);
  const currentCrew = useCrewStore((state) => state.crew);
  const isCoach = currentUser?.roles === "COACH";
  // To show on card Training
  const formatedDate = format(date, "eeee d MMMM", { locale: fr });
  const [addTraining, { loading }] = useAddTrainingMutation();
  const [addTrainingStudent, { loading: loadingStudent }] =
    useAddTrainingStudentMutation();
  const [addTrainingCrew, { loading: loadingCrew }] =
    useAddTrainingCrewMutation();
  const [deleteTraining, { loading: loadingDelete }] =
    useDeleteTrainingMutation();
  const [updateTraining, { loading: loadingUpdate }] =
    useUpdateTrainingMutation();
  const [deleteExercice] = useDeleteExerciceMutation();
  const [openFeedback, setOpenFeedback] = useState<boolean>(false);
  const [openRecurrent, setOpenRecurrent] = useState<boolean>(false);
  const [openExerciceModal, setOpenExerciceModal] = useState(false);
  const [title, setTitle] = useState<string>(training ? training.title : "");
  const [notes, setNotes] = useState<string>(
    training && training.notes ? training.notes : ""
  );
  const [color, setColor] = useState(
    training && training.color ? training.color : "#3B82F6"
  );

  const [selectedDate, setSelectedDate] = useState<string>(
    training ? training.date : ""
  );
  const [editable, setEditable] = useState<boolean>(
    training ? training.editable : true
  );
  const [error, setError] = useState<boolean>(false);
  const [recurrence, setRecurrence] = useState<string>("");
  const [recurrentDate, setRecurrentDate] = useState<Date[]>([
    new Date(selectedDate),
  ]);
  const [exercices, setExercices] = useState<Exercice[]>(
    training && training.exercices ? training.exercices : []
  );
  const [exerciceConfigs, setExerciceConfigs] = useState<
    Record<string, Config>
  >({});
  const [editingExercice, setEditingExercice] = useState<Exercice | null>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const [modelInput, setModelInput] = useState<string>("");
  const [myModel, setMyModel] = useState<boolean>(false);
  const { data: dataExerciceModel } = useGetAllExercicesModelQuery({
    variables: {
      data: {
        id: myModel ? currentUser?.id : null,
        input: modelInput ? modelInput : null,
      },
    },
  });

  const exerciceModels =
    dataExerciceModel && dataExerciceModel.getAllExercicesModel
      ? dataExerciceModel.getAllExercicesModel
      : [];

  useEffect(() => {
    if (open) {
      if (isNew) {
        setTitle("");
        setNotes("");
        setSelectedDate(format(date, "yyyy-MM-dd"));
        setExercices([]);
        setEditable(true);
        setRecurrence("");
        setOpenRecurrent(false);
      } else {
        setTitle(training?.title || "");
        setNotes(training?.notes || "");
        setSelectedDate(
          format(training?.date, "yyyy-MM-dd") || format(date, "yyyy-MM-dd")
        );
        setExercices(training?.exercices || []);
      }
    }
  }, [open, isNew, date, training]);

  const switchView = () => {
    if (setIsShow) setIsShow(false);
  };

  //Reseting error state
  useEffect(() => {
    setError(false);
  }, [open]);

  const DAYS = [
    { id: 1, label: "Lundi" },
    { id: 2, label: "Mardi" },
    { id: 3, label: "Mercredi" },
    { id: 4, label: "Jeudi" },
    { id: 5, label: "Vendredi" },
    { id: 6, label: "Samedi" },
    { id: 0, label: "Dimanche" },
  ];

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Add more date for multiple insert
  const addDate = (repetition: number): void => {
    const newDates: Date[] = [];

    selectedDays.forEach((day) => {
      const baseDate = setDay(new Date(selectedDate), day, { weekStartsOn: 1 });

      for (let i = 0; i < repetition; i++) {
        newDates.push(addWeeks(baseDate, i));
      }
    });

    setRecurrentDate(newDates.sort((a, b) => a.getTime() - b.getTime()));
  };
  useEffect(() => {
    addDate(Number(recurrence));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recurrence, selectedDays]);

  const id =
    (currentCrew && (currentCrew.id.toString() as string)) ||
    (currentStudent && (currentStudent.id.toString() as string)) ||
    (currentUser && (currentUser.id.toString() as string));

  const handleSave = async () => {
    if (title === "") {
      setError(true);
      return;
    }
    try {
      // Ajout des configurations aux exercices
      const exercicesWithConfig = exercices.map((e) => ({
        ...e,
        config: openRecurrent ? exerciceConfigs[e.id] || null : null,
      }));

      const data = {
        id: id as string,
        title,
        notes,
        date: openRecurrent ? recurrentDate : [new Date(selectedDate)],
        editable,
        color,
        exercices: exercicesWithConfig,
      };

      if (isNew) {
        if (currentStudent?.id) {
          await addTrainingStudent({ variables: { data } });
          refetch.refetchStudentTraining();
        } else if (currentCrew?.id) {
          await addTrainingCrew({ variables: { data } });
          refetch.refetchCrewTraining();
        } else {
          await addTraining({ variables: { data } });
          refetch.refetchMyTraining();
        }
      } else if (training?.id) {
        await updateTraining({
          variables: {
            data: {
              ...data,
              id: training.id.toString(),
            },
          },
        });
        if (!currentStudent) {
          refetch.refetchMyTraining();
          refetch.refetchMyFeedbacks();
        }
        if (currentStudent) refetch.refetchStudentTraining();
        if (currentCrew) refetch.refetchCrewTraining();
      }
      setIsShow?.(true);
      close();
    } catch (error) {
      console.error("Error saving training:", error);
    }
  };

  const handleDelete = async () => {
    await deleteTraining({
      variables: {
        id: training?.id as string,
      },
    });
    if (currentStudent) refetch.refetchStudentTraining();
    if (currentCrew) refetch.refetchCrewTraining();
    refetch.refetchMyTraining();
    close();
  };

  const handleDeleteExercice = async (exerciceId: string) => {
    if (isNew) {
      const newExercices = exercices.filter((e) => e.id !== exerciceId);
      setExercices(newExercices);
    } else {
      await deleteExercice({
        variables: {
          id: exerciceId,
        },
      });
      const newExercices = exercices.filter((e) => e.id !== exerciceId);
      setExercices(newExercices);
    }
  };

  const handleUpdateExercice = async (exerciceId: string) => {
    const exerciceToEdit = exercices.find((e) => e.id === exerciceId);
    setEditingExercice(exerciceToEdit || null);
    setOpenExerciceModal(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setExercices((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    })
  );

  const isDesktop = useIsDesktop(1920);

  return (
    <Modal
      scrollBehavior="inside"
      isOpen={open}
      onOpenChange={() => close()}
      isDismissable={false}
      size={!isDesktop && !isShow ? "full" : "3xl"}
      style={{ backgroundColor: "#f3f4f6" }}
      classNames={{
        closeButton: "text-black hover:bg-black/5 active:bg-black/10",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: isDesktop ? "w-[70%] m-auto" : "",
      }}
    >
      {training && (
        <FeedbackModal
          isOpen={openFeedback}
          setOpen={setOpenFeedback}
          trainingId={training.id}
          closeTrainingModal={close}
          refetch={refetch}
        />
      )}
      <ModalContent className="h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <ModalHeader className="w-full flex justify-center">
          <p>Entraînement</p>
        </ModalHeader>
        <ModalBody
          style={{
            gap: "8px",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            flex: 1,
            height: "100%",
          }}
          className="[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 pr-2"
        >
          {!isShow && (
            <section className="sticky top-0 h-full w-[50%] bg-white shadow-md rounded-lg p-4 overflow-y-auto flex flex-col gap-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100">
              <p className="font-bold">Modèles d'exercices</p>
              <div className="w-full flex items-center justify-between gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Recherche un exercice"
                    className="placeholder:text-xs"
                    value={modelInput}
                    onChange={(e) => setModelInput(e.target.value)}
                  />
                </div>
                <div className="hover:bg-black/5 p-2 rounded-full cursor-pointer">
                  <Tooltip
                    content="Filtres"
                    showArrow={true}
                    color="foreground"
                    className="text-xs"
                  >
                    <SlidersHorizontal size={18} />
                  </Tooltip>
                </div>
              </div>
              <Switch size="sm" isSelected={myModel} onValueChange={setMyModel}>
                <p className="text-xs">Uniquement mes exercices</p>
              </Switch>
              {exerciceModels.length > 0 ? (
                exerciceModels.map((e: ExerciceModel) => (
                  <ExerciceModelCard
                    key={e.id}
                    exercice={e}
                    setExercices={setExercices}
                    exercices={exercices}
                    isNew={isNew}
                    trainingId={training?.id}
                  />
                ))
              ) : (
                <p className="text-xs items-start w-full text-gray-400">
                  {myModel
                    ? "Vous n'avez aucun modèle d'exercice"
                    : "Aucun exercice trouvé"}
                </p>
              )}
            </section>
          )}
          <section className="flex flex-col gap-2 w-full h-full">
            <section className="flex flex-col justify-center items-center gap-3 p-4 rounded-lg bg-white shadow-md">
              <p className="w-full items-start font-bold">
                Informations générales
              </p>
              <section className="w-full flex justify-center items-center gap-2">
                {!isShow ? (
                  <>
                    <div className="relative flex-1">
                      <TextInputField
                        isInvalid={error}
                        required
                        label="Titre"
                        type="text"
                        value={title}
                        placeholder="Titre de l'entraînement"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setError(false);
                          setTitle(e.target.value);
                        }}
                      />
                      {error && (
                        <p className="text-red-500 text-xs absolute top-[65px] left-1">
                          Veuillez renseigner ce champ
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <TextInputField
                        required
                        label="Date"
                        type="date"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setSelectedDate(e.target.value)
                        }
                        value={selectedDate}
                      />
                    </div>
                    <div>
                      <Input
                        disabled
                        type="color"
                        className="w-9 h-9 rounded-full border-none p-0 m-4 cursor-pointer"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      <Label htmlFor="title" className="pl-2 text-xs">
                        Titre
                      </Label>
                      <p className="text-sm pl-2 font-bold">
                        {training?.title}
                      </p>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="date" className="pl-2 text-xs">
                        Date
                      </Label>
                      <p className="text-sm pl-2 font-bold">
                        {formatedDate[0].toUpperCase() + formatedDate.slice(1)}
                      </p>
                    </div>
                  </>
                )}
              </section>
            </section>
            <section className="flex flex-col justify-start items-center gap-3 w-full p-4 rounded-lg bg-white shadow-md flex-grow">
              <p className="w-full items-start font-bold">Exercices</p>
              <DndContext
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
                sensors={sensors}
              >
                <SortableContext items={exercices}>
                  <div className="w-full h-full flex flex-col gap-3">
                    {exercices.map((e: Exercice) => (
                      <ExerciceCard
                        key={e.id}
                        id={e.id}
                        title={e.title}
                        rep={e.rep}
                        serie={e.serie}
                        weight={e.weight}
                        intensity={e.intensity}
                        notes={e.notes}
                        type={e.type}
                        isShow={isShow}
                        onDelete={handleDeleteExercice}
                        onUpdate={handleUpdateExercice}
                      />
                    ))}
                    <ExerciceModal
                      open={openExerciceModal}
                      onClose={() => setOpenExerciceModal(false)}
                      setExercices={setExercices}
                      exercices={exercices}
                      exerciceToEdit={editingExercice}
                      isNew={isNew}
                      trainingId={training?.id}
                    />
                    {!isShow && (
                      <div
                        className={`group rounded-lg flex justify-center items-center bg-gray-50 cursor-pointer h-full`}
                        onClick={() => {
                          setEditingExercice(null);
                          setOpenExerciceModal(true);
                        }}
                      >
                        <Tooltip
                          content="Ajouter un exercice"
                          className="text-xs"
                          showArrow={true}
                          color="foreground"
                        >
                          <Plus className="size-8 text-gray-500 transition duration-150 group-hover:scale-110 group-hover:text-black" />
                        </Tooltip>
                      </div>
                    )}
                    {exercices.length === 0 && isShow && (
                      <p className="text-xs items-start w-full text-gray-400">
                        Aucun exercice
                      </p>
                    )}
                  </div>
                </SortableContext>
              </DndContext>
            </section>
            <section className="flex flex-col justify-start gap-3 w-full p-4 rounded-lg bg-white shadow-md">
              <p className="w-full items-start font-bold">Notes</p>
              {!isShow ? (
                <Textarea
                  value={notes}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setNotes(e.target.value)
                  }
                  placeholder="Ajouter des notes"
                  className="h-full resize-none"
                />
              ) : (
                <p className={`text-xs ${!training?.notes && "text-gray-400"}`}>
                  {training?.notes ? training?.notes : "Aucune note ajoutée"}
                </p>
              )}
            </section>
            {!isShow && (
              <section className="flex flex-col justify-center items-start gap-4 w-full p-4 rounded-lg bg-white shadow-md h-[10%] overflow-y-auto">
                {currentStudent && (
                  <Switch
                    isSelected={editable}
                    onValueChange={setEditable}
                    size="sm"
                  >
                    <p className="text-xs">
                      Autoriser l'élève à modifier cet entraînement
                    </p>
                  </Switch>
                )}
                <Switch
                  isSelected={openRecurrent}
                  onValueChange={setOpenRecurrent}
                  size="sm"
                >
                  <p className="text-xs">Ajouter une récurrence</p>
                </Switch>
                {openRecurrent && (
                  <>
                    <section className="flex flex-col justify-center items-start w-full rounded-lg bg-white">
                      <TextInputField
                        className="m-0"
                        type="number"
                        label="Récurrence"
                        placeholder="Nombre de semaines"
                        hint="Indiquez le nombre de semaines pendant lesquelles vous souhaitez répéter l'entraînement."
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setRecurrence(e.target.value)
                        }
                        value={recurrence}
                      />
                    </section>
                    <div className="space-y-2">
                      <Label>Jours de répétition</Label>
                      <div className="flex flex-wrap gap-4">
                        {DAYS.map(({ id, label }) => (
                          <div key={id} className="flex items-center">
                            <Checkbox
                              isSelected={selectedDays.includes(id)}
                              onValueChange={() => toggleDay(id)}
                            />
                            <Label className="text-xs">{label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4 border-t pt-4">
                      <p className="text-sm font-semibold">
                        Configuration des exercices
                      </p>
                      <p className="text-xs text-gray-500">
                        Configurez l'évolution de chaque exercice sur la période
                      </p>
                      {exercices.map((e: Exercice) => (
                        <div
                          key={e.id}
                          className="space-y-2 border p-4 rounded-lg"
                        >
                          <p className="text-xs font-semibold">{e.title}</p>
                          <div className="flex gap-2">
                            <TextInputField
                              label="Séries"
                              type="number"
                              placeholder="+/- séries"
                              value={exerciceConfigs[e.id]?.serie || 0}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setExerciceConfigs((prev) => ({
                                  ...prev,
                                  [e.id]: {
                                    ...(prev[e.id] || {
                                      rep: 0,
                                      serie: 0,
                                      intensity: 0,
                                    }),
                                    serie: Number(event.target.value),
                                  },
                                }))
                              }
                            />
                            <TextInputField
                              label="Répétitions"
                              type="number"
                              placeholder="+/- répétitions"
                              value={exerciceConfigs[e.id]?.rep || 0}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setExerciceConfigs((prev) => ({
                                  ...prev,
                                  [e.id]: {
                                    ...(prev[e.id] || {
                                      rep: 0,
                                      serie: 0,
                                      intensity: 0,
                                    }),
                                    rep: Number(event.target.value),
                                  },
                                }))
                              }
                            />
                            <TextInputField
                              label="Intensité"
                              type="number"
                              placeholder="+/- intensité"
                              value={exerciceConfigs[e.id]?.intensity || 0}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setExerciceConfigs((prev) => ({
                                  ...prev,
                                  [e.id]: {
                                    ...(prev[e.id] || {
                                      rep: 0,
                                      serie: 0,
                                      intensity: 0,
                                    }),
                                    intensity: Number(event.target.value),
                                  },
                                }))
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </section>
            )}
          </section>
        </ModalBody>
        <ModalFooter
          className={`flex ${
            isShow ? "justify-end" : "justify-between"
          } items-center w-full`}
        >
          {!isShow && (
            <div>
              <p className="flex-1 text-xs text-gray-600">
                * Champs obligatoires
              </p>
            </div>
          )}
          <div className="flex justify-center items-center gap-2">
            {(training?.editable || isCoach) && (
              <div className="flex justify-center items-center">
                {isShow && <Edit onClick={switchView} />}
                {isShow && (
                  <Delete
                    onDelete={handleDelete}
                    loading={loadingDelete}
                    description="Souhaitez-vous vraiment supprimer cet entraînement ?"
                    title="Suppresion d'un entraînement"
                  />
                )}
              </div>
            )}
            {isShow ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  close();
                }}
              >
                Fermer
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (setIsShow && training) setIsShow(true);
                  if (!training) {
                    close();
                  }
                }}
              >
                Annuler
              </Button>
            )}
            {!isShow ? (
              <Button
                type="button"
                className="bg-primary hover:bg-blue-600"
                onClick={handleSave}
                disabled={loading || loadingStudent || loadingUpdate}
              >
                {(loading ||
                  loadingStudent ||
                  loadingCrew ||
                  loadingUpdate) && <Loader2 className="animate-spin" />}
                Sauvegarder
              </Button>
            ) : (
              !currentStudent &&
              !currentCrew &&
              training?.crew === null && (
                <Button
                  type="submit"
                  className="bg-primary hover:bg-blue-600 transition duration-150"
                  disabled={training?.validate}
                  onClick={() => setOpenFeedback(true)}
                >
                  Valider l'entraînement
                </Button>
              )
            )}
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
