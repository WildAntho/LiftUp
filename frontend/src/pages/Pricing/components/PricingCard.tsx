import { motion } from "framer-motion";
import { Check, X, Lock, Clock } from "lucide-react";
import { Feature } from "../Pricing";
import { Button } from "@heroui/react";
import { MdDiscount } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { Periodicity } from "@/graphql/hooks";

type PricingCardProps = {
  title: string;
  subtitle: string;
  priceMonth: number;
  priceYear: number;
  currency: string;
  period: string;
  features: Feature[];
  buttonText: string;
  guaranteeText: string;
  securityText: string;
  disabledButton: boolean;
  showFooter: boolean;
  periodicity: Periodicity;
  id?: string;
  onSubscribe?: (id: string) => void;
  loading?: boolean;
  isSubscribed?: boolean;
};

export const PricingCard = ({
  title = "Starter",
  subtitle = "La solution parfaite pour démarrer",
  priceMonth,
  priceYear,
  currency = "€",
  period = "/mois",
  features = [],
  buttonText = "Choisir cet abonnement",
  guaranteeText = "30 jours satisfait ou remboursé",
  securityText = "Paiement sécurisé",
  disabledButton = false,
  showFooter = true,
  periodicity,
  id,
  onSubscribe,
  loading,
  isSubscribed,
}: PricingCardProps) => {
  const renderFeature = (feature: Feature) => {
    const getIcon = () => {
      switch (feature.status) {
        case "included":
          return <Check className="w-4 h-4 text-green-500" />;
        case "excluded":
          return <X className="w-4 h-4 text-red-400" />;
        case "limited":
          return <Clock className="w-4 h-4 text-orange-400" />;
        default:
          return <Check className="w-4 h-4 text-green-500" />;
      }
    };

    const getTextStyle = () => {
      switch (feature.status) {
        case "excluded":
          return "text-gray-400 line-through";
        case "limited":
          return "text-gray-600";
        default:
          return "text-gray-700";
      }
    };

    return (
      <motion.div
        key={feature.id}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start gap-3 py-1"
      >
        <div className="mt-0.5">{getIcon()}</div>
        <span className={`text-sm ${getTextStyle()}`}>{feature.text}</span>
      </motion.div>
    );
  };

  const groupedFeatures = features.reduce(
    (acc: Record<string, Feature[]>, feature: Feature) => {
      if (!acc[feature.category]) {
        acc[feature.category] = [];
      }
      acc[feature.category].push(feature);
      return acc;
    },
    {}
  );

  return (
    <div className="w-[400px] bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transform hover:scale-[1.02] hover:shadow-lg hover:border-gray-400 transition-all duration-300">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-6 text-center border-b">
        <motion.h3
          className="text-xl font-bold text-gray-900 mb-2"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-sm text-gray-600 mb-4"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="flex items-baseline justify-center gap-1"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-4xl font-bold text-gray-900">
            {periodicity === Periodicity.Monthly ? priceMonth : priceYear / 12}
          </span>
          <span className="text-lg text-gray-600">{currency}</span>
          <p className="text-sm text-gray-500 mt-1">{period}</p>
        </motion.div>

        {periodicity === Periodicity.Yearly && priceYear > 0 && (
          <motion.div
            className="flex flex-col items-center justify-center mt-4 gap-1"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="bg-green-400 bg-opacity-10 text-green-500 text-xs px-4 py-1 rounded-xl flex justify-center items-center gap-2">
              <MdDiscount />
              Economise 20%
            </span>
            <p className="text-xs text-gray-500">
              {priceYear}€/an au lieu de {priceMonth * 12}€/an
            </p>
          </motion.div>
        )}
      </div>

      {/* Features */}
      <div className="px-6 py-6 space-y-6">
        {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
          <motion.div
            key={category}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-sm font-semibold text-gray-600 mb-3">
              {category}
            </h4>
            <div className="space-y-2">
              {categoryFeatures.map(renderFeature)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <div className="w-full flex justify-center items-center px-4">
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full"
        >
          <Button
            data-testid="saving-button"
            className="group shadow-none text-white h-[70px] w-full rounded-xl bg-dark hover:bg-dark/90 border transition-all duration-200"
            isDisabled={disabledButton || isSubscribed}
            isLoading={loading}
            onPress={() => {
              if (onSubscribe && id) onSubscribe(id);
            }}
          >
            <motion.p
              className="text-sm flex justify-center items-center gap-2"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              {!isSubscribed ? buttonText : "Abonné"}
              {isSubscribed && <FaCheck className="text-green-500" />}
            </motion.p>
          </Button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="p-6 space-y-2">
        {showFooter && (
          <>
            <motion.div
              className="flex items-center gap-2 text-xs text-gray-500"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Lock className="w-3 h-3" />
              <span>{securityText}</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 text-xs text-gray-500"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Clock className="w-3 h-3" />
              <span>{guaranteeText}</span>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};
