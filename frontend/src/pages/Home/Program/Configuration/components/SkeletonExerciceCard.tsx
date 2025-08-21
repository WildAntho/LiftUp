import { Skeleton } from "@heroui/react";

type SkeletonExerciceCardProps = {
  skeletonLength: number;
};

export default function SkeletonExerciceCard({
  skeletonLength,
}: SkeletonExerciceCardProps) {
  return (
    <section className="grid grid-cols-4 2xl:grid-cols-5 w-full gap-1">
      {Array.from({ length: skeletonLength }, (_, i) => i + 1).map((index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-start justify-center gap-2"
          >
            <Skeleton className="w-full h-[225px] rounded-2xl" />
            <Skeleton className="w-[85%] h-[15px] rounded-2xl" />
          </div>
        );
      })}
    </section>
  );
}
