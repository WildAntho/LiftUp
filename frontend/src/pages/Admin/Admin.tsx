import {
  Profile,
  useGetProfileAdminQuery,
  useGetUsersQuery,
  User,
} from "@/graphql/hooks";
import TabProfile from "./components/TabProfile";
import { Tab, Tabs } from "@heroui/tabs";
import { Key, useState } from "react";
import TabUsers from "./components/TabUsers";

export default function Admin() {
  const { data: dataProfile } = useGetProfileAdminQuery();
  const { data: dataUsers } = useGetUsersQuery();
  const profiles = dataProfile?.getProfileAdmin ?? [];
  const users = dataUsers?.getUsers ?? [];
  const [selected, setSelected] = useState<string>("profile");

  const handleSelectionChange = (key: Key) => {
    setSelected(key as string);
  };
  return (
    <section className="w-full h-full p-4">
      <section className="w-full h-full bg-white rounded-2xl flex justify-center items-start p-4 overflow-y-scroll">
        <div className="w-full h-full flex flex-col justify-start items-center gap-2">
          <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={handleSelectionChange}
            className="w-full flex justify-center"
            classNames={{
              tabList: "w-[70%]",
            }}
          >
            <Tab key="profile" title="Profile" className="w-full">
              <TabProfile profiles={profiles as Profile[]} />
            </Tab>
            <Tab key="users" title="Utilisateurs" className="w-full">
              <TabUsers users={users as User[]} />
            </Tab>
          </Tabs>
        </div>
      </section>
    </section>
  );
}
