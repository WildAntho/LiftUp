import { Skeleton } from "@heroui/react";

export default function SkeletonMarketplace() {
  return (
    <section className="flex flex-col items-center gap-6 w-full">
      {/* Skeleton des filtres */}
      <div className="w-full flex justify-end">
        <Skeleton className="w-full h-[50px] rounded-xl" />
      </div>

      {/* Skeleton des cartes programmes */}
      <section className="w-full flex flex-col gap-4">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="w-full flex justify-between items-center p-4 bg-white rounded-2xl border"
          >
            <div className="flex gap-5 items-center">
              <Skeleton className="w-[140px] h-[140px] rounded-xl" />
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-[60px] rounded-full" />
                  <Skeleton className="h-4 w-[100px] rounded-full" />
                  <Skeleton className="h-4 w-[80px] rounded-full" />
                </div>
                <Skeleton className="h-5 w-[200px] rounded-md" />
                <Skeleton className="h-4 w-[120px] rounded-md" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-5 w-[60px] rounded-md" />
              <Skeleton className="h-4 w-[80px] rounded-md" />
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
