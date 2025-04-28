import {
  useCreateCrewMutation,
  useGetListUsersCrewQuery,
  useUpdateCrewMutation,
} from "@/graphql/hooks";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Loader2, Search } from "lucide-react";
import { UserWithoutPassword } from "@/services/zustand/userStore";
import { Button } from "../ui/button";
import { Input } from "@heroui/react";
import { IoIosCloseCircle } from "react-icons/io";
import UserAvatar from "../UserAvatar";

type OfferModalProps = {
  open: boolean;
  onClose: () => void;
  refetch?: () => void;
  crew?: { id: string; students: UserWithoutPassword[]; name: string };
};

//export type UserCrew = Omit<UserWithoutPassword, "roles">;

export default function OfferModal({
  open,
  onClose,
  refetch,
  crew,
}: OfferModalProps) {
  const [name, setName] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>(
    crew ? crew.students.map((student) => student.id) : []
  );
  const [addedStudents, setAddedStudents] = useState<
    Partial<UserWithoutPassword[]>
  >([]);
  const {
    data,
    loading,
    refetch: refetchListStudents,
  } = useGetListUsersCrewQuery({
    variables: {
      input,
    },
    fetchPolicy: "cache-and-network",
  });
  const [allStudents, setAllStudents] = useState<UserWithoutPassword[]>([]);
  const [createCrew, { loading: loadingCreate }] = useCreateCrewMutation();
  const [updateCrew, { loading: loadingUpdate }] = useUpdateCrewMutation();
  const purgeInput = () => {
    onClose();
    setName("");
    setSelected([]);
    setAddedStudents([]);
    setError(false);
  };

  // Set allStudents en fonction de si on est en edit ou create
  useEffect(() => {
    const getStudents = crew
      ? [...crew.students, ...(data?.getListUsersCrew ?? [])]
      : data?.getListUsersCrew ?? [];
    setAllStudents(getStudents);
    if (crew) {
      setName(crew.name);
      setAddedStudents(crew.students);
      setSelected(crew.students.map((student) => student.id));
    }
  }, [data, crew]);

  // Gére la logique d'ajout d'étudiants
  useEffect(() => {
    const newAddedStudents = allStudents.filter((student) =>
      selected.includes(student.id)
    );
    setAddedStudents(newAddedStudents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleDeleteStudent = (id: string) => {
    const newAddedStudents = addedStudents.filter(
      (student) => student?.id !== id
    );
    const newSelected = selected.filter((selectedId) => selectedId !== id);
    setAddedStudents(newAddedStudents);
    setSelected(newSelected);
  };

  const handleSave = async () => {
    if (name.length === 0) {
      setError(true);
      return;
    }
    if (crew) {
      await updateCrew({
        variables: {
          crewId: crew.id,
          name: name,
          studentIds: selected,
        },
      });
    } else {
      await createCrew({
        variables: {
          ids: selected,
          name: name,
        },
      });
    }
    if (refetch) refetch();
    refetchListStudents();
    onClose();
    purgeInput();
  };

  return (
    <Modal
      scrollBehavior="inside"
      isOpen={open}
      onOpenChange={onClose}
      size="2xl"
      isDismissable={false}
      classNames={{
        closeButton: "text-black hover:bg-black/5 active:bg-black/10",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
      }}
    >
      <ModalContent>
        <ModalHeader className="w-full h-full flex justify-center">
          <p>Créer une nouvelle équipe</p>
        </ModalHeader>
        <ModalBody style={{ gap: "15px" }} className="h-full">
          <Input
            variant="bordered"
            label="Renseigner le nom de l'équipe"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          {error && (
            <p className="text-red-500 text-xs ml-4">
              Veuillez renseigner ce champ
            </p>
          )}
          <Input
            labelPlacement="outside"
            placeholder="Rechercher un élève"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            startContent={
              <Search className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
          />
          {addedStudents.length > 0 && (
            <section className="w-full min-h-[150px] flex justify-start items-center gap-7 px-4 overflow-x-scroll">
              {addedStudents.map((student) =>
                student ? (
                  <div
                    key={student.id}
                    className="relative flex flex-col items-center justify-center gap-2"
                  >
                    <UserAvatar
                      className="w-[70px] h-[70px]"
                      radius="lg"
                      avatar={student.avatar ?? ""}
                    />
                    <p className="text-xs opacity-50">{student.firstname}</p>
                    <IoIosCloseCircle
                      className="absolute size-6 -top-2 -right-2 bg-white rounded-full cursor-pointer"
                      onClick={() => handleDeleteStudent(student.id)}
                    />
                  </div>
                ) : null
              )}
            </section>
          )}
          {loading ? (
            <div className="w-full min-h-[250px] flex justify-center items-center py-5">
              <Loader2 className="animate-spin text-primary size-6" />
            </div>
          ) : allStudents.length > 0 ? (
            <section className="min-h-[250px]">
              <div className="w-full mb-5">
                <Label htmlFor="title" className="pl-2 text-sm">
                  Mes élèves
                </Label>
                <Separator />
              </div>
              <CheckboxGroup
                color="default"
                value={selected}
                className="w-full flex flex-col items-start justify-center gap-10"
                onValueChange={setSelected}
              >
                {allStudents.map((student) => (
                  <Checkbox
                    key={student.id}
                    value={student.id}
                    radius="full"
                    color="primary"
                    className="pl-4 mb-5 flex"
                  >
                    <section className="flex justify-between items-center">
                      <section className="flex justify-start items-center gap-4 ml-5">
                        <UserAvatar
                          radius="lg"
                          avatar={student?.avatar ?? ""}
                        />
                        <div className="flex flex-col items-start justify-center">
                          <p>{student.firstname + " " + student.lastname}</p>
                          <p className="opacity-50 text-xs">{student.email}</p>
                        </div>
                      </section>
                    </section>
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </section>
          ) : (
            <p className="w-full h-full text-center text-sm text-gray-600">
              Vous n'avez aucun élève.
            </p>
          )}
        </ModalBody>
        <ModalFooter className="flex justify-end items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              purgeInput();
            }}
          >
            Annuler
          </Button>
          <Button
            type="button"
            className="bg-primary hover:bg-blue-600"
            onClick={handleSave}
            disabled={loadingCreate || loadingUpdate}
          >
            {(loadingCreate || loadingUpdate) && (
              <Loader2 className="animate-spin" />
            )}
            Sauvegarder
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
