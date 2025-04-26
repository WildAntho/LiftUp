type WorkoutButtonProps = {
  number: number;
  isCompleted?: boolean;
  isActive: boolean;
  onClick: () => void;
};

export default function WorkoutButton({
  number,
  isActive,
  onClick,
}: WorkoutButtonProps) {
  const activeClasses = isActive
    ? "shadow-[0_0_10px_rgba(249,115,22,0.25)] translate-y-[-2px] border-orange-400 bg-gray-50 active:shadow-[0_0_10px_rgba(249,115,22,0.25)]"
    : "shadow-md border-gray-100";

  return (
    <div
      onClick={onClick}
      className={`relative min-w-36 w-auto h-auto p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 cursor-pointer border ${activeClasses} hover:translate-y-[-2px] hover:border-orange-400 hover:bg-gray-50 active:scale-95`}
    >
      <p className="text-gray-500 text-sm font-medium uppercase text-center">
        Jour
      </p>
      <p className="text-xl font-semibold text-center">{number}</p>
      <div className="bg-orange-100 px-2 py-1 rounded-full">
        <p className="text-orange-900 text-xs">Prévu</p>
      </div>
    </div>
  );
}
