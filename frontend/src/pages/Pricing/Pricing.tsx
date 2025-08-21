import { ReactElement, useState } from "react";
import PeriodicitySelector from "./components/PeriodicitySelector";
import { PricingCard } from "./components/PricingCard";
import { studentMaestro } from "./components/StudentMaestro";
import { studentStarter } from "./components/StudentStarter";
import {
  Periodicity,
  useGenerateSessionProfileMutation,
  useGetProfilePricingQuery,
  UserRole,
} from "@/graphql/hooks";
import SkeletonPricing from "./components/SkeletonPricing";
import { useUserStore } from "@/services/zustand/userStore";
import { coachStarter } from "./components/CoachStart";
import { coachMaestro } from "./components/CoachMaestro";
import FaqAccordion from "./components/FaqAccordion";
import { Euro, Users, Ban, Smartphone } from "lucide-react";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdAutorenew } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import { useRole } from "@/services/hooks/useRole";

export type Feature = {
  id: number;
  category: string;
  text: string;
  status: string;
};

export type FAQItems = {
  id: string;
  icon: ReactElement;
  title: string;
  content: string;
};

export default function Pricing() {
  const currentUser = useUserStore((state) => state.user);
  const isCoach = useRole(UserRole.Coach);
  const isStudent = useRole(UserRole.Student);
  const { data, loading } = useGetProfilePricingQuery();
  const [generateSession, { loading: loadingSession }] =
    useGenerateSessionProfileMutation();
  const allPrice = data?.getProfilePricing ?? [];
  const [periodicity, setPeriodicity] = useState<Periodicity>(
    Periodicity.Monthly
  );
  const isMaestro =
    !!currentUser?.profile &&
    (currentUser.profile.name === "User-Maestro" ||
      currentUser?.profile.name === "Coach-Maestro");

  const renderFeature = () => {
    if (currentUser?.roles.includes(UserRole.Student)) {
      return {
        starter: studentStarter,
        maestro: studentMaestro,
      };
    } else if (currentUser?.roles.includes(UserRole.Coach)) {
      return {
        starter: coachStarter,
        maestro: coachMaestro,
      };
    }
    return null;
  };

  const handleSubscribe = async (id: string) => {
    try {
      const { data } = await generateSession({
        variables: {
          id,
          periodicity,
        },
      });
      if (data?.generateSessionProfile) {
        window.location.href = data.generateSessionProfile;
      } else {
        console.error("Aucune URL Stripe renvoyée.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const items: FAQItems[] = [
    {
      id: "1",
      icon: (
        <Ban size={24} className="shrink-0 opacity-60" aria-hidden="true" />
      ),
      title: "Comment résilier mon abonnement ?",
      content:
        "Rends toi dans la section Profil > Facturation > Résilier mon abonnement. Tu ne seras plus facturé et ton abonnement s'arrêtera à la fin de la période en cours.",
    },
    {
      id: "2",
      icon: (
        <TbFileInvoice
          size={24}
          className="shrink-0 opacity-60"
          aria-hidden="true"
        />
      ),
      title: "Comment gérer ma facturation ?",
      content:
        "Rends toi dans la section Profil > Facturation. Tu y retrouveras toutes tes factures liées à ton abonnement et tu auras accès à ton portail Stripe pour toutes modifications.",
    },
    {
      id: "7",
      icon: (
        <MdAutorenew
          size={24}
          className="shrink-0 opacity-60"
          aria-hidden="true"
        />
      ),
      title: "L'abonnement est-il sans engagement ?",
      content:
        "Oui l'abonnement est sans engagement, tu peux le résilier à tout moment sans frais supplémentaire.",
    },
    ...(isCoach
      ? [
          {
            id: "3",
            icon: (
              <Euro
                size={24}
                className="shrink-0 opacity-60"
                aria-hidden="true"
              />
            ),
            title: "Est-ce que mes clients doivent payer l'abonnement ?",
            content:
              "Non lorsque tu ajoutes un élève celui bénéficie immédiatement des fonctionnalités nécessaires à son suivi.",
          },
          {
            id: "4",
            icon: (
              <Users
                size={24}
                className="shrink-0 opacity-60"
                aria-hidden="true"
              />
            ),
            title: "En quoi consiste la gestion d'équipes ?",
            content:
              "La gestion d'équipe te permet de créer des équipes constitués d'autant d'élèves de ton choix. Tu pourras alors créer des séances de groupes.",
          },
        ]
      : []),
    ...(isStudent
      ? [
          {
            id: "5",
            icon: (
              <IoChatbubblesOutline
                size={24}
                className="shrink-0 opacity-60"
                aria-hidden="true"
              />
            ),
            title: "Comment fonctionne la messagerie ?",
            content:
              "La messagerie te permet d'échanger avec ton coach dans le cadre d'un suivi ou lorsque tu achètes un programme.",
          },
          {
            id: "6",
            icon: (
              <Smartphone
                size={24}
                className="shrink-0 opacity-60"
                aria-hidden="true"
              />
            ),
            title:
              "L'application mobile possède-t-elle  les mêmes fonctionnalités ?",
            content:
              "L'application mobile est uniquement orienté pour de la consultation, elle n'est pas adaptée aux différents paramétrages possibles sur la version ordinateur.",
          },
        ]
      : []),
  ];

  if (loading)
    return (
      <section className="w-full h-full">
        <SkeletonPricing />
      </section>
    );
  return (
    <section className="h-full w-full overflow-y-scroll p-4 pt-8">
      <p className="w-full text-center mb-8 text-gray-500 font-bold text-xl">
        Choisis ta formule préférée
      </p>
      <div className="w-full flex justify-center items-center">
        <PeriodicitySelector
          periodicity={periodicity}
          setPeriodicity={setPeriodicity}
        />
      </div>
      <div className="p-8 bg-gray-100 w-full flex justify-center items-start gap-8">
        <PricingCard
          title="Starter"
          subtitle="La solution parfaite pour démarrer"
          priceMonth={0}
          priceYear={0}
          currency="€"
          period="/mois"
          features={renderFeature()?.starter ?? []}
          buttonText="Gratuit 🎁"
          disabledButton={true}
          guaranteeText="30 jours satisfait ou remboursé"
          securityText="Paiement sécurisé"
          showFooter={false}
          periodicity={periodicity}
        />
        {allPrice.map(
          (p) =>
            p.monthlyAmount &&
            p.yearlyAmount && (
              <PricingCard
                key={p.id}
                id={p.id}
                title="Maestro"
                subtitle="Pour aller plus loin"
                priceMonth={p.monthlyAmount}
                priceYear={p.yearlyAmount}
                currency="€"
                period="/mois"
                features={renderFeature()?.maestro ?? []}
                buttonText="Choisir cet abonnement"
                disabledButton={false}
                guaranteeText="30 jours satisfait ou remboursé"
                securityText="Paiement sécurisé"
                showFooter={true}
                periodicity={periodicity}
                onSubscribe={handleSubscribe}
                loading={loadingSession}
                isSubscribed={isMaestro}
              />
            )
        )}
      </div>
      <div className="w-full flex justify-center items-center">
        <FaqAccordion items={items} />
      </div>
    </section>
  );
}
