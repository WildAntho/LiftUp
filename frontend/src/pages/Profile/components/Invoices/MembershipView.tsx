import { Ban, Check, Snowflake } from "lucide-react";
import { IoRocket } from "react-icons/io5";
import { RiShieldCheckFill } from "react-icons/ri";
import InvoiceButton from "./InvoiceButton";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/services/hooks/useRole";
import {
  ProfileSubscription,
  ProfileSubscriptionStatus,
  UserRole,
} from "@/graphql/hooks";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useState } from "react";

type MembershipViewProps = {
  isMaestro: boolean;
  currentSubscription?: ProfileSubscription | null;
  onAction: () => void;
  loading: boolean;
};

export default function MembershipView({
  isMaestro,
  currentSubscription,
  onAction,
  loading,
}: MembershipViewProps) {
  const navigate = useNavigate();
  const isCoach = useRole(UserRole.Coach);
  const isStudent = useRole(UserRole.Student);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  // Tableau personnalisable des fonctionnalités
  const features = [
    ...(isCoach
      ? [
          {
            id: 1,
            title: "Élèves illimités",
            description:
              "Gère autant de clients que tu le souhaites, sans aucune restriction.",
            icon: "🔥",
          },
          {
            id: 2,
            title: "Création d'exercices personnalisés",
            description: "Crée des exercices personnalisés pour tes élèves !",
            icon: null,
          },
          {
            id: 3,
            title: "Ajout de vidéos d'exercices",
            description: "Illustre tes exercices avec des vidéos explicatives.",
            icon: null,
          },
          {
            id: 4,
            title: "Gestion d'équipes",
            description:
              "Crée des équipes avec plusieurs élèves pour gérer des entraînements groupés.",
            icon: null,
          },
        ]
      : []),
    ...(isStudent
      ? [
          {
            id: 5,
            title: "Création d'exercices personnalisés",
            description:
              "Crée des exercices personnalisés pour progresser au mieux !",
            icon: null,
          },
          {
            id: 6,
            title: "Création de feedbacks",
            description:
              "Note tes entraînements et ajoute des commentaires pour suivre au mieux ta pratique.",
            icon: null,
          },
          {
            id: 7,
            title: "Accès aux vidéos d'exercices",
            description:
              "Accède à toutes les vidéos d'exercices pour t'aider à avoir une bonne exécution.",
            icon: null,
          },
        ]
      : []),
  ];

  const renderTitleButton = () => {
    switch (currentSubscription?.status) {
      case ProfileSubscriptionStatus.Active:
        return "Résilier mon abonnement";
      case ProfileSubscriptionStatus.ScheduleCancel:
        return "Annuler la résiliation";
      default:
        return "";
    }
  };

  const renderActionTitle = () => {
    switch (currentSubscription?.status) {
      case ProfileSubscriptionStatus.Active:
        return "Résiliation";
      case ProfileSubscriptionStatus.ScheduleCancel:
        return "Activation";
      default:
        return "";
    }
  };

  const renderActionDescription = () => {
    switch (currentSubscription?.status) {
      case ProfileSubscriptionStatus.Active:
        return "Es-tu sûr de vouloir résilier ton abonnement ?";
      case ProfileSubscriptionStatus.ScheduleCancel:
        return "Es-tu sûr de vouloir réactiver ton abonnement ?";
      default:
        return "";
    }
  };

  const renderActionType = () => {
    switch (currentSubscription?.status) {
      case ProfileSubscriptionStatus.Active:
        return "delete";
      case ProfileSubscriptionStatus.ScheduleCancel:
        return "success";
      default:
        return "delete";
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-10 w-full p-4 bg-white my-5">
      <ConfirmModal
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title={renderActionTitle()}
        description={renderActionDescription()}
        onConfirm={onAction}
        loading={loading}
        type={renderActionType()}
      />
      {/* Header */}
      <div className="text-center w-full">
        <div className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg mb-6">
          <Snowflake className="w-5 h-5" />
          <span className="font-medium text-sm">
            {isMaestro ? "Version Maestro" : "Version Gratuite"}
          </span>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-lg font-bold text-gray-900 mb-2">
            {isMaestro
              ? "🎉 Merci pour ta confiance !"
              : "Prêt à passer au niveau supérieur ?"}
          </h1>
          <p className="text-gray-500 text-md leading-relaxed w-[75%]">
            {isMaestro
              ? "Tu profites déjà de toutes les fonctionnalités Premium pour faire briller ton coaching. Continue sur ta lancée ! 💪"
              : "La version gratuite t'a donné un avant-goût. Débloque maintenant l'ensemble de tes possibilités avec nos outils Premium pensés pour t'accompagner au mieux."}
          </p>
        </div>
      </div>

      {/* Features List */}
      <div className="flex flex-col items-start justify-center gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-center justify-start gap-4"
          >
            {/* Check icon */}
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            {/* Content */}
            <div className="flex-1 flex-col items-start justify-center">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                {feature.icon && (
                  <span className="text-lg">{feature.icon}</span>
                )}
              </div>
              <p className="text-gray-500 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      {isMaestro && currentSubscription && (
        <div className="w-full text-end">
          <InvoiceButton
            onClick={() => setOpenConfirm(true)}
            icon={
              <Ban className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
            }
            title={renderTitleButton()}
            color="red"
            loading={loading}
          />
        </div>
      )}
      {!isMaestro && (
        <div className="flex flex-col items-center justify-center gap-4 p-8 w-full">
          <InvoiceButton
            onClick={() => navigate("/pricing")}
            icon={
              <IoRocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
            }
            title="Découvrir le Plan Premium"
          />
          <p className="text-xs text-gray-500">
            Abonne toi sans risque. Annulation facile.
          </p>
          <p className="flex justify-center items-center gap-2 text-xs text-green-500">
            <RiShieldCheckFill className="w-5 h-5" />
            Satisfaction garantie 30 jours ou remboursé.
          </p>
        </div>
      )}
    </div>
  );
}
