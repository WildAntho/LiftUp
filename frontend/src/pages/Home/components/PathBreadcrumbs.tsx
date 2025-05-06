import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BadgeEuro,
  BicepsFlexed,
  Calendar,
  ChartNoAxesCombined,
  Dumbbell,
  Gauge,
  Home,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion"; // <--- ✅ import Framer

const translations: { [key: string]: string } = {
  calendar: "Calendrier",
  program: "Programmes",
  offers: "Offres",
  exercices: "Exercices",
  statistics: "Statistiques",
  configuration: "Configuration",
};

export default function PathBreadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();

  const getIcon = (value: string) => {
    switch (value.toLowerCase()) {
      case "accueil":
        return <Home size={14} />;
      case "dashboard":
        return <Gauge size={14} />;
      case "calendrier":
        return <Calendar size={14} />;
      case "programmes":
        return <BicepsFlexed size={14} />;
      case "offres":
        return <BadgeEuro size={14} />;
      case "exercices":
        return <Dumbbell size={14} />;
      case "statistiques":
        return <ChartNoAxesCombined size={14} />;
      case "configuration":
        return <Settings size={14} />;
      default:
        return null;
    }
  };

  const translateValue = (value: string): string => {
    const key = value.toLowerCase();
    return translations[key] || value;
  };

  const getBreadcrumbItems = () => {
    const searchParams = new URLSearchParams(location.search);
    const paramValues = Array.from(searchParams.values());

    const items = ["Accueil"];
    if (!paramValues.length) {
      items.push("Dashboard");
    } else {
      items.push(...paramValues.map((value) => translateValue(value)));
    }
    return items;
  };

  const handleClick = (item: string) => {
    if (item.toLowerCase() === "accueil") {
      navigate("/home");
    }
    if (item.toLowerCase() === "programmes") {
      navigate("/home?tab=program");
    }
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Breadcrumbs>
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem
            key={index}
            isLast={index === breadcrumbItems.length - 1}
            startContent={getIcon(item.toLowerCase())}
            onClick={() => handleClick(item)}
            className={
              item.toLowerCase() === "accueil"
                ? "cursor-pointer hover:text-gray-500"
                : ""
            }
          >
            {item}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </motion.div>
  );
}
