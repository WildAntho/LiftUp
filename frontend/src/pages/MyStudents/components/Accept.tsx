import { Tooltip } from "@heroui/tooltip";
import { Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type AcceptProps = {
  onAccept: () => void;
  loading?: boolean;
  description: string;
  title: string;
};

export default function Accept({
  onAccept,
  loading,
  description,
  title,
}: AcceptProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="hover:bg-black/5 p-2 rounded-full cursor-pointer">
          <Tooltip
            content="Accepter"
            showArrow={true}
            color="foreground"
            className="text-xs"
          >
            <Check className={`size-4 text-green-500 active:text-green-700`} />
          </Tooltip>
        </div>
      </DialogTrigger>
      <DialogContent aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-primary hover:bg-blue-600 w-[20%]"
              onClick={onAccept}
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin" />}
              Oui
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
