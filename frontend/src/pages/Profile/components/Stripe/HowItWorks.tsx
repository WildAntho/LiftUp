import { Separator } from "@/components/ui/separator";
import { FaQuestionCircle } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Crée ton compte Stripe Connect pour recevoir ton argent",
      description:
        "Liftup collabore avec Stripe pour tout ce qui concerne les paiements.",
    },
    {
      id: 2,
      title:
        "Configure ta page entraîneur pour donner plus d'informations sur ton coaching",
      description:
        "Rends toi dans la section 'Profil > A propos' et ajoute des informations sur ton coaching.",
    },
    {
      id: 3,
      title: "Crée tes programmes d'entraînements (en public)",
      description:
        "Configure tes programmes et n'oublies pas de les passer en publics pour qu'ils soient accessibles.",
    },
    {
      id: 4,
      title: "Valide tes programmes",
      description:
        "Lorsque ton programme est terminé, veille a bien passer son statut à 'Validé'",
    },
    {
      id: 5,
      title: "Tout est prêt, tu es visible sur le marketplace",
      description: "Tu n'as plus qu'à attendre que ton programme fasse effet.",
    },
  ];

  return (
    <div className="flex flex-col items-start justify-start gap-7 w-full p-8 bg-white border shadow-md rounded-2xl">
      {/* Header */}
      <div className="text-start w-full">
        <div className="w-full flex justify-start items-center gap-4">
          <FaQuestionCircle size={30} />
          <div>
            <p className="text-xl font-bold">Comment ça marche ?</p>
            <p className="text-gray-500 text-sm">
              Quelles sont les étapes à valider pour pouvoir vendre sur Liftup ?
            </p>
          </div>
        </div>
      </div>
      <Separator />
      {/* Features List */}
      <div className="flex flex-col items-start justify-center gap-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center justify-start gap-4">
            {/* Check icon */}
            <p className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex justify-center items-center p-4">
              {index + 1}
            </p>
            {/* Content */}
            <div className="flex-1 flex-col items-start justify-center">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
              </div>
              <p className="text-gray-500 leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
