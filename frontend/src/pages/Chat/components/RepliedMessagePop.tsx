import { UserWithoutPassword } from "@/services/zustand/userStore";
import { Tooltip } from "@heroui/tooltip";
import { X } from "lucide-react";
import { IoArrowRedo } from "react-icons/io5";

type RepliedMessagePopProps = {
  onClear: () => void;
  content: string;
  user: UserWithoutPassword | null;
};

export default function RepliedMessagePop({
  onClear,
  content,
  user,
}: RepliedMessagePopProps) {
  return (
    <section className="w-full flex items-center justify-between rounded-t-2xl bg-gray-100">
      <div className="flex flex-col items-start justify-center gap-1 p-2 w-full">
        <p className="text-xs text-gray-500 flex items-center justify-start gap-2">
          <IoArrowRedo className="size-4 opacity-40" />
          Réponse à<span className="font-semibold">{user?.firstname}</span>
        </p>
        <p className="text-xs pl-6 max-w-[65%]">{content}</p>
      </div>
      <Tooltip
        content="Annuler"
        showArrow={true}
        color="foreground"
        className="text-xs"
        closeDelay={0}
      >
        <div
          className="hover:bg-black/5 p-2 rounded-full cursor-pointer"
          onClick={onClear}
        >
          <X size={20} />
        </div>
      </Tooltip>
    </section>
  );
}
