import { useUserStore } from "@/services/zustand/userStore";
import { Button } from "@heroui/react";
import { BicepsFlexed, Check, HeartHandshake } from "lucide-react";

type CardRoleProps = {
  role: string;
};

export default function CardRole({ role }: CardRoleProps) {
  const currentUser = useUserStore((state) => state.user);
  return (
    <div
      className={`flex flex-col items-start justify-between h-[300px] w-[50%] p-6 rounded-2xl bg-opacity-10 ${
        role === "COACH" ? "bg-green-600" : "bg-primary"
      }`}
    >
      <div className="flex flex-col items-start justify-start gap-1">
        {role === "COACH" ? (
          <HeartHandshake className="mb-5" size={48} />
        ) : (
          <BicepsFlexed className="mb-5" size={48} />
        )}
        <p className="font-bold">{`LiftUp ${
          role === "COACH" ? "Coach" : "Sportif"
        }`}</p>
        {role === "COACH" ? (
          <p className="text-xs">Pour coacher tous vos élèves</p>
        ) : (
          <p className="text-xs">
            Pour gérer tous vos entraînements personnels
          </p>
        )}
      </div>
      {role === currentUser?.roles && (
        <Button
          disabled={true}
          radius="full"
          className={`w-full flex justify-center items-center gap-3 bg-opacity-20 ${
            role === "COACH" ? "bg-green-500" : "bg-primary"
          }`}
        >
          <Check />
          <p>Actif</p>
        </Button>
      )}
    </div>
  );
}
