import { Skeleton } from "@heroui/react";

export default function SkeletonTraining() {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-8 p-4">
      <Skeleton className="w-full h-[120px] rounded-2xl bg-gray-50" />
      <div className="w-[90%] flex flex-col justify-start items-center gap-2">
        <Skeleton className="w-full h-[110px] rounded-2xl  bg-gray-50" />
        <Skeleton className="w-full h-[110px] rounded-2xl  bg-gray-50" />
        <Skeleton className="w-full h-[110px] rounded-2xl  bg-gray-50" />
      </div>
    </div>
  );
}
