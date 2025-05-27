import LexicalEditorComponent from "@/components/LexicalEditor/LexicalEditorComponent";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CoachProfile } from "@/graphql/hooks";
import { NotebookText } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";

type AboutProfileProps = {
  profile: CoachProfile;
};

export default function AboutCoach({ profile }: AboutProfileProps) {
  return (
    <section className="flex flex-col items-start justify-start gap-5 mt-5">
      <div className="w-full">
        <p className="font-semibold text-lg mb-4 flex items-center gap-3">
          <NotebookText />À propos de{" "}
          {profile?.user?.firstname + " " + profile?.user?.lastname}
        </p>
        <Separator />
      </div>
      <div className="flex justify-start items-center gap-2">
        <UserAvatar
          radius="md"
          className="w-[100px] h-[100px]"
          avatar={profile.user?.avatar ?? ""}
        />
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="pl-2 text-md font-semibold">{profile.name}</p>
          <div className="flex justify-start items-center gap-2">
            {profile?.specialisation?.map((s, i) => (
              <Badge key={i}>{s}</Badge>
            ))}
          </div>
        </div>
      </div>
      {profile.description ? (
        <div className="w-[85%]">
          <LexicalEditorComponent
            value={JSON.parse(profile.description)}
            readOnly={true}
          />
        </div>
      ) : (
        <p className="w-[80%] text-xs pl-4">
          Aucune description n'a été fournie
        </p>
      )}
    </section>
  );
}
