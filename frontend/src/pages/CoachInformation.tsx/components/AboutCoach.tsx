import LexicalEditorComponent from "@/components/LexicalEditor/LexicalEditorComponent";
import { Separator } from "@/components/ui/separator";
import { CoachProfile } from "@/graphql/hooks";
import { MdStickyNote2 } from "react-icons/md";

type AboutProfileProps = {
  profile: CoachProfile;
};

export default function AboutCoach({ profile }: AboutProfileProps) {
  return (
    <section className="flex flex-col items-start justify-start gap-5 mt-5">
      <div className="w-full">
        <p className="font-semibold text-lg mb-4 flex items-center gap-3">
          <MdStickyNote2 size={24} />À propos de{" "}
          {profile?.user?.firstname + " " + profile?.user?.lastname}
        </p>
        <Separator />
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
