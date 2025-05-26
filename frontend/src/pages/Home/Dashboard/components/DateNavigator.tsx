import { useState } from "react";
import { format, addDays, subDays, parse, isValid } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { SelectSingleEventHandler } from "react-day-picker";

type DateNavigatorProps = {
  date: string; // Format: "yyyy-MM-dd"
  setDate: (dateStr: string) => void;
  className?: string;
};

export default function DateNavigator({
  date,
  setDate,
  className = "",
}: DateNavigatorProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Parse la date string en Date object
  const parsedDate = date ? parse(date, "yyyy-MM-dd", new Date()) : new Date();
  const currentDate =
    parsedDate && isValid(parsedDate) ? parsedDate : new Date();

  // Fonction pour aller au jour précédent
  const handlePreviousDay = () => {
    const previousDay = subDays(currentDate, 1);
    const formatted = format(previousDay, "yyyy-MM-dd");
    setDate(formatted);
  };

  // Fonction pour aller au jour suivant
  const handleNextDay = () => {
    const nextDay = addDays(currentDate, 1);
    const formatted = format(nextDay, "yyyy-MM-dd");
    setDate(formatted);
  };

  // Fonction pour gérer le clic sur la date
  const handleDateClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleSelect: SelectSingleEventHandler = (selected) => {
    if (selected && isValid(selected)) {
      const formatted = format(selected, "yyyy-MM-dd");
      setDate(formatted);
      setShowDatePicker(false);
    }
  };

  // Format d'affichage de la date
  const displayDate = format(currentDate, "d MMMM yyyy", { locale: fr });

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-center p-2">
        {/* Flèche gauche */}
        <button
          onClick={handlePreviousDay}
          className="p-2 rounded-lg transition-all duration-200 bg-gray-100 hover:bg-gray-200 hover:scale-105 flex items-center justify-center"
          aria-label="Jour précédent"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>

        {/* Date cliquable */}
        <button
          onClick={handleDateClick}
          className="flex items-center px-4 py-2 mx-2 rounded-lg hover:bg-gray-100 min-w-0 flex-1 justify-center"
          aria-label="Sélectionner une date"
        >
          <svg
            className="w-5 h-5 mr-2 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-gray-800 font-medium text-sm sm:text-base">
            {displayDate}
          </span>
          <svg
            className={`w-4 h-4 ml-2 text-gray-600 transition-transform duration-200 ${
              showDatePicker ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </button>

        {/* Flèche droite */}
        <button
          onClick={handleNextDay}
          className="p-2 rounded-lg bg-gray-100 transition-all duration-200 hover:bg-gray-200 hover:scale-105 flex items-center justify-center"
          aria-label="Jour suivant"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>

      {/* DateInput conditionnel */}
      {showDatePicker && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <div className="bg-white rounded-lg shadow-lg border p-4">
            <Calendar
              mode="single"
              locale={fr}
              selected={parsedDate}
              onSelect={handleSelect}
              initialFocus
            />
          </div>
        </div>
      )}

      {/* Overlay pour fermer le DateInput */}
      {showDatePicker && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDatePicker(false)}
        />
      )}
    </div>
  );
}
