import { Loader2, RefreshCcw } from "lucide-react";
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
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { capitalize } from "@/services/utils";

type RenewProps = {
  description: string;
  title: string;
  loading: boolean;
  onRenew: () => void;
  endDate: string;
};

export default function Renew({
  description,
  title,
  loading,
  onRenew,
  endDate,
}: RenewProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full cursor-pointer">
          <Tooltip
            content="Renouveler le suivi"
            showArrow={true}
            color="foreground"
            className="text-xs"
          >
            <RefreshCcw className={`size-4 text-black`} />
          </Tooltip>
        </div>
      </DialogTrigger>
      <DialogContent aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <p className="text-sm my-2">
          La nouvelle date de fin sera la suivante:{" "}
          <span className="text-black font-semibold">
            {capitalize(
              format(new Date(endDate), "EEEE d MMMM yyyy", { locale: fr })
            )}
          </span>
        </p>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-primary hover:bg-blue-600 w-[20%]"
              onClick={onRenew}
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
