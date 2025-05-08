import { UserWithoutPassword } from "@/services/zustand/userStore";
import imgDefault from "../../public/default.jpg";
import { Checkbox, Radio, User } from "@heroui/react";
import { uploadURL } from "@/services/utils";

type ListUserProps = {
  user: UserWithoutPassword;
  isMulti?: boolean;
};

export default function ListUser({ user, isMulti = false }: ListUserProps) {
  return (
    <>
      {!isMulti ? (
        <Radio
          value={user.id}
          key={user.id}
          className="m-0 bg-content1 hover:bg-content2 gap-0 items-center justify-between flex-row-reverse max-w-full cursor-pointer rounded-lg p-2 border-2 border-transparent data-[selected=true]:border-primary data-[selected=true]:border-opacity-50 data-[selected=true]:bg-content2"
        >
          <User
            avatarProps={{
              src: user.avatar ? `${uploadURL + user.avatar}` : imgDefault,
            }}
            name={user.firstname + " " + user.lastname}
          />
        </Radio>
      ) : (
        <Checkbox
          value={user.id}
          key={user.id}
          className="m-0 bg-content1 hover:bg-content2 gap-0 items-center justify-between flex-row-reverse max-w-full cursor-pointer rounded-lg p-2 border-2 border-transparent data-[selected=true]:border-primary data-[selected=true]:border-opacity-50 data-[selected=true]:bg-content2"
        >
          <User
            avatarProps={{
              src: user.avatar ? `${uploadURL + user.avatar}` : imgDefault,
            }}
            name={user.firstname + " " + user.lastname}
          />
        </Checkbox>
      )}
    </>
  );
}
