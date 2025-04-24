import { UserWithoutPassword } from "@/services/zustand/userStore";

type TrainingModelProps = {
  currentUser: UserWithoutPassword | null;
};

export default function TrainingModel({ currentUser }: TrainingModelProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-white rounded-2xl p-4 pb-8 gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">
          {currentUser?.firstname} {currentUser?.lastname}
        </h1>
        <p>Training Model</p>
      </div>
    </div>
  );
}
