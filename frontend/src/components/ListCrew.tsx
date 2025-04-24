import { AvatarGroup, Radio } from "@heroui/react";
import { Crew } from "@/graphql/hooks";
import UserAvatar from "./UserAvatar";

type ListCrewProps = {
  crew: Crew;
};

export default function ListCrew({ crew }: ListCrewProps) {
  return (
    <Radio
      value={crew.id}
      key={crew.id}
      className="m-0 bg-content1 hover:bg-content2 gap-0 items-center justify-between flex-row-reverse max-w-full cursor-pointer rounded-lg p-2 border-2 border-transparent data-[selected=true]:border-primary data-[selected=true]:border-opacity-50 data-[selected=true]:bg-content2"
    >
      <div className="flex items-center gap-2">
        <AvatarGroup max={3}>
          {crew.students?.map((s, i) => (
            <UserAvatar key={i} radius="lg" avatar={s.avatar ?? ""} />
          ))}
        </AvatarGroup>
        <p className="text-sm">{crew.name}</p>
      </div>
    </Radio>
  );
}
