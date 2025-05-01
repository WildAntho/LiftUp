import { Skeleton } from "@heroui/react";

type SkeletonUserProps = {
  skeletonLength: number;
  isCrew?: boolean;
};

export default function SkeletonUser({
  skeletonLength,
  isCrew,
}: SkeletonUserProps) {
  return (
    <section className="px-4 flex flex-col items-start justify-start gap-6">
      {Array.from({ length: skeletonLength }, (_, i) => i + 1).map(() => {
        return (
          <div className="max-w-[300px] w-full flex items-center gap-3">
            <div className={`relative ${isCrew && "pl-10"}`}>
              <Skeleton className="flex rounded-full w-10 h-10" />
              {isCrew && (
                <>
                  <Skeleton className="absolute left-0 top-0 rounded-full w-10 h-10 translate-x-2" />
                  <Skeleton className="absolute left-0 top-0 rounded-full w-10 h-10 translate-x-6" />
                </>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
            </div>
          </div>
        );
      })}
    </section>
  );
}
