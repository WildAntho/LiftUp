import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@heroui/react";
import { X } from "lucide-react";
import { useCrewStore } from "@/services/zustand/crewStore";

type BadgeCrewProps = {
  crew: {
    id: string;
    name: string;
  };
};

export default function BadgeCrew({ crew }: BadgeCrewProps) {
  const clearCrew = useCrewStore((state) => state.clear);
  const handleClearCrew = () => {
    clearCrew();
  };

  return (
    <section className="flex justify-center items-center gap-2">
      <Badge className="bg-black text-white">{crew.name}</Badge>
      <Tooltip
        content="Revenir à ma programmation"
        color="foreground"
        showArrow={true}
        className="text-xs"
      >
        <X
          className="size-5 text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={handleClearCrew}
        />
      </Tooltip>
    </section>
  );
}
