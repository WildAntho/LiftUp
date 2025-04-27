import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@heroui/react";
import { Check, ChevronDown, Info, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Privacy from "./components/Privacy";
import { ProgramStatus, useCreateProgramMutation } from "@/graphql/hooks";
import { useProgramStore } from "@/services/zustand/programStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<ProgramForm>({
    public: false,
    title: "",
    description: "",
    duration: 1,
    price: 0,
  });

  const resetForm = () => {
    setForm({
      public: false,
      title: "",
      description: "",
      duration: 1,
      price: 0,
    });
    setCurrentStep(1);
  };

  const getSteps = (): Step[] => {
    const baseSteps = [
      { title: "Confidentialité", isCompleted: true },
      {
        title: "Informations générales",
        isCompleted: form.title !== "" && form.description !== "",
      },
    ];

    if (form.public) {
      baseSteps.push({
        title: "Tarification",
        isCompleted: form.price > 0,
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
    if (currentStep === 2) return form.title !== "" && form.description !== "";
    if (currentStep === 3) return form.price > 0;
    return false;
  };

  const handleSubmit = async () => {
    try {
      const { data } = await createProgram({
        variables: {
          data: {
            ...form,
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
      });
      resetForm();
      onClose();
      refetch();
      navigate("/home?tab=program&section=configuration");
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue lors de la création du programme");
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
                                    label="Titre du programme"
                                    variant="underlined"
                                    value={form.title}
                                    onChange={(e) =>
                                      setForm({
                                        ...form,
                                        title: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <Textarea
                                    label="Description"
                                    radius="sm"
                                    variant="bordered"
                                    value={form.description}
                                    onChange={(e) =>
                                      setForm({
                                        ...form,
                                        description: e.target.value,
                                      })
                                    }
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
                                    label="Durée (semaines)"
                                    variant="bordered"
                                    type="number"
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
                              <div className="w-[50%]">
                                <Input
                                  label="Prix (€)"
                                  variant="bordered"
                                  type="number"
                                  min={0}
                                  step={1}
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
