import { Separator } from "@/components/ui/separator";
import { Slider } from "@heroui/react";

type SliderPriceProps = {
  price: number[];
  setPrice: (value: number | number[]) => void;
};

export default function SliderPrice({ price, setPrice }: SliderPriceProps) {
  return (
    <div className="w-[350px] px-2 py-4 flex flex-col justify-center items-center gap-5">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <p className="text-sm font-semibold">Choisir une tranche de prix</p>
        <Separator />
      </div>
      <Slider
        className="max-w-md"
        classNames={{
          label: "text-xs",
          value: "text-xs",
        }}
        formatOptions={{ style: "currency", currency: "EUR" }}
        label="Prix"
        maxValue={200}
        minValue={10}
        step={10}
        showTooltip={true}
        value={price}
        onChange={setPrice}
      />
    </div>
  );
}
