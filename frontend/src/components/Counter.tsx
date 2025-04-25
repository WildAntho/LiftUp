import { Minus, Plus } from "lucide-react";

type CounterProps = {
  setValue: (value: number) => void;
  value: number;
  withNegative?: boolean;
};

export default function Counter({
  setValue,
  value,
  withNegative = true,
}: CounterProps) {
  return (
    <div className="bg-white border border-tertiary border-opacity-20 hover:border-opacity-70 shadow-sm rounded-xl px-4 py-3 flex items-center justify-center gap-4">
      <button
        onClick={() => {
          setValue(withNegative ? value - 1 : Math.max(0, value - 1));
        }}
        className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition"
      >
        <Minus className="w-4 h-4 text-gray-600" />
      </button>

      <span className="text-lg font-medium text-gray-800 w-8 text-center">
        {value}
      </span>

      <button
        onClick={() => {
          setValue(value + 1);
        }}
        className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition"
      >
        <Plus className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}
