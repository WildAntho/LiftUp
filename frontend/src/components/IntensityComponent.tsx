import { Maybe } from "@/graphql/hooks";
import { Slider, SliderValue } from "@heroui/react";

export type IntensityComponentProps = {
  value: Maybe<number>;
  setValue?: (value: number) => void;
  disabled?: boolean;
  size?: "lg" | "sm" | "md" | undefined;
};

export default function IntensityComponent({
  size = "md",
  value,
  setValue,
  disabled = false,
}: IntensityComponentProps) {
  const marks = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));
  let dynamicColor:
    | "success"
    | "primary"
    | "warning"
    | "danger"
    | "foreground"
    | "secondary"
    | undefined = "success";

  if (value) {
    if (value < 5) {
      dynamicColor = "success";
    }
    if (value > 5 && value < 9) {
      dynamicColor = "warning";
    }
    if (value > 8) {
      dynamicColor = "danger";
    }
  }

  return (
    <section className="w-full flex flex-col justify-center items-center gap-2">
      <div className="flex justify-between items-center w-full">
        <p className="text-xs">Très facile</p>
        <p className="text-xs">Effort maximal</p>
      </div>
      <Slider
        aria-label="slider"
        className="w-full"
        marks={marks}
        color={dynamicColor}
        defaultValue={1}
        maxValue={10}
        minValue={1}
        showSteps={true}
        size={size}
        step={1}
        showTooltip={!disabled}
        radius="lg"
        value={value ? value : 1}
        onChange={(value: SliderValue) => {
          return !disabled && setValue && setValue(Number(value));
        }}
      />
    </section>
  );
}
