import { Input, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { format, parse, isValid } from "date-fns";
import { Calendar1Icon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { SelectSingleEventHandler } from "react-day-picker";
import { fr } from "date-fns/locale";

type DateInputProps = {
  date: string; // Format: "yyyy-MM-dd"
  setDate: (dateStr: string) => void;
  readOnly?: boolean;
};

export default function DateInput({ date, setDate, readOnly }: DateInputProps) {
  // Convert the string date to a Date object using date-fns
  const parsedDate = date ? parse(date, "yyyy-MM-dd", new Date()) : undefined;

  // Ensure the parsed date is valid
  const selectedDate =
    parsedDate && isValid(parsedDate) ? parsedDate : undefined;

  // Handle calendar date selection
  const handleSelect: SelectSingleEventHandler = (selected) => {
    if (selected && isValid(selected)) {
      const formatted = format(selected, "yyyy-MM-dd");
      setDate(formatted);
    }
  };

  if (readOnly) {
    const displayValue = selectedDate
      ? format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })
      : "";
    return (
      <Input
        isReadOnly
        label="Date"
        startContent={<Calendar1Icon />}
        value={displayValue}
      />
    );
  }

  return (
    <Popover>
      <PopoverTrigger>
        <div className="cursor-pointer">
          <Input
            isReadOnly
            label="Date"
            startContent={<Calendar1Icon />}
            value={
              selectedDate
                ? format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })
                : "Choisir une date"
            }
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          locale={fr}
          selected={selectedDate}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
