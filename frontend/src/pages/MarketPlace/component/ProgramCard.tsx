import { ChevronRight } from "lucide-react";
//import StarRating from "./ReactStars";
import { useNavigate } from "react-router-dom";
import UserAvatar from "@/components/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { Program, ProgramLevel } from "@/graphql/hooks";

type ProgramCardProps = {
  program: Program;
};

export default function ProgramCard({ program }: ProgramCardProps) {
  const navigate = useNavigate();
  const renderLevel = (level: ProgramLevel) => {
    switch (level) {
      case ProgramLevel.Advanced:
        return "Avancé";
      case ProgramLevel.Intermediate:
        return "Intermédiaire";
      case ProgramLevel.Beginner:
        return "Débutant";
    }
  };
  const getPricePerWeek = (price: number, duration: number) => {
    return Math.round((price / duration) * 10) / 10;
  };
  return (
    <section
      className="group w-full h-full flex justify-between items-center p-4 rounded-2xl bg-white border border-white transform transition-all duration-300 ease-in-out hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/marketplace/program/${program.id}`)}
    >
      <section className="flex justify-start items-center gap-5 cursor-pointer h-full">
        <UserAvatar
          radius="md"
          className="w-[140px] h-[140px]"
          avatar={program.coach?.avatar ?? ""}
        />
        <section className="relative h-full flex flex-col items-start justify-center">
          <div className="absolute top-3 min-w-[450px] w-full flex justify-start items-center gap-2">
            <Badge>{renderLevel(program.level)}</Badge>
            <Badge>{program.category?.label}</Badge>
            <Badge className="text-green-500">
              {program.duration} semaines
            </Badge>
          </div>
          <div className="flex justify-start items-center gap-5">
            <p>{program.title}</p>
          </div>
          <p className="opacity-50 text-xs">
            {program.coach?.firstname + " " + program.coach?.lastname}
          </p>
          {/* <StarRating rating={4.5} review={18} /> */}
        </section>
      </section>
      <section className="flex justify-center items-center gap-5">
        <div className="flex flex-col items-start justify-center">
          <div className="text-sm">
            <p className="text-primary text-lg font-semibold">
              {program.price}€{" "}
              <span className="text-sm text-gray-500">au total</span>
            </p>
            <span className="text-sm font-semibold opacity-50">
              {program.price &&
                getPricePerWeek(program.price, program.duration)}
              €/semaine
            </span>
          </div>
        </div>
        <ChevronRight
          size={18}
          className="text-gray-300 group-hover:text-gray-600"
        />
      </section>
    </section>
  );
}
