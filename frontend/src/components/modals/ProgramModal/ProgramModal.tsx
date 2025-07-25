import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Select, SelectItem } from "@heroui/react";
import { Check, ChevronDown, Info, Loader2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Privacy from "./components/Privacy";
import {
  ProgramLevel,
  ProgramStatus,
  useCreateProgramMutation,
  useGetAllCategoriesQuery,
} from "@/graphql/hooks";
import { useProgramStore } from "@/services/zustand/programStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { allLevel } from "@/services/utils";
import LexicalEditorComponent from "@/components/LexicalEditor/LexicalEditorComponent";
import { commissionProgram } from "@/services/constants";
import { ApolloError } from "@apollo/client";

type ProgramModalProps = {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
};

export type ProgramForm = {
  public: boolean;
  title: string;
  description: string;
  duration: number;
  price: number;
  level: ProgramLevel | string;
  categoryId: string | null;
};

type Step = {
  title: string;
  isCompleted: boolean;
};

export default function ProgramModal({
  open,
  onClose,
  refetch,
}: ProgramModalProps) {
  const navigate = useNavigate();
  const setProgram = useProgramStore((state) => state.set);
  const [createProgram, { loading }] = useCreateProgramMutation();
  const { data } = useGetAllCategoriesQuery();
  const [currentStep, setCurrentStep] = useState(1);
  const [content, setContent] = useState<object | null>(null);
  const [form, setForm] = useState<ProgramForm>({
    public: false,
    title: "",
    description: "",
    duration: 1,
    price: 0,
    level: ProgramLevel.Beginner,
    categoryId: null,
  });

  const categories = data?.getAllCategories ?? [];

  const resetForm = () => {
    setForm({
      public: false,
      title: "",
      description: "",
      duration: 1,
      price: 0,
      level: ProgramLevel.Beginner,
      categoryId: null,
    });
    setCurrentStep(1);
  };

  const getSteps = (): Step[] => {
    const baseSteps = [
      { title: "Confidentialité", isCompleted: true },
      {
        title: "Informations générales",
        isCompleted: form.title !== "",
      },
    ];

    if (form.public) {
      baseSteps.push({
        title: "Informations complémentaires",
        isCompleted: form.price > 0 && form.level.length > 0,
      });
    }

    return baseSteps;
  };

  const steps = getSteps();

  const handleNext = () => {
    if (currentStep < (form.public ? 3 : 2)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canContinue = () => {
    if (currentStep === 1) return true;
    if (currentStep === 2) return form.title !== "";
    if (currentStep === 3) return form.price > 0 && form.level;
    return false;
  };

  const handleSubmit = async () => {
    try {
      const { data } = await createProgram({
        variables: {
          data: {
            ...form,
            description: JSON.stringify(content),
            level: form.level ? form.level : ProgramLevel.Beginner,
          },
        },
      });
      setProgram({
        id: data?.createProgram.id as string,
        duration: data?.createProgram.duration as number,
        title: data?.createProgram.title as string,
        description: data?.createProgram.description as string,
        status: data?.createProgram.status as ProgramStatus,
        public: data?.createProgram.public as boolean,
        price: data?.createProgram.price as number,
        level: data?.createProgram.level as ProgramLevel,
        categoryId: data?.createProgram?.category?.id as string,
      });
      resetForm();
      onClose();
      refetch();
      navigate("/home?tab=program&section=configuration");
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.message, {
          style: {
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
          },
        });
      }
    }
  };

  const isLastStep = () => {
    return form.public ? currentStep === 3 : currentStep === 2;
  };

  const handleStepClick = (stepIndex: number) => {
    if (
      stepIndex < currentStep ||
      (steps[stepIndex - 1]?.isCompleted && stepIndex <= (form.public ? 3 : 2))
    ) {
      setCurrentStep(stepIndex);
    }
  };

  const handleChangeContent = (content: object) => {
    setContent(content);
  };

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={open}
      onOpenChange={() => {
        resetForm();
        onClose();
      }}
      size="2xl"
      isDismissable={false}
      classNames={{
        closeButton: "text-white hover:bg-black/5 active:bg-black/10",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
      }}
    >
      <ModalContent>
        <ModalHeader className="w-full flex justify-center mb-2 bg-dark rounded-t-lg">
          <p className="text-xl font-semibold text-white">
            Création d'un nouveau programme
          </p>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-6">
          <div className="flex flex-col gap-8 py-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative ${
                  index + 1 > currentStep ? "opacity-50" : ""
                }`}
              >
                {index < steps.length - 1 && (
                  <div
                    className="absolute left-[15px] top-[30px] h-full w-[2px] bg-gray-200"
                    style={{ height: "calc(100% - 5px)" }}
                  />
                )}
                <div
                  className={`flex gap-4 ${
                    index + 1 <= currentStep || step.isCompleted
                      ? "cursor-pointer"
                      : ""
                  }`}
                  onClick={() => handleStepClick(index + 1)}
                >
                  <div className="relative z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-200">
                    {step.isCompleted && index + 1 <= currentStep ? (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-green-500 text-white">
                        <Check className="h-4 w-4" />
                      </div>
                    ) : (
                      <span className="text-sm">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{step.title}</h3>
                      <motion.div
                        initial={false}
                        animate={{
                          rotate: currentStep === index + 1 ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {currentStep === index + 1 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4">
                            {index === 0 && (
                              <div className="grid grid-cols-2 gap-4 p-4">
                                <Privacy
                                  type="private"
                                  title="Privé"
                                  description="Gardez votre programme privé et personnalisé pour vos clients"
                                  selected={!form.public}
                                  onSelect={() =>
                                    setForm({ ...form, public: false })
                                  }
                                />
                                <Privacy
                                  type="public"
                                  title="Public"
                                  description="Partagez votre programme avec la communauté et monétisez votre expertise"
                                  selected={form.public}
                                  onSelect={() =>
                                    setForm({ ...form, public: true })
                                  }
                                />
                              </div>
                            )}
                            {index === 1 && (
                              <div className="flex flex-col gap-4">
                                <div>
                                  <Input
                                    data-testid="program-title"
                                    label="Titre du programme"
                                    isRequired
                                    value={form.title}
                                    onChange={(e) =>
                                      setForm({
                                        ...form,
                                        title: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div data-testid="program-description">
                                  <LexicalEditorComponent
                                    onChange={handleChangeContent}
                                    value={content}
                                    readOnly={false}
                                  />
                                  <p className="flex justify-start items-center gap-2 text-xs text-gray-500 mt-1">
                                    <Info className="w-5 h-5 text-gray-500" />
                                    Si ce programme est public, renseignez une
                                    description qui sera visible par tous les
                                    élèves voulant souscrire.
                                  </p>
                                </div>
                                <div>
                                  <Input
                                    data-testid="program-duration"
                                    label="Durée (semaines)"
                                    type="number"
                                    isRequired
                                    min={1}
                                    value={form.duration.toString()}
                                    onChange={(e) =>
                                      setForm({
                                        ...form,
                                        duration: parseInt(e.target.value),
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            )}
                            {index === 2 && (
                              <div className="flex flex-col justify-center items-center gap-2">
                                <div className="w-full flex items-center gap-2">
                                  <Select
                                    label="Catégorie de programme"
                                    placeholder="Choisir une catégorie"
                                    isRequired
                                    selectedKeys={
                                      form.categoryId ? [form.categoryId] : []
                                    }
                                    onChange={(e) =>
                                      setForm({
                                        ...form,
                                        categoryId: e.target.value as string,
                                      })
                                    }
                                  >
                                    {categories.map((c) => (
                                      <SelectItem key={c.id} value={c.id}>
                                        {c.label}
                                      </SelectItem>
                                    ))}
                                  </Select>
                                  <Select
                                    label="Niveau de pratique"
                                    isRequired
                                    selectedKeys={
                                      form.level ? [form.level] : []
                                    }
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
                                <Input
                                  label="Prix (€)"
                                  type="number"
                                  isRequired
                                  min={0}
                                  step={1}
                                  description={
                                    <p className="flex justify-start items-center gap-2">
                                      <AlertTriangle />
                                      La plateforme prend{" "}
                                      {commissionProgram * 100}% du prix vendu
                                    </p>
                                  }
                                  value={form.price.toString()}
                                  onChange={(e) =>
                                    setForm({
                                      ...form,
                                      price: parseFloat(e.target.value),
                                    })
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-end items-center">
          {currentStep > 1 && (
            <Button
              variant="outline"
              className="text-tertiary border-tertiary hover:bg-tertiary/10 hover:text-tertiary"
              onClick={handleBack}
            >
              Retour
            </Button>
          )}
          <Button
            data-testid="continue-button"
            onClick={isLastStep() ? handleSubmit : handleNext}
            disabled={!canContinue() || loading}
          >
            {loading && <Loader2 className="animate-spin" />}
            {isLastStep() ? "Créer" : "Continuer"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
