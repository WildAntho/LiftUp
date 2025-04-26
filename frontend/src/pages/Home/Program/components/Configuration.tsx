import WeekProgram from "./WeekProgram";
import FloatingDock from "./FloatingDock";
import CreateWorkout from "./CreateWorkout";

export default function Configuration() {
  return (
    <section className="w-full h-full flex flex-col justify-between items-center pt-10 overflow-y-scroll">
      <section className="w-full h-full flex flex-col justify-start items-center gap-8">
        <WeekProgram numberOfDays={28} />
        <div className="w-[80%] flex justify-center items-center mt-10">
          <CreateWorkout />
        </div>
      </section>
      <FloatingDock />
    </section>
  );
}
