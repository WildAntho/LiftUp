import { ChangeEvent, useEffect, useState } from "react";
import { format, setDay } from "date-fns";
import { addWeeks } from "date-fns";
import { fr } from "date-fns/locale";
import { useUserStore } from "@/services/zustand/userStore";
import { useStudentStore } from "@/services/zustand/studentStore";
import FeedbackModal from "./FeedbackModal";
import useIsDesktop from "@/pages/UnsupportedScreen/useIsDesktop";
import {
  AddExercicePlanInput,
  Exercice,
  ExerciceData,
  IntensityFormat,
  RepFormat,
  ScopeExercice,
  Training,
  useAddExerciceMutation,
  useAddTrainingCrewMutation,
  useAddTrainingMutation,
  useAddTrainingStudentMutation,
  useDeleteExerciceMutation,
  useDeleteTrainingMutation,
  useUpdateExerciceMutation,
  useUpdateTrainingMutation,
  WeightFormat,
} from "@/graphql/hooks";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Switch,
  Checkbox,
  Input,
  Textarea,
} from "@heroui/react";
import { Label } from "@/components/ui/label";
import Delete from "../Delete";
import Edit from "../Edit";
import ExerciceCard from "../ExerciceCard";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useCrewStore } from "@/services/zustand/crewStore";
import { Separator } from "../ui/separator";
import { TextInputField } from "evergreen-ui";
import ExerciceComponent from "@/pages/Home/Program/components/Configuration/components/ExerciceComponent";
import ConfirmModal from "./ConfirmModal";
import Saving from "../Saving";
import Cancel from "../Cancel";
import ConfirmButton from "../ConfirmButton";

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
  const [updateExercice] = useUpdateExerciceMutation();
  const [addExercice] = useAddExerciceMutation();
  const [openFeedback, setOpenFeedback] = useState<boolean>(false);
  const [openRecurrent, setOpenRecurrent] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(training ? training.title : "");
  const [notes, setNotes] = useState<string>(
    training && training.notes ? training.notes : ""
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
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

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
          training?.date
            ? format(new Date(training.date), "yyyy-MM-dd")
            : format(date, "yyyy-MM-dd")
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

  const handleCreateExercice = async (
    exercicesToAdd: AddExercicePlanInput[]
  ) => {
    const newExercices = [...exercices];
    exercicesToAdd.forEach((e) =>
      newExercices.push({
        ...e,
        intensityFormat: IntensityFormat.Rpe,
        repFormat: RepFormat.Standard,
        weightFormat: WeightFormat.Kg,
      } as Exercice)
    );
    setExercices(newExercices);
    if (!isNew) {
      await addExercice({
        variables: {
          id: training?.id as string,
          exercices: exercicesToAdd,
          scope: ScopeExercice.Calendar,
        },
      });
      if (currentStudent) refetch.refetchStudentTraining();
      if (currentCrew) refetch.refetchCrewTraining();
      refetch.refetchMyTraining();
    }
  };

  const handleDeleteExercice = async (exerciceId: string) => {
    const newExercices = exercices.filter((e) => e.id !== exerciceId);
    setExercices(newExercices);
    if (!isNew) {
      await deleteExercice({
        variables: {
          id: exerciceId,
        },
      });
      if (currentStudent) refetch.refetchStudentTraining();
      if (currentCrew) refetch.refetchCrewTraining();
      refetch.refetchMyTraining();
    }
  };

  const handleUpdateExercice = async (id: string, exercice: ExerciceData) => {
    setExercices((prev) =>
      prev.map((ex) =>
        ex.id === id
          ? ({
              ...ex,
              ...exercice,
            } as Exercice)
          : ex
      )
    );
    if (!isNew) {
      await updateExercice({
        variables: {
          data: exercice,
          id,
        },
      });
      if (currentStudent) refetch.refetchStudentTraining();
      if (currentCrew) refetch.refetchCrewTraining();
      refetch.refetchMyTraining();
    }
  };

  const handleDragEnd = async (
    event: DragEndEvent,
    localExercices: Exercice[],
    setLocalExercices: (exercices: Exercice[]) => void
  ) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = localExercices.findIndex((item) => item.id === active.id);
    const newIndex = localExercices.findIndex((item) => item.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = arrayMove(localExercices, oldIndex, newIndex);
    setLocalExercices(newOrder);
    setExercices(newOrder);
    await Promise.all(
      newOrder.map((ex, index) => {
        if (ex.position !== index) {
          return handleUpdateExercice(ex.id, { ...ex, position: index });
        }
      })
    );
  };

  const isDesktop = useIsDesktop(1920);

  return (
    <Modal
      scrollBehavior="inside"
      isOpen={open}
      onOpenChange={() => close()}
      isDismissable={false}
      size="5xl"
      style={{ backgroundColor: "#FFFFFF" }}
      className="rounded-xl overflow-hidden"
      classNames={{
        closeButton: "text-white hover:bg-white/5 active:bg-white/10",
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
      <ModalContent className="h-full">
        <ModalHeader
          className={`w-full flex justify-center mb-2 ${
            isShow ? "rounded-t-lg" : ""
          } bg-dark text-white`}
        >
          {isNew && <p>Création d'un entraînement</p>}
          {!isNew && !isShow && <p>Edition d'un entraînement</p>}
          {isShow && <p>Entraînement</p>}
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
        >
          <section className="flex flex-col gap-2 w-full h-full">
            <section className="flex-none flex flex-col justify-center items-center gap-3 p-4 rounded-lg min-h-[15%]">
              <p className="w-full items-start font-bold">
                Informations générales
              </p>
              <section className="w-full flex justify-center items-center gap-2">
                {!isShow ? (
                  <>
                    <div className="relative flex-1">
                      <Input
                        isInvalid={error}
                        isRequired
                        type="text"
                        value={title}
                        label="Titre de l'entraînement"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setError(false);
                          setTitle(e.target.value);
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        isRequired
                        label="Date"
                        type="date"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setSelectedDate(e.target.value)
                        }
                        value={selectedDate}
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
            <Separator />
            <section className="flex flex-col justify-start items-center gap-3 w-full p-4 flex-1">
              <p className="w-full items-start font-bold">Exercices</p>
              {isShow && (
                <div className="w-[90%] h-full flex flex-col gap-2">
                  {exercices.map((e: Exercice) => (
                    <div className="w-full min-h-28" key={e.id}>
                      <ExerciceCard exercice={e} />
                    </div>
                  ))}
                </div>
              )}
              {!isShow && (
                <ExerciceComponent
                  exercices={exercices}
                  trainingId={training?.id ?? "1"}
                  onDelete={handleDeleteExercice}
                  onUpdate={handleUpdateExercice}
                  onCreate={handleCreateExercice}
                  onUpdateDrag={handleDragEnd}
                  fromCalendar
                />
              )}
            </section>
            <Separator />
            <section className="flex-none flex flex-col justify-start gap-3 w-full p-4">
              <p className="w-full items-start font-bold">Notes</p>
              {!isShow ? (
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  label="Ajouter des notes"
                  minRows={6}
                />
              ) : (
                <p className={`text-xs ${!training?.notes && "text-gray-400"}`}>
                  {training?.notes ? training?.notes : "Aucune note ajoutée"}
                </p>
              )}
            </section>
            {!isShow && <Separator />}
            {!isShow && (
              <section className="flex-none flex flex-col justify-center items-start gap-4 w-full p-4">
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
                      <Input
                        className="m-0"
                        type="number"
                        label="Nombre de semaines"
                        description="Indiquez le nombre de semaines pendant lesquelles vous souhaitez répéter l'entraînement."
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
          className={`flex w-full ${
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
          <div className="flex flex-1 justify-end items-center gap-2">
            {(training?.editable || isCoach) && (
              <div className="flex justify-center items-center">
                {isShow && <Edit onClick={switchView} />}
                {isShow && (
                  <Delete
                    onClick={handleDelete}
                    loading={loadingDelete}
                    id={training?.id as string}
                    title="entraînement"
                  />
                )}
              </div>
            )}
            {isShow ? (
              <Cancel
                title="Fermer"
                onClick={() => {
                  close();
                }}
              />
            ) : (
              <Cancel
                title="Annuler"
                onClick={() => {
                  if (setIsShow && training) setIsShow(true);
                  if (!training) {
                    close();
                  }
                }}
              />
            )}
            {!isShow ? (
              <Saving
                onClick={handleSave}
                loading={
                  loading || loadingStudent || loadingUpdate || loadingCrew
                }
              />
            ) : (
              !currentStudent &&
              !currentCrew &&
              training?.crew === null && (
                <ConfirmButton
                  onClick={() => setOpenFeedback(true)}
                  title="Valider l'entraînement"
                />
              )
            )}
          </div>
        </ModalFooter>
      </ModalContent>
      <ConfirmModal
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        description="Êtes-vous sîr de vouloir supprimer cet entraînement ?"
        onConfirm={handleDelete}
        loading={loadingDelete}
      />
    </Modal>
  );
}
