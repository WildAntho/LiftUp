import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CoachProfile } from "@/graphql/hooks";
import { NotebookText } from "lucide-react";

type AboutProfileProps = {
  profile: CoachProfile;
};

export default function AboutCoach({ profile }: AboutProfileProps) {
  return (
    <section className="flex flex-col items-start justify-start gap-5 mt-5">
      <div className="w-full">
        <p className="font-semibold text-lg mb-4 pl-4 flex items-center gap-3">
          <NotebookText />À propos de{" "}
          {profile?.user?.firstname + " " + profile?.user?.lastname}
        </p>
        <Separator />
      </div>
      <div className="flex justify-start items-center gap-2 pl-4">
        {profile?.specialisation?.map((s, i) => (
          <Badge key={i}>{s}</Badge>
        ))}
      </div>
      <p className="w-[80%] text-xs pl-4">{profile?.description}</p>
    </section>
  );
}
