import { Skeleton } from "@heroui/react";

export default function SkeletonPricing() {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-8 p-4 pt-8">
      {/* Titre */}
      <Skeleton className="w-[250px] h-[28px] rounded-full bg-gray-100" />

      {/* Toggle mensuel/annuel */}
      <div className="flex justify-center items-center gap-4">
        <Skeleton className="w-[200px] h-[80px] rounded-lg bg-gray-100" />
        <Skeleton className="w-[200px] h-[80px] rounded-lg bg-gray-100" />
      </div>

      {/* Cartes pricing */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-4 w-full max-w-4xl">
        <Skeleton className="w-[400px] h-[1000px] rounded-2xl bg-gray-50" />
        <Skeleton className="w-[400px] h-[1000px] rounded-2xl bg-gray-50" />
      </div>
    </div>
  );
}
