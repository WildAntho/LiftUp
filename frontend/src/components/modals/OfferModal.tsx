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
import { SelectField, TextInputField, TextareaField } from "evergreen-ui";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type OfferModalProps = {
  open: boolean;
  onClose: () => void;
  refetch?: () => void;
  offer?: Omit<Offer, "user">;
};

export default function OfferModal({
  open,
  onClose,
  refetch,
  offer,
}: OfferModalProps) {
  const { data: dataCategories } = useGetAllCategoriesQuery();
  const { data: dataCrews } = useGetCoachCrewsQuery();
  const [addOffer, { loading: loadingOffer }] = useAddOfferMutation();
  const [updateOffer, { loading: loadingUpdate }] = useUpdateOfferMutation();
  const [availability, setAvailability] = useState<boolean>(
    offer?.availability ?? true
  );
  const [formState, setFormState] = useState({
    name: "",
    categoryId: "",
    description: "",
    durability: 0,
    price: "",
    crewId: "",
  });
  const [formError, setFormError] = useState({
    name: false,
    categoryId: false,
    description: false,
    durability: false,
    price: false,
  });

  const purgeInput = () => {
    setFormState({
      name: "",
      categoryId: "",
      description: "",
      durability: 0,
      price: "",
      crewId: "",
    });
    setFormError({
      name: false,
      categoryId: false,
      description: false,
      durability: false,
      price: false,
    });
  };

  useEffect(() => {
    if (offer) {
      setFormState({
        name: offer.name,
        categoryId: offer?.category.id,
        description: offer.description,
        durability: offer.durability,
        price: offer.price.toString(),
        crewId: offer.crew?.id ?? "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allCategories = dataCategories?.getAllCategories ?? [];
  const allCrews = dataCrews?.getCoachCrews ?? [];
  const handleSave = async () => {
    let hasError = false;
    const entries = Object.entries(formState);
    entries.forEach(([key, value]) => {
      if (value === "" || value === 0) {
        setFormError((prev) => ({
          ...prev,
          [key]: true,
        }));
        hasError = true;
      }
    });
    if (hasError) return;
    if (offer) {
      await updateOffer({
        variables: {
          data: { ...formState, availability, price: Number(formState.price) },
          id: offer.id as string,
        },
      });
    } else {
      await addOffer({
        variables: {
          data: { ...formState, availability, price: Number(formState.price) },
        },
      });
    }
    refetch?.();
    purgeInput();
    onClose();
  };
  return (
    <Modal
      scrollBehavior="outside"
      isOpen={open}
      onOpenChange={onClose}
      size="2xl"
      isDismissable={false}
      classNames={{
        closeButton: "text-black hover:bg-black/5 active:bg-black/10",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
      }}
    >
      <ModalContent>
        <ModalHeader className="w-full h-full flex justify-center">
          <p>Ajouter une prestation</p>
        </ModalHeader>
        <ModalBody style={{ gap: "4px" }} className="h-full">
          <div className="w-full flex justify-center items-center gap-2 flex-1">
            <div className="w-[60%] relative">
              <TextInputField
                required
                isInvalid={formError.name}
                label="Titre"
                type="text"
                placeholder="Désignation de la prestation"
                value={formState.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormState((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              {formError.name && (
                <p className="text-red-500 text-xs absolute top-[65px] left-1">
                  Veuillez renseigner ce champ
                </p>
              )}
            </div>
            <div className="w-[40%] relative">
              <SelectField
                label="Catégorie"
                className="flex-1"
                isInvalid={formError.categoryId}
                required
                value={formState.categoryId}
                onChange={(e) => {
                  setFormState((prev) => ({
                    ...prev,
                    categoryId: e.target.value,
                  }));
                }}
              >
                <option value="">Aucune catégorie</option>
                {allCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </SelectField>
              {formError.categoryId && (
                <p className="text-red-500 text-xs absolute top-[65px] left-1">
                  Veuillez renseigner ce champ
                </p>
              )}
            </div>
          </div>
          <div className="relative">
            <TextareaField
              placeholder="Décrivez votre prestation"
              label="Description"
              isInvalid={formError.description}
              required
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setFormState((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              value={formState.description}
            />
            {formError.description && (
              <p className="text-red-500 text-xs absolute bottom-2 left-1">
                Veuillez renseigner ce champ
              </p>
            )}
          </div>
          <div className="w-full flex justify-center items-center gap-2 flex-1">
            <div className="w-[50%] relative">
              <TextInputField
                required
                isInvalid={formError.durability}
                label="Durée de la prestation (mois)"
                type="number"
                placeholder="Renseignez la durée"
                value={formState.durability}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormState((prev) => ({
                    ...prev,
                    durability: Number(e.target.value),
                  }))
                }
              />
              {formError.durability && (
                <p className="text-red-500 text-xs absolute top-[65px] left-1">
                  Veuillez renseigner ce champ
                </p>
              )}
            </div>
            <div className="w-[50%] relative">
              <TextInputField
                required
                isInvalid={formError.price}
                label="Prix (par mois)"
                type="number"
                placeholder="Renseignez le prix"
                value={formState.price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormState((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
              {formError.price && (
                <p className="text-red-500 text-xs absolute top-[65px] left-1">
                  Veuillez renseigner ce champ
                </p>
              )}
            </div>
          </div>
          <div>
            <SelectField
              label="Equipe"
              className="flex-1"
              hint="Rattacher cette offre à une équipe. Les élèves qui souscriront à
              cette offre seront automatiquement ajoutés à l'équipe."
              value={formState.crewId}
              onChange={(e) => {
                setFormState((prev) => ({
                  ...prev,
                  crewId: e.target.value,
                }));
              }}
            >
              <option value="">Aucune équipe sélectionnée</option>
              {allCrews.map((crew) => (
                <option key={crew.id} value={crew.id}>
                  {crew.name}
                </option>
              ))}
            </SelectField>
          </div>
          <Switch
            isSelected={availability}
            onValueChange={setAvailability}
            size="sm"
          >
            <p className="text-xs">Disponibilité du plan</p>
            <span className="text-[10px] text-gray-500">
              (N'hésitez pas à désactiver la prestation si vous avez trop
              d'elèves)
            </span>
          </Switch>
        </ModalBody>
        <ModalFooter className="flex justify-end items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              onClose();
              if (!offer) purgeInput();
            }}
          >
            Annuler
          </Button>
          <Button
            type="button"
            className="bg-primary hover:bg-blue-600"
            onClick={handleSave}
            disabled={loadingOffer || loadingUpdate}
          >
            {loadingOffer ||
              (loadingUpdate && <Loader2 className="animate-spin" />)}
            Sauvegarder
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
