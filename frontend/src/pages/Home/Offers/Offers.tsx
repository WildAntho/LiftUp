import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BadgeEuro, Clock, Dumbbell, Lock, PlusCircle } from "lucide-react";
import {
  Offer,
  useDeleteOfferMutation,
  useGetMyOffersQuery,
} from "@/graphql/hooks";
import OfferModal from "@/components/modals/OfferModal";
import Edit from "@/components/Edit";
import Delete from "@/components/Delete";
import { Separator } from "@/components/ui/separator";

export default function Offers() {
  const { data: dataOffers, refetch } = useGetMyOffersQuery();
  const [deleteOffer, { loading }] = useDeleteOfferMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [offerToEdit, setOfferToEdit] = useState<Omit<Offer, "user"> | null>(
    null
  );
  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteOffer({
      variables: { id },
    });
    refetch?.();
  };

  const myOffers = dataOffers?.getCoachOffers ?? [];

  return (
    <>
      <section className="w-full h-full flex flex-col items-center overflow-y-auto pt-10">
        <section className="w-full flex flex-col items-center justify-start gap-2 p-10">
          <div className="w-[90%] flex justify-between items-end">
            <p className="font-semibold text-xl flex justify-start items-center gap-2">
              <BadgeEuro size={30} /> Toutes les offres
            </p>
            <Button
              className="group shadow-none text-tertiary h-12 w-auto rounded-xl bg-tertiary bg-opacity-20 border border-tertiary border-opacity-20 hover:bg-tertiary hover:bg-opacity-20 hover:translate-y-[-2px] hover:shadow-sm transition-all duration-200"
              onClick={() => setOpen(true)}
            >
              <PlusCircle className="transition-all duration-200 group-hover:rotate-90" />
              <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
                Ajouter une nouvelle prestation
              </p>
            </Button>
          </div>
          <Separator className="w-[90%]" />
          <section className="w-[90%] grid grid-cols-3 2xl:grid-cols-4 gap-2 bg-gray-50 bg-opacity-50 border border-gray-100 shadow-md p-4 mt-5 rounded-xl">
            {myOffers?.map((o) => (
              <div key={o.id} className="h-[450px]">
                <article className="w-full h-full flex flex-col justify-between items-start bg-white rounded-lg shadow-xs border border-gray-200 p-6 space-y-6 hover:border-gray-300 hover:shadow-md hover:translate-y-[-2px] transition-all duration-200">
                  <div className="space-y-4 w-full flex-1">
                    <div className="w-full flex justify-between items-center">
                      <h1
                        className="text-sm font-semibold hover:underline underline-offset-1 decoration-1 line-clamp-1 cursor-pointer text-blue-500 bg-blue-500 bg-opacity-10 px-4 py-2 rounded-full"
                        onClick={() => {
                          setOfferToEdit(o as Omit<Offer, "user">);
                          openModal();
                        }}
                      >
                        {o.name}
                      </h1>
                      <div className="flex justify-center items-center">
                        <Edit
                          onClick={() => {
                            setOfferToEdit(o as Omit<Offer, "user">);
                            openModal();
                          }}
                        />
                        <Delete
                          onClick={handleDelete}
                          id={o.id as string}
                          loading={loading}
                          title="Êtes-vous sûr de vouloir supprimer cette offre ?"
                        />
                      </div>
                    </div>
                    <div className="h-[80%] w-full relative">
                      <p className="text-gray-500 text-sm absolute inset-0 overflow-hidden">
                        {o.description ?? "Aucune description"}
                        <span className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col justify-start items-start gap-5">
                    <Separator />
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {o.durability} mois
                      </div>
                      <div className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-2">
                        <Dumbbell className="w-4 h-4" />
                        {o.category.label}
                      </div>
                      {!o.availability && (
                        <div className="bg-red-500 bg-opacity-20 text-gray-700 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Complet
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </section>
        </section>
      </section>
      <OfferModal
        open={open}
        onClose={closeModal}
        refetch={refetch}
        offer={offerToEdit ? offerToEdit : undefined}
      />
    </>
  );
}
