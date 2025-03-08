import { Tooltip } from "@heroui/tooltip";
import { Loader2, Trash2 } from "lucide-react";
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

type DeleteProps = {
  onDelete: () => void;
  loading?: boolean;
  description: string;
  title: string;
};

export default function Delete({
  onDelete,
  loading,
  description,
  title,
}: DeleteProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="hover:bg-black/5 p-2 rounded-full cursor-pointer">
          <Tooltip
            content="Supprimer"
            showArrow={true}
            color="foreground"
            className="text-xs"
          >
            <Trash2 className={`size-4 text-black active:text-gray-500`} />
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
              onClick={onDelete}
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
