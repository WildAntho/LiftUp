import { Skeleton } from "@heroui/react";

export function ScheduleCalendarSkeleton() {
  return (
    <section className="w-full h-full flex flex-col gap-4 p-4 animate-pulse">
      <div className="flex justify-between items-center w-full">
        {/* Barre de navigation (mois / semaine etc.) */}
        <Skeleton className="w-32 h-6 rounded-lg" />
        <div className="flex gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>

      {/* Grille du calendrier */}
      <div className="grid grid-cols-7 gap-2 w-full mt-4">
        {Array.from({ length: 35 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2 items-center p-2 border border-gray-200 rounded-md"
          >
            <Skeleton className="w-10 h-4 rounded" />
            <Skeleton className="w-16 h-3 rounded" />
            <Skeleton className="w-14 h-3 rounded" />
          </div>
        ))}
      </div>
    </section>
  );
}
