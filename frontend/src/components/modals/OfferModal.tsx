import {
  Offer,
  useAddOfferMutation,
  useGetAllCategoriesQuery,
  useGetCoachCrewsQuery,
  useUpdateOfferMutation,
} from "@/graphql/hooks";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Switch } from "@heroui/switch";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import { useHasPermission } from "@/services/hooks/hasPermission";
import { PERMISSIONS } from "@/services/constants";
import { motion, AnimatePresence } from "framer-motion";

type OfferModalProps = {
  open: boolean;
  onClose: () => void;
  refetch?: () => void;
  offer?: Omit<Offer, "user">;
};

type Step = {
  title: string;
  isCompleted: boolean;
};

type FormState = {
  name: string;
  categoryId: string;
  description: string;
  durability: number;
  price: number;
  crewId: string;
};

type FormError = {
  name: boolean;
  categoryId: boolean;
  description: boolean;
  durability: boolean;
  price: boolean;
};

export default function OfferModal({
  open,
  onClose,
  refetch,
  offer,
}: OfferModalProps) {
  const canManageCrew = useHasPermission(PERMISSIONS.MANAGE_CREW);
  const { data: dataCategories } = useGetAllCategoriesQuery();
  const { data: dataCrews } = useGetCoachCrewsQuery({
    skip: !canManageCrew,
  });
  const [addOffer, { loading: loadingOffer }] = useAddOfferMutation();
  const [updateOffer, { loading: loadingUpdate }] = useUpdateOfferMutation();
  const [availability, setAvailability] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    categoryId: "",
    description: "",
    durability: 0,
    price: 0,
    crewId: "",
  });
  const [formError, setFormError] = useState<FormError>({
    name: false,
    categoryId: false,
    description: false,
    durability: false,
    price: false,
  });

  const allCategories = dataCategories?.getAllCategories ?? [];
  const allCrews = dataCrews?.getCoachCrews ?? [];
  const isEditing = !!offer;

  const purgeInput = () => {
    setFormState({
      name: "",
      categoryId: "",
      description: "",
      durability: 0,
      price: 0,
      crewId: "",
    });
    setFormError({
      name: false,
      categoryId: false,
      description: false,
      durability: false,
      price: false,
    });
    setAvailability(true);
    setCurrentStep(1);
  };

  useEffect(() => {
    if (offer) {
      setFormState({
        name: offer.name,
        categoryId: offer?.category.id,
        description: offer.description,
        durability: offer.durability,
        price: offer.price,
        crewId: offer.crew?.id ?? "",
      });
      setAvailability(offer.availability);
    } else {
      purgeInput();
    }
  }, [open, offer]);

  // Logique des steps pour la création uniquement
  const getSteps = (): Step[] => {
    const baseSteps = [
      {
        title: "Désignation de l'offre",
        isCompleted: formState.name !== "",
      },
      {
        title: "Description de l'offre",
        isCompleted:
          formState.description !== "" && formState.categoryId !== "",
      },
      {
        title: "Informations complémentaires",
        isCompleted: formState.durability > 0 && formState.price > 0,
      },
    ];

    if (canManageCrew) {
      baseSteps.push({
        title: "Équipe",
        isCompleted: true,
      });
    }

    return baseSteps;
  };

  const steps = getSteps();

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canContinue = () => {
    if (currentStep === 1) return formState.name !== "";
    if (currentStep === 2)
      return formState.description !== "" && formState.categoryId !== "";
    if (currentStep === 3)
      return formState.durability > 0 && formState.price > 0;
    if (currentStep === 4) return true;
    return false;
  };

  const isLastStep = () => {
    return currentStep === steps.length;
  };

  const handleStepClick = (stepIndex: number) => {
    if (
      stepIndex < currentStep ||
      (steps[stepIndex - 1]?.isCompleted && stepIndex <= steps.length)
    ) {
      setCurrentStep(stepIndex);
    }
  };

  // Validation pour l'édition
  const validateEditForm = () => {
    const requiredFields: (keyof typeof formError)[] = [
      "name",
      "categoryId",
      "description",
      "durability",
      "price",
    ];
    let hasError = false;
    requiredFields.forEach((key) => {
      const value = formState[key];
      if (value === "" || value === 0) {
        setFormError((prev) => ({
          ...prev,
          [key]: true,
        }));
        hasError = true;
      } else {
        setFormError((prev) => ({
          ...prev,
          [key]: false,
        }));
      }
    });
    return !hasError;
  };

  const handleSave = async () => {
    // Pour l'édition, on valide tout le formulaire
    if (isEditing && !validateEditForm()) {
      return;
    }

    if (offer) {
      await updateOffer({
        variables: {
          data: {
            ...formState,
            availability,
            price: formState.price,
            crewId: formState.crewId === "" ? null : formState.crewId,
          },
          id: offer.id as string,
        },
      });
    } else {
      await addOffer({
        variables: {
          data: {
            ...formState,
            availability,
            price: Number(formState.price),
            crewId: formState.crewId === "" ? null : formState.crewId,
          },
        },
      });
    }
    refetch?.();
    purgeInput();
    onClose();
  };

  const resetForm = () => {
    purgeInput();
    onClose();
  };

  // Rendu conditionnel : Steps pour création, formulaire classique pour édition
  const renderContent = () => {
    if (isEditing) {
      // Mode édition : formulaire classique
      return (
        <div className="flex flex-col gap-6">
          <div className="w-full flex justify-center items-center gap-2 flex-1">
            <div className="w-[60%] relative">
              <Input
                isRequired
                isInvalid={formError.name}
                type="text"
                label="Désignation de l'offre"
                value={formState.name}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="w-[40%] relative">
              <Select
                isRequired
                isInvalid={formError.categoryId}
                label="Catégorie"
                selectedKeys={
                  formState.categoryId ? [formState.categoryId] : []
                }
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    categoryId: e.target.value,
                  })
                }
              >
                {allCategories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="relative">
            <Textarea
              label="Description de l'offre"
              isRequired
              isInvalid={formError.description}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              value={formState.description}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-2 flex-1">
            <div className="w-[50%] relative">
              <Input
                isRequired
                isInvalid={formError.durability}
                variant="underlined"
                type="number"
                label="Durée de l'offre (mois)"
                value={formState.durability.toString()}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    durability: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className="w-[50%] relative">
              <Input
                isRequired
                isInvalid={formError.price}
                variant="underlined"
                type="number"
                label="Prix de l'offre (€)"
                value={formState.price.toString()}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
              />
            </div>
          </div>
          {canManageCrew && (
            <div>
              <Select
                label="Équipe"
                description="Rattacher cette offre à une équipe. Les élèves qui souscriront à cette offre seront automatiquement ajoutés à l'équipe."
                selectedKeys={formState.crewId ? [formState.crewId] : []}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    crewId: e.target.value,
                  })
                }
              >
                {allCrews.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}
          <Switch
            isSelected={availability}
            onValueChange={setAvailability}
            size="sm"
          >
            <div className="flex flex-col">
              <p className="text-xs">Disponibilité de l'offre</p>
              <span className="text-[10px] text-gray-500">
                (N'hésite pas à désactiver l'offre si tu as trop d'élèves. Elle
                n'apparaîtra plus.)
              </span>
            </div>
          </Switch>
        </div>
      );
    } else {
      // Mode création : avec steps
      return (
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
                          {/* Étape 1: Titre et catégorie */}
                          {index === 0 && (
                            <div className="flex flex-col gap-4">
                              <Input
                                isRequired
                                type="text"
                                label="Désignation de l'offre"
                                value={formState.name}
                                onChange={(e) =>
                                  setFormState((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          )}

                          {/* Étape 2: Description */}
                          {index === 1 && (
                            <div className="flex flex-col gap-4">
                              <Textarea
                                label="Description de l'offre"
                                isRequired
                                onChange={(e) =>
                                  setFormState((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                  }))
                                }
                                value={formState.description}
                              />
                              <Select
                                isRequired
                                label="Catégorie"
                                selectedKeys={
                                  formState.categoryId
                                    ? [formState.categoryId]
                                    : []
                                }
                                onChange={(e) =>
                                  setFormState({
                                    ...formState,
                                    categoryId: e.target.value,
                                  })
                                }
                              >
                                {allCategories.map((c) => (
                                  <SelectItem key={c.id} value={c.id}>
                                    {c.label}
                                  </SelectItem>
                                ))}
                              </Select>
                              <Switch
                                isSelected={availability}
                                onValueChange={setAvailability}
                                size="sm"
                              >
                                <div className="flex flex-col">
                                  <p className="text-xs">
                                    Disponibilité de l'offre
                                  </p>
                                  <span className="text-[10px] text-gray-500">
                                    (N'hésite pas à désactiver l'offre si tu as
                                    trop d'élèves. Elle n'apparaîtra plus.)
                                  </span>
                                </div>
                              </Switch>
                            </div>
                          )}

                          {/* Étape 3: Durée et prix */}
                          {index === 2 && (
                            <div className="flex flex-col gap-4">
                              <div className="flex gap-4">
                                <Input
                                  isRequired
                                  variant="underlined"
                                  type="number"
                                  label="Durée de l'offre (mois)"
                                  min={1}
                                  value={formState.durability.toString()}
                                  onChange={(e) =>
                                    setFormState((prev) => ({
                                      ...prev,
                                      durability: Number(e.target.value),
                                    }))
                                  }
                                />
                                <Input
                                  isRequired
                                  variant="underlined"
                                  type="number"
                                  label="Prix de l'offre (€)"
                                  min={0}
                                  step={1}
                                  value={formState.price.toString()}
                                  onChange={(e) =>
                                    setFormState((prev) => ({
                                      ...prev,
                                      price: Number(e.target.value),
                                    }))
                                  }
                                />
                              </div>
                            </div>
                          )}

                          {/* Étape 4: Équipe */}
                          {index === 3 && canManageCrew && (
                            <div className="flex flex-col gap-4">
                              <Select
                                label="Équipe"
                                description="Rattacher cette offre à une équipe. Les élèves qui souscriront à cette offre seront automatiquement ajoutés à l'équipe."
                                selectedKeys={
                                  formState.crewId ? [formState.crewId] : []
                                }
                                onChange={(e) =>
                                  setFormState({
                                    ...formState,
                                    crewId: e.target.value,
                                  })
                                }
                              >
                                {allCrews.map((c) => (
                                  <SelectItem key={c.id} value={c.id}>
                                    {c.name}
                                  </SelectItem>
                                ))}
                              </Select>
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
      );
    }
  };

  const renderFooter = () => {
    if (isEditing) {
      // Footer pour l'édition
      return (
        <ModalFooter className="flex justify-end items-center gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button
            type="button"
            className="bg-primary hover:bg-blue-600"
            onClick={handleSave}
            disabled={loadingOffer || loadingUpdate}
          >
            {(loadingOffer || loadingUpdate) && (
              <Loader2 className="animate-spin" />
            )}
            Sauvegarder
          </Button>
        </ModalFooter>
      );
    } else {
      // Footer pour la création avec navigation
      return (
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
            onClick={isLastStep() ? handleSave : handleNext}
            disabled={!canContinue() || loadingOffer || loadingUpdate}
          >
            {(loadingOffer || loadingUpdate) && (
              <Loader2 className="animate-spin" />
            )}
            {isLastStep() ? "Créer" : "Continuer"}
          </Button>
        </ModalFooter>
      );
    }
  };

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={open}
      onOpenChange={resetForm}
      size="2xl"
      isDismissable={false}
      classNames={{
        closeButton: isEditing
          ? "text-black hover:bg-black/5 active:bg-black/10"
          : "text-white hover:bg-black/5 active:bg-black/10",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
      }}
    >
      <ModalContent>
        <ModalHeader
          className={`w-full flex justify-center ${
            isEditing ? "" : "mb-2 bg-dark rounded-t-lg"
          }`}
        >
          <p
            className={`text-xl font-semibold ${
              isEditing ? "text-black" : "text-white"
            }`}
          >
            {offer ? "Modifier l'offre" : "Création d'une nouvelle offre"}
          </p>
        </ModalHeader>
        <ModalBody
          className="flex flex-col gap-6"
          style={isEditing ? { gap: "20px" } : {}}
        >
          {renderContent()}
        </ModalBody>
        {renderFooter()}
      </ModalContent>
    </Modal>
  );
}
