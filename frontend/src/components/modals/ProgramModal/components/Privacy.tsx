import { Globe2, Lock } from "lucide-react";

type PrivacyProps = {
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  type: "public" | "private";
};

export default function Privacy({
  title,
  description,
  selected,
  onSelect,
  type,
}: PrivacyProps) {
  return (
    <section
      onClick={onSelect}
      className={`p-8 h-full w-full flex flex-col items-center gap-4 cursor-pointer transition-all duration-200 hover:shadow-md rounded-lg border ${
        selected
          ? "border-2 border-primary bg-primary/5"
          : "hover:border-gray-200"
      }`}
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        {type === "public" ? (
          <Globe2 className="w-6 h-6 text-primary" />
        ) : (
          <Lock className="w-6 h-6 text-primary" />
        )}
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
    </section>
  );
}
