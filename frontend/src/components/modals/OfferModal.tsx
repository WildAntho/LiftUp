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
import { Loader2 } from "lucide-react";
import { Input, Select, SelectItem, Textarea } from "@heroui/react";

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
    price: 0,
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const allCategories = dataCategories?.getAllCategories ?? [];
  const allCrews = dataCrews?.getCoachCrews ?? [];
  const handleSave = async () => {
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
      }
    });
    if (hasError) return;
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
        <ModalBody style={{ gap: "20px" }} className="h-full">
          <div className="w-full flex justify-center items-center gap-2 flex-1">
            <div className="w-[60%] relative">
              <Input
                isRequired
                isInvalid={formError.name}
                type="text"
                label="Désignation de la prestation"
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
              label="Décrivez votre prestation"
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
                label="Renseignez la durée (mois)"
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
                label="Renseignez le prix (€)"
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
          <div>
            <Select
              label="Equipe"
              description="Rattacher cette offre à une équipe. Les élèves qui souscriront à
              cette offre seront automatiquement ajoutés à l'équipe."
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
