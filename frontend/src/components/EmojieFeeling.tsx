import { Angry, Annoyed, Frown, Laugh, Smile } from "lucide-react";
import { ReactElement } from "react";

type Emojie = {
  icon: ReactElement;
  color: string;
  value: number;
  label: string;
};

type EmojieFeelingProps = {
  value: number;
  setValue: (value: number) => void;
  disabled?: boolean;
};

export default function EmojiFeeling({
  value,
  setValue,
  disabled = false,
}: EmojieFeelingProps) {
  const emojies: Emojie[] = [
    {
      icon: <Laugh className="size-12" />,
      color: "bg-green-100 text-green-500",
      value: 1,
      label: "Super",
    },
    {
      icon: <Smile className="size-12" />,
      color: "bg-blue-100  text-blue-500",
      value: 2,
      label: "Bien",
    },
    {
      icon: <Annoyed className="size-12" />,
      color: "bg-yellow-100 text-yellow-500",
      value: 3,
      label: "Moyen",
    },
    {
      icon: <Frown className="size-12" />,
      color: "bg-orange-100 text-orange-500",
      value: 4,
      label: "Mal",
    },
    {
      icon: <Angry className="size-12" />,
      color: "bg-red-100 text-red-500",
      value: 5,
      label: "Horrible",
    },
  ];
  return (
    <section className="flex justify-center items-center">
      {emojies.map((e: Emojie) => (
        <div
          key={e.value}
          className={`flex flex-col justify-center items-center gap-2 p-2 size-24 rounded-2xl ${
            !disabled ? "cursor-pointer" : "cursor-default"
          } ${value === e.value ? `${e.color} opacity-100` : "opacity-50"} ${
            !disabled && "hover:opacity-100"
          }`}
          onClick={() => {
            return !disabled && setValue(e.value);
          }}
        >
          {e.icon}
          <p className="text-xs">{e.label}</p>
        </div>
      ))}
    </section>
  );
}
