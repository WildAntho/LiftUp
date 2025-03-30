import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-blue-600 w-full flex items-center gap-5">
              <Send />
              Envoyer la demande
            </Button>
          </DialogTrigger>
          <DialogContent aria-describedby="dialog-description">
            <DialogHeader>
              <DialogTitle>Demande de coaching</DialogTitle>
              <DialogDescription>
                Souhaitez-vous vraiment envoyer la demande de coaching ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button
                  type="button"
                  className="bg-primary hover:bg-blue-600 w-[20%]"
                  onClick={handleAddRequest}
                >
                  Oui
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="flex justify-start items-center gap-2 text-primary mt-2">
          <ShieldAlert />
          <p className="text-xs">
            Seul le coach sera notifié et aura accès à ces informations.
          </p>
        </div>
      </section>
    </section>
  );
}
