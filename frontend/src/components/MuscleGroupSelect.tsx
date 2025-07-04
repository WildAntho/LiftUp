import { Select, SelectItem, Chip, Checkbox } from "@heroui/react";
import { MuscleGroup } from "@/graphql/hooks";

type MuscleGroupSelectProps = {
  allMuscles: MuscleGroup[];
  muscles: string[];
  setMuscles: (ids: string[]) => void;
};

export default function MuscleGroupSelect({
  allMuscles,
  muscles,
  setMuscles,
}: MuscleGroupSelectProps) {
  const handleDelete = (muscle: string) => {
    setMuscles(muscles.filter((key) => key !== muscle));
  };

  return (
    <Select
      aria-label="Groupes musculaires"
      placeholder="Groupes musculaires"
      label="Muscles"
      selectionMode="multiple"
      isMultiline={true}
      selectedKeys={new Set(muscles)}
      onSelectionChange={(keys) => {
        setMuscles(Array.from(keys as Set<string>));
      }}
      renderValue={(selectedItems) => (
        <div className="flex gap-2">
          {selectedItems.map((item) => (
            <Chip
              key={item.key}
              className="flex items-center"
              size="sm"
              radius="sm"
              classNames={{
                base: "bg-dark/80 text-white py-1",
              }}
              onClose={() => {
                handleDelete(item.key as string);
              }}
            >
              <p className="text-xs">{item.textValue}</p>
            </Chip>
          ))}
        </div>
      )}
    >
      {allMuscles.map((muscle) => {
        const isSelected = muscles.includes(muscle.id);
        return (
          <SelectItem
            key={muscle.id}
            textValue={muscle.label}
            className={`hover:bg-dark/10 ${isSelected ? "bg-dark/10" : ""}`}
            hideSelectedIcon
          >
            <div className="flex justify-between items-center h-8">
              {muscle.label}
              <Checkbox key={muscle.id} isSelected={isSelected} size="sm" />
            </div>
          </SelectItem>
        );
      })}
    </Select>
  );
}
