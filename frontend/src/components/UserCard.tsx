import {
  UserWithoutPassword,
  useUserStore,
} from "@/services/zustand/userStore";
import { Send, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@heroui/react";
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
import {
  useAcceptRequestMutation,
  useAddRequestMutation,
  useDeleteStudentMutation,
  useRejectRequestMutation,
} from "@/graphql/hooks";
import UserAvatar from "./UserAvatar";

type StudentsCardProps = {
  user: UserWithoutPassword;
  requestId?: string;
  canDelete?: boolean;
  canAdd?: boolean;
  canAccept?: boolean;
  refetch?: {
    refetchStudents?: () => void;
    refetchSent: () => void;
    refetchRequest: () => void;
    refetchCoach?: () => void;
    refetchMyCoach?: () => void;
  };
  refetchUsers?: () => void;
  details?: {
    description: string | null | undefined;
    phone: number | null | undefined;
    offer: string | null | undefined;
  };
};

export default function UserCard({
  user,
  requestId,
  canDelete = false,
  canAdd = false,
  canAccept = false,
  refetch,
  refetchUsers,
  details,
}: StudentsCardProps) {
  const currentUser = useUserStore((state) => state.user);
  const [addRequest] = useAddRequestMutation();
  const [deleteStudent] = useDeleteStudentMutation();
  const [acceptRequest] = useAcceptRequestMutation();
  const [rejectRequest] = useRejectRequestMutation();
  const gotDetails = !!(
    details?.description ||
    details?.phone ||
    details?.offer
  );

  const handleAddRequest = async () => {
    await addRequest({
      variables: {
        data: {
          receiverId: user?.id,
          senderId: currentUser?.id.toString() as string,
        },
      },
    });
    if (refetchUsers && refetch) {
      refetchUsers();
      refetch.refetchSent();
    }
  };

  const handleDeleteStudent = async () => {
    await deleteStudent({
      variables: {
        data: {
          coach_id: currentUser?.id.toString() as string,
          student_id: user?.id,
        },
      },
    });
    if (refetchUsers) refetchUsers();
    if (refetch && refetch.refetchStudents) refetch.refetchStudents();
  };

  const data = {
    receiverId: currentUser!.id.toString(),
    senderId: user!.id.toString(),
  };

  const handleAcceptRequest = async () => {
    await acceptRequest({
      variables: { data, id: requestId?.toString() as string },
    });
    if (refetch) {
      refetch.refetchRequest();
      refetch.refetchSent();
      if (currentUser?.roles === "COACH" && refetch.refetchStudents)
        refetch.refetchStudents();
      if (
        currentUser?.roles === "STUDENT" &&
        refetch.refetchCoach &&
        refetch.refetchMyCoach
      ) {
        refetch.refetchMyCoach();
        refetch.refetchCoach();
      }
    }
  };

  const handleRejectRequest = async () => {
    await rejectRequest({
      variables: {
        id: requestId?.toString() as string,
      },
    });
    if (refetch) {
      refetch.refetchRequest();
      refetch.refetchSent();
      if (currentUser?.roles === "COACH" && refetch.refetchStudents)
        refetch.refetchStudents();
      if (currentUser?.roles === "STUDENT" && refetch.refetchCoach)
        refetch.refetchCoach();
    }
  };
  return (
    <section className="w-full h-full flex justify-between items-center p-4 rounded-2xl border border-gray-100 hover:border-gray-300">
      <section className="flex justify-start items-center gap-2 cursor-pointer">
        <UserAvatar avatar={user?.avatar ?? ""} />
        <section className="relative h-full">
          <p>{user?.firstname + " " + user?.lastname}</p>
          <p className="opacity-50 text-xs">{user?.email}</p>
          {gotDetails && (
            <Popover placement="bottom-start" showArrow={true}>
              <PopoverTrigger>
                <p className="absolute -bottom-5 text-primary text-xs hover:underline mt-2">
                  Voir détail
                </p>
              </PopoverTrigger>
              <PopoverContent className="max-w-[250px] p-4 flex flex-col items-start justify-center gap-2">
                <p className="text-xs">
                  <span className="font-semibold">Téléphone: </span>+33{" "}
                  {details.phone}
                </p>
                <p className="text-xs">
                  <span className="font-semibold">Prestation: </span>
                  {details.offer}
                </p>
                <div>
                  <p className="font-semibold text-xs">Détails: </p>
                  <p className="text-xs">{details.description}</p>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </section>
      </section>
      {canAccept && (
        <div className="flex flex-col justfiy-center items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="text-red-600">
                Refuser la demande
              </Button>
            </DialogTrigger>
            <DialogContent aria-describedby="dialog-description">
              <DialogHeader>
                <DialogTitle>Refuser la demande</DialogTitle>
                <DialogDescription>
                  Souhaitez-vous vraiment refuser cette demande ?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="bg-primary hover:bg-blue-600 w-[20%]"
                    onClick={handleRejectRequest}
                  >
                    Oui
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Accepter la demande</Button>
            </DialogTrigger>
            <DialogContent aria-describedby="dialog-description">
              <DialogHeader>
                <DialogTitle>Accepter la demande</DialogTitle>
                <DialogDescription>
                  Souhaitez-vous vraiment accepter cette demande ?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="bg-primary hover:bg-blue-600 w-[20%]"
                    onClick={handleAcceptRequest}
                  >
                    Oui
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
      {canDelete && (
        <Dialog>
          <DialogTrigger>
            <Tooltip
              className="text-xs"
              content="Supprimer l'élève"
              showArrow={true}
              color="foreground"
            >
              <Trash2 className="size-5 text-gray-500 cursor-pointer hover:text-black" />
            </Tooltip>
          </DialogTrigger>
          <DialogContent aria-describedby="dialog-description">
            <DialogHeader>
              <DialogTitle>Suppresion d'un élève</DialogTitle>
              <DialogDescription>
                Souhaitez-vous vraiment supprimer cet élève ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button
                  type="button"
                  className="bg-primary hover:bg-blue-600 w-[20%]"
                  onClick={handleDeleteStudent}
                >
                  Oui
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {canAdd && (
        <Dialog>
          <DialogTrigger>
            <Tooltip
              className="text-xs"
              content="Envoyer une demande"
              showArrow={true}
              color="foreground"
            >
              <Send className="size-5 text-gray-500 cursor-pointer hover:text-black" />
            </Tooltip>
          </DialogTrigger>
          <DialogContent aria-describedby="dialog-description">
            <DialogHeader>
              <DialogTitle>Envoyer une demande</DialogTitle>
              <DialogDescription>
                Souhaitez-vous vraiment envoyer une demande d'ajout ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button
                  type="button"
                  className="bg-primary hover:bg-blue-600 w-[20%]"
                  onClick={handleAddRequest}
                >
                  Oui
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
