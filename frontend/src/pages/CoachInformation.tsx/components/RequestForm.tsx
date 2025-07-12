import ConfirmModal from "@/components/modals/ConfirmModal";
import { Separator } from "@/components/ui/separator";
import { Offer, useAddRequestMutation } from "@/graphql/hooks";
import { useUserStore } from "@/services/zustand/userStore";
import { Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { Send, ShieldAlert } from "lucide-react";
import { useState } from "react";
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
  const [addRequest, { loading }] = useAddRequestMutation();

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
        Demande de coaching
      </p>
      <Separator />
      <section className="w-full flex flex-col items-start justify-center gap-4 my-4">
        <Input
          type="number"
          label="Numéro de téléphone"
          placeholder="06XXXXXXXX"
          value={formState.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormState((prev) => ({ ...prev, phone: e.target.value }))
          }
        />
        <Select
          label="Sélectionner une offre"
          isRequired
          selectedKeys={formState.offerId ? [formState.offerId] : []}
          onChange={(e) =>
            setFormState({
              ...formState,
              offerId: e.target.value,
            })
          }
        >
          {offers.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name}
            </SelectItem>
          ))}
        </Select>
        <Textarea
          description="Envoyer quelques informations utiles au coach (années de pratique, rythme des entraînements, objectifs ...)"
          label="Description"
          placeholder="Je pratique la musculation et le streetlifting depuis 3 ans, avec 3 à 4 séances par semaine en moyenne..."
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
        <div className="w-full flex flex-col items-center justify-center gap-1">
          <Button
            className="group cursor-pointer shadow-none text-white h-[55px] w-full rounded-xl bg-primary hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
            onPress={() => setOpenConfirm(true)}
            startContent={<Send size={16} />}
            isDisabled={formState.offerId.length === 0}
            isLoading={loading}
          >
            <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
              Envoyer la demande
            </p>
          </Button>
          <div className="w-full flex justify-between items-center">
            <p className="flex-1 text-xs text-gray-500">
              <span className="text-red-500">*</span> Champs obligatoires
            </p>
            <p className="flex-1 text-xs text-gray-500">
              Cette action est sans engagement
            </p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2 text-primary mt-2">
          <ShieldAlert />
          <p className="text-xs">
            Seul le coach sera notifié et aura accès à ces informations.
          </p>
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
