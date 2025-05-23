import { Loader2, Play } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "./ui/button";

type ActivateProps = {
  onActive: () => void;
  loading?: boolean;
  description: string;
  title: string;
};

export default function Activate({
  onActive,
  loading,
  description,
  title,
}: ActivateProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Tooltip
          content="Démarrer le suivi"
          showArrow={true}
          color="foreground"
          className="text-xs"
        >
          <div className="hover:bg-green-500 hover:bg-opacity-10 p-2 rounded-full cursor-pointer">
            <Play className={`size-4 text-black`} />
          </div>
        </Tooltip>
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
              onClick={onActive}
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
