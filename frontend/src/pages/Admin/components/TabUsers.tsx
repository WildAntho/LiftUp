import { User } from "@/graphql/hooks";
import { uploadURL } from "@/services/utils";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User as UserComponent,
} from "@heroui/react";
import imgDefault from "../../../../public/default.jpg";
import Delete from "@/components/Delete";
import Edit from "@/components/Edit";

type TabUserProps = {
  users: User[];
};

export default function TabUsers({ users }: TabUserProps) {
  const columns = [
    { name: "Utilisateurs", uid: "users" },
    { name: "Rôle", uid: "roles" },
    { name: "Profile", uid: "profile" },
    { name: "Coach", uid: "coach" },
    { name: "Sex", uid: "sex" },
    { name: "Actions", uid: "actions" },
  ];

  const renderSexe = (sex: string) => {
    switch (sex) {
      case "male":
        return "Homme";
      case "female":
        return "Femme";
    }
  };
  return (
    <section className="w-full flex flex-col items-center justify-start gap-5">
      <Table aria-label="Table des profils" isHeaderSticky>
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
            {(user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <UserComponent
                    avatarProps={{
                      src: user.avatar
                        ? `${uploadURL + user.avatar}`
                        : imgDefault,
                    }}
                    description={user.email}
                    name={user.firstname + " " + user.lastname}
                  >
                    {user.email}
                  </UserComponent>
                </TableCell>
                <TableCell>
                  {user.roles.map((u, i) => (
                    <p key={i} className="text-xs">{u}</p>
                  ))}
                </TableCell>
                <TableCell>
                  <p className="text-xs">{user?.profile?.name ?? "Starter"}</p>
                </TableCell>
                <TableCell>
                  {user.coach ? (
                    <UserComponent
                      avatarProps={{
                        src: user.coach.avatar
                          ? `${uploadURL + user.coach.avatar}`
                          : imgDefault,
                      }}
                      description={user.coach.email}
                      name={user.coach.firstname + " " + user.coach.lastname}
                    >
                      {user.coach.email}
                    </UserComponent>
                  ) : (
                    <p>Aucun </p>
                  )}
                </TableCell>
                <TableCell>
                  <p className="text-xs">
                    {user.sex ? renderSexe(user.sex) : "Non renseigné"}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Delete
                      onClick={() => console.log("delete")}
                      id={user.id}
                      title="Tqt"
                      loading={false}
                    />
                    <Edit onClick={() => console.log("edit")} />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody emptyContent="Aucun utilisateur pour le moment">
            {[]}
          </TableBody>
        )}
      </Table>
    </section>
  );
}
