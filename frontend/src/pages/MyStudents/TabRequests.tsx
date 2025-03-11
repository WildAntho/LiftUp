import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@heroui/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCallback } from "react";
import {
  Request,
  useAcceptRequestMutation,
  useRejectRequestMutation,
} from "@/graphql/hooks";

import { Eye } from "lucide-react";
import imgDefault from "../../../public/default.jpg";
import { uploadURL } from "@/services/utils";
import { useUserStore } from "@/services/zustand/userStore";
import Reject from "./components/Reject";
import Accept from "./components/Accept";
import { Separator } from "@/components/ui/separator";

type TabRequestsProps = {
  requests: Request[];
  refetch?: {
    refetchSent: () => void;
    refetchRequest: () => void;
    refetchTotal: () => void;
  };
};

type UserType = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  offer: string;
  phone: number | null | undefined;
  description: string;
  requestId: string;
  senderId: string;
};

export default function TabRequests({ requests, refetch }: TabRequestsProps) {
  const currentUser = useUserStore((state) => state.user);
  const [acceptRequest, { loading: loadingAccept }] =
    useAcceptRequestMutation();
  const [rejectRequest, { loading: loadingReject }] =
    useRejectRequestMutation();

  const handleAcceptRequest = async (userId: string, requestId: string) => {
    const data = {
      receiverId: currentUser!.id.toString(),
      senderId: userId.toString(),
    };
    await acceptRequest({
      variables: { data, id: requestId?.toString() as string },
    });
    if (refetch) {
      refetch.refetchRequest();
      refetch.refetchSent();
      refetch.refetchTotal();
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    await rejectRequest({
      variables: {
        id: requestId?.toString() as string,
      },
    });
    if (refetch) {
      refetch.refetchRequest();
      refetch.refetchSent();
    }
  };

  const columns = [
    { name: "ELEVES", uid: "name" },
    { name: "TELEPHONE", uid: "phone" },
    { name: "OFFRE DEMANDÉE", uid: "offer" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const users: UserType[] = requests.map((req) => ({
    id: req.id,
    name: req.sender.firstname + " " + req.sender.lastname,
    email: req.sender.email,
    avatar: req.sender.avatar ? `${uploadURL + req.sender.avatar}` : imgDefault,
    offer: req.offer ? req.offer.name : "Aucune offre",
    phone: req.phone,
    description: req.description ? req.description : "",
    senderId: req.sender.id,
    requestId: req.id,
  }));

  const renderCell = useCallback(
    (user: UserType, columnKey: keyof UserType | "actions") => {
      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ src: user.avatar }}
              description={user.email}
              name={user.name}
            />
          );
        case "phone":
          return <p className="text-xs">{user.phone}</p>;
        case "offer":
          return <p className="text-xs">{user.offer}</p>;
        case "actions":
          return (
            <div className="flex items-center justify-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="hover:bg-black/5 p-2 rounded-full cursor-pointer">
                    <Eye className={`size-4 text-black active:text-gray-500`} />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Informations de la demande</DialogTitle>
                  </DialogHeader>
                  <Separator />
                  <div className="w-full justify-start items-center">
                    <User
                      avatarProps={{ src: user.avatar }}
                      description={user.email}
                      name={user.name}
                    />
                  </div>
                  <p className="text-xs">
                    Offre: <span className="font-semibold">{user.offer}</span>
                  </p>
                  <p className="text-xs">Détail: {user.description}</p>
                </DialogContent>
              </Dialog>
              <Accept
                title="Accepter la demande"
                description="Êtes-vous sûr de vouloir accepter cette demande ?"
                onAccept={() =>
                  handleAcceptRequest(user.senderId, user.requestId)
                }
                loading={loadingAccept}
              />
              <Reject
                title="Refuser la demande"
                description="Êtes-vous sûr de vouloir refuser cette demande ?"
                onDelete={() => handleRejectRequest(user.requestId)}
                loading={loadingReject}
              />
            </div>
          );
        default:
          return user[columnKey];
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <section className="w-full flex flex-col items-center justify-start gap-5">
      <Table
        isHeaderSticky
        bottomContent={null}
        topContent={null}
        aria-label="Table requêtes"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        {users.length ? (
          <TableBody items={users}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(item, columnKey as keyof UserType | "actions")}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody emptyContent={"Aucune demande pour le moment"}>
            {[]}
          </TableBody>
        )}
      </Table>
    </section>
  );
}
