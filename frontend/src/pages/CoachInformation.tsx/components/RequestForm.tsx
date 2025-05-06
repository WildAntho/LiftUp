import ConfirmModal from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Offer, useAddRequestMutation } from "@/graphql/hooks";
import { useUserStore } from "@/services/zustand/userStore";
import { SelectField, TextInputField, TextareaField } from "evergreen-ui";
import { Send, ShieldAlert } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type RequestFormProps = {
  offers: Offer[];
  coachId?: string;
};

export default function RequestForm({ offers, coachId }: RequestFormProps) {
  const currentUser = useUserStore((state) => state.user);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    phone: "",
    offerId: "",
    description: "",
  });
  const [addRequest] = useAddRequestMutation();

  const handleAddRequest = async () => {
    await addRequest({
      variables: {
        data: {
          receiverId: coachId as string,
          senderId: currentUser?.id.toString() as string,
          description: formState.description,
          phone: Number(formState.phone),
          offerId: formState.offerId,
        },
      },
    });
    navigate("/coach");
  };

  return (
    <section className="w-full h-full flex flex-col items-start justify-start py-2">
      <p className="w-full flex justify-center font-semibold mb-4">
        Formulaire de demande
      </p>
      <Separator />
      <section className="w-full mt-5">
        <TextInputField
          label="Téléphone"
          type="number"
          placeholder="Numéro de téléphone"
          value={formState.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormState((prev) => ({ ...prev, phone: e.target.value }))
          }
        />
        <SelectField
          required
          label="Prestation"
          className="flex-1"
          value={formState.offerId}
          onChange={(e) => {
            setFormState((prev) => ({
              ...prev,
              offerId: e.target.value,
            }));
          }}
        >
          <option value="">Aucune prestation sélectionnée</option>
          {offers.map((offer) => (
            <option key={offer.id} value={offer.id}>
              {offer.name}
            </option>
          ))}
        </SelectField>
        <TextareaField
          placeholder="Envoyer quelques informations utiles au coach (années de pratique, rythme des entraînements, objectifs ...)"
          label="Description"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setFormState((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
        <Button
          className="bg-primary hover:bg-blue-600 w-full flex items-center gap-5"
          disabled={formState.offerId.length === 0}
          onClick={() => setOpenConfirm(true)}
        >
          <Send />
          Envoyer la demande
        </Button>
        <div className="flex justify-start items-center gap-2 text-primary mt-2">
          <ShieldAlert />
          <p className="text-xs">
            Seul le coach sera notifié et aura accès à ces informations.
          </p>
        </div>
        <div className="mt-4 ml-2">
          <p className="flex-1 text-xs text-gray-600">* Champs obligatoires</p>
        </div>
      </section>
      <ConfirmModal
        title="Souscription"
        type="success"
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        description="Êtes vous sûr de vouloir souscrire à cette offre ?"
        onConfirm={handleAddRequest}
      />
    </section>
  );
}
