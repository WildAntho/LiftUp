import { ChevronRight } from "lucide-react";
import { UserWithoutPassword } from "@/services/zustand/userStore";
import { Badge } from "./ui/badge";
//import StarRating from "./ReactStars";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";

type CoachCardProps = {
  coach: UserWithoutPassword;
};

export default function CoachCard({ coach }: CoachCardProps) {
  const navigate = useNavigate();
  const cheapestOfferPrice = coach?.offers?.[0]?.price ?? "Non disponible";
  return (
    <section
      className="group w-full h-full flex justify-between items-center p-4 rounded-2xl border border-gray-100 transition-all duration-100 shadow-md hover:shadow-xl cursor-pointer"
      onClick={() => navigate(`/coach/${coach.id}`)}
    >
      <section className="flex justify-start items-center gap-5 cursor-pointer h-full">
        <UserAvatar
          radius="md"
          className="w-[140px] h-[140px]"
          avatar={coach?.avatar ?? ""}
        />
        <section className="h-full flex flex-col items-start justify-center">
          <div className="flex justify-start items-center gap-5">
            <p>{coach?.firstname + " " + coach?.lastname}</p>
            <div className="flex justify-start items-center gap-2">
              {coach?.coachProfile?.specialisation?.map((s, i) => (
                <Badge key={i}>{s}</Badge>
              ))}
            </div>
          </div>
          <p className="opacity-50 text-xs">{coach?.coachProfile?.name}</p>
          {/* <StarRating rating={4.5} review={18} /> */}
        </section>
      </section>
      <section className="flex justify-center items-center gap-5">
        {(coach?.offers ?? []).length > 0 ? (
          <div className="flex flex-col items-start justify-center">
            <p className="text-sm">
              à partir de{" "}
              <span className="text-primary text-lg font-semibold">
                {cheapestOfferPrice}€
              </span>
              /mois
            </p>
            <p className="text-xs opacity-50">
              {(coach?.offers ?? []).length} prestations de coaching
            </p>
          </div>
        ) : (
          <p className="text-xs">Aucune offre</p>
        )}

        <ChevronRight
          size={18}
          className="text-gray-300 group-hover:text-gray-600"
        />
      </section>
    </section>
  );
}
