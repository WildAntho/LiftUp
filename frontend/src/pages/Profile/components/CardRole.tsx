import { UserRole } from "@/graphql/hooks";
import { useRole } from "@/services/hooks/useRole";
import { useUserStore } from "@/services/zustand/userStore";
import { Button } from "@heroui/react";
import { BicepsFlexed, Check, HeartHandshake } from "lucide-react";

type CardRoleProps = {
  role: UserRole;
};

export default function CardRole({ role }: CardRoleProps) {
  const currentUser = useUserStore((state) => state.user);
  const isCoach = useRole(UserRole.Coach);
  return (
    <div
      className={`flex flex-col items-start justify-between h-[300px] w-[50%] p-6 rounded-2xl bg-opacity-10 ${
        role === UserRole.Coach ? "bg-green-600" : "bg-primary"
      }`}
    >
      <div className="flex flex-col items-start justify-start gap-1">
        {role === UserRole.Coach ? (
          <HeartHandshake className="mb-5" size={48} />
        ) : (
          <BicepsFlexed className="mb-5" size={48} />
        )}
        <p className="font-bold">{`LiftUp ${
          role === UserRole.Coach ? "Coach" : "Sportif"
        }`}</p>
        {role === UserRole.Coach ? (
          <p className="text-xs">Pour coacher tous tes élèves</p>
        ) : (
          <p className="text-xs">
            Pour gérer tous tes entraînements personnels
          </p>
        )}
      </div>
      {currentUser?.roles.includes(role) && (
        <Button
          disabled={true}
          radius="full"
          className={`w-full flex justify-center items-center gap-3 bg-opacity-20 ${
            isCoach ? "bg-green-500" : "bg-primary"
          }`}
        >
          <Check />
          <p>Actif</p>
        </Button>
      )}
    </div>
  );
}
