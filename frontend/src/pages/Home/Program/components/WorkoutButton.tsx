type WorkoutButtonProps = {
  number: number;
  isCompleted?: boolean;
};

export default function WorkoutButton({
  number,
}: WorkoutButtonProps) {
  return (
    <div
      className={`relative min-w-36 w-auto h-auto p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md border border-gray-100 hover:shadow-lg hover:translate-y-[-2px] hover:border-orange-400 hover:bg-gray-50`}
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
