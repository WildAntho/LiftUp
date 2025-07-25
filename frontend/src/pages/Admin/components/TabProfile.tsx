import Delete from "@/components/Delete";
import Edit from "@/components/Edit";
import { Profile } from "@/graphql/hooks";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

type TabProfileProps = {
  profiles: Profile[];
};

export default function TabProfile({ profiles }: TabProfileProps) {
  const columns = [
    { name: "Profile", uid: "name" },
    { name: "Nombre de permissions", uid: "permissions" },
    { name: "Actions", uid: "actions" },
  ];
  return (
    <section className="w-full flex flex-col items-center justify-start gap-5">
      <Table aria-label="Table des profils">
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
        {profiles.length ? (
          <TableBody items={profiles}>
            {(profile) => (
              <TableRow key={profile.id}>
                <TableCell>
                  <p className="cursor-pointer hover:underline">
                    {profile.name}
                  </p>
                </TableCell>
                <TableCell>{profile.permissions?.length || 0}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Delete
                      onClick={() => console.log("delete")}
                      id={profile.id}
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
          <TableBody emptyContent="Aucun profil pour le moment">{[]}</TableBody>
        )}
      </Table>
    </section>
  );
}
