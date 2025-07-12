import UserAvatar from "@/components/UserAvatar";
import { Program } from "@/graphql/hooks";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type CoachLinkProps = {
  program: Program;
};

export default function CoachLink({ program }: CoachLinkProps) {
  const navigate = useNavigate();
  return (
    <section
      className="w-full flex justify-between items-center p-4 border border-[#6E5DE7] rounded-2xl cursor-pointer transition-colors duration-200 group hover:bg-[#6E5DE7]/10"
      onClick={() => navigate(`/coach/${program.coach.id}`)}
    >
      <div className="flex justify-start items-center gap-4">
        <UserAvatar
          avatar={program.coach.avatar ?? ""}
          className="w-[70px] h-[70px]"
        />
        <div className="flex flex-col items-start justify-center">
          <p className="text-md text-[#6E5DE7] font-semibold">
            {program.coach.firstname} {program.coach.lastname}
          </p>
          <p className="text-xs text-[#6E5DE7] text-opacity-60">
            {program.coach.coachProfile?.name}
          </p>
        </div>
      </div>
      <ChevronRight
        size={20}
        className="text-[#6E5DE7] transition-transform duration-200 ease-out group-hover:translate-x-1"
      />
    </section>
  );
}
