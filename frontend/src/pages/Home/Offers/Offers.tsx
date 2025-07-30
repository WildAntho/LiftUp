import { useState } from "react";
import { Clock, Dumbbell, Lock, Plus, PlusCircle, Search } from "lucide-react";
import {
  Offer,
  OfferStatus,
  useDeleteOfferMutation,
  useGetMyOffersQuery,
} from "@/graphql/hooks";
import OfferModal from "@/components/modals/OfferModal";
import Edit from "@/components/Edit";
import Delete from "@/components/Delete";
import { Separator } from "@/components/ui/separator";
import { Input } from "@heroui/react";
import { Button } from "@/components/ui/button";
import StatusCard from "./component/StatusCard";
import { FaCheckCircle } from "react-icons/fa";
import { TbCoinEuroFilled } from "react-icons/tb";
import { AiFillStop } from "react-icons/ai";
import AnimatedWrapper from "@/components/Wrapper/AnimatedWrapper";

export default function Offers() {
  const [deleteOffer, { loading }] = useDeleteOfferMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [activeCard, setActiveCard] = useState<OfferStatus | null>(null);
  const [offerToEdit, setOfferToEdit] = useState<Omit<Offer, "user"> | null>(
    null
  );

  const { data: dataOffers, refetch } = useGetMyOffersQuery({
    variables: {
      status: activeCard,
    },
  });

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
    refetch();
  };

  const myOffers = dataOffers?.getCoachOffers ?? [];

  return (
    <>
      <section className="w-full h-full flex flex-col items-center px-4 pt-10 bg-white rounded-2xl">
        <section className="w-full h-full flex flex-col items-center justify-start gap-4 pt-6 pb-4">
          <div className="w-[85%] flex justify-between items-center">
            <AnimatedWrapper
              animation="slideUp"
              className="flex justify-start items-start gap-2"
            >
              <div onClick={() => setActiveCard(null)}>
                <StatusCard
                  icon={<TbCoinEuroFilled size={22} />}
                  title="Tous"
                  description="Toutes les offres"
                  isActive={!activeCard}
                />
              </div>
              <div onClick={() => setActiveCard(OfferStatus.Available)}>
                <StatusCard
                  icon={<FaCheckCircle size={20} />}
                  title="Disponible"
                  description="Offres ouvertes"
                  type={OfferStatus.Available}
                  isActive={activeCard === OfferStatus.Available}
                />
              </div>
              <div onClick={() => setActiveCard(OfferStatus.Cancel)}>
                <StatusCard
                  icon={<AiFillStop size={20} />}
                  title="Complet"
                  description="Offres désactivées"
                  type={OfferStatus.Cancel}
                  isActive={activeCard === OfferStatus.Cancel}
                />
              </div>
            </AnimatedWrapper>
            <AnimatedWrapper
              animation="slideLeft"
              className="h-full flex items-end"
            >
              <Button
                className="group shadow-none text-tertiary h-12 w-auto rounded-xl bg-tertiary bg-opacity-20 border border-tertiary border-opacity-20 hover:bg-tertiary hover:bg-opacity-20 hover:translate-y-[-2px] hover:shadow-sm transition-all duration-200"
                onClick={() => {
                  setOfferToEdit(null);
                  setOpen(true);
                }}
              >
                <PlusCircle className="transition-all duration-200 group-hover:rotate-90" />
                <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
                  Ajouter une nouvelle offre
                </p>
              </Button>
            </AnimatedWrapper>
          </div>
          <section className="flex flex-col justify-start items-start gap-4 h-full w-[85%] bg-gray-50 bg-opacity-50 border border-gray-100 shadow-md p-4 rounded-xl overflow-y-auto">
            <Input
              label="Recherche"
              placeholder="Rechercher une offre"
              capture
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInput(e.target.value);
              }}
              startContent={<Search size={20} className="text-gray-500" />}
              type="search"
            />
            {myOffers.length > 0 ? (
              <section className="h-full grid grid-cols-3 2xl:grid-cols-4 gap-2">
                {myOffers.map((o) => (
                  <div key={o.id} className="h-[400px]">
                    <article className="w-full h-full flex flex-col justify-between items-start bg-white rounded-lg shadow-xs border border-gray-200 p-6 space-y-6 hover:border-gray-300 hover:shadow-md hover:translate-y-[-2px] transition-all duration-200">
                      <div className="space-y-4 w-full flex-1">
                        <div className="w-full flex justify-between items-center">
                          <h1
                            className="text-md font-semibold hover:underline underline-offset-2 decoration-1 line-clamp-1 cursor-pointer"
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
                          {!o.availability ? (
                            <div className="bg-red-500 bg-opacity-20 text-gray-700 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-2">
                              <Lock className="w-4 h-4" />
                              Complet
                            </div>
                          ) : (
                            <div className="bg-green-500 bg-opacity-20 text-gray-700 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-2">
                              <Lock className="w-4 h-4" />
                              Disponible
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </section>
            ) : (
              <div className="w-full h-[350px] flex flex-col justify-center items-center gap-2">
                <p className="text-gray-600 text-sm">
                  Aucune offre pour le moment
                </p>
                <p className="text-gray-500 text-xs">
                  Ajouter une nouvelle offre
                </p>
                <div
                  className="group rounded-full my-2 cursor-pointer text-tertiary border border-tertiary border-opacity-20 bg-tertiary bg-opacity-20 shadow-sm p-2 hover:translate-y-[-2px] hover:shadow-md transition-all duration-200"
                  onClick={() => setOpen(true)}
                >
                  <Plus className="transition-all duration-200 group-hover:rotate-90" />
                </div>
              </div>
            )}
          </section>
        </section>
      </section>

      <OfferModal
        open={open}
        onClose={closeModal}
        refetch={refetch}
        offer={offerToEdit ?? undefined}
      />
    </>
  );
}
