import { ExerciceCategory } from "@/graphql/hooks";
import { Select, SelectItem } from "@heroui/react";

type ExerciceCategorySelectProps = {
  category: string;
  setCategory: (value: string) => void;
  allCategories: ExerciceCategory[];
};

export default function ExerciceCategorySelect({
  category,
  setCategory,
  allCategories,
}: ExerciceCategorySelectProps) {
  return (
    <Select
      label="Catégorie"
      placeholder="Catégorie d'exercice"
      selectedKeys={category ? [category] : []}
      onChange={(e) => setCategory(e.target.value)}
    >
      {allCategories.map((c) => (
        <SelectItem key={c.id} value={c.id}>
          {c.label}
        </SelectItem>
      ))}
    </Select>
  );
}
