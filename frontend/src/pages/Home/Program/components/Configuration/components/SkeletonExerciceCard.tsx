import { Skeleton } from "@heroui/react";

type SkeletonExerciceCardProps = {
  skeletonLength: number;
};

export default function SkeletonExerciceCard({
  skeletonLength,
}: SkeletonExerciceCardProps) {
  return (
    <section className="flex flex-wrap justify-center w-full gap-4">
      {Array.from({ length: skeletonLength }, (_, i) => i + 1).map((index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-start justify-center gap-2"
          >
            <Skeleton className="w-[200px] h-[175px] rounded-2xl" />
            <Skeleton className="w-[175px] h-[15px] rounded-2xl" />
          </div>
        );
      })}
    </section>
  );
}
