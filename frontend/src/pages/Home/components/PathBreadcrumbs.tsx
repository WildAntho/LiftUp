import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BicepsFlexed,
  Calendar,
  ChartNoAxesCombined,
  Dumbbell,
  Gauge,
  Home,
  NotepadText,
} from "lucide-react";

const translations: { [key: string]: string } = {
  calendar: "Calendrier",
  program: "Programmes",
  training: "Entraînements",
  exercices: "Exercices",
  statistics: "Statistiques",
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
      case "entraînements":
        return <NotepadText size={14} />;
      case "exercices":
        return <Dumbbell size={14} />;
      case "statistiques":
        return <ChartNoAxesCombined size={14} />;
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
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
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
  );
}
