import { useState } from "react";

type NumberInputProps = {
  setValue?: (value: number) => void;
  value?: number;
};

export default function NumberInput({ setValue, value }: NumberInputProps) {
  const [count, setCount] = useState<number>(value ?? 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setCount(val === "" ? 0 : parseInt(val, 10));
      setValue?.(val === "" ? 0 : parseInt(val, 10));
    }
  };

  return (
    <div className="bg-white border border-tertiary border-opacity-20 hover:border-opacity-70 shadow-sm rounded-xl px-4 py-3 flex items-center justify-center">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value ?? count}
        onChange={handleChange}
        className="w-full text-center text-lg font-medium text-gray-800 bg-transparent focus:outline-none"
      />
    </div>
  );
}
