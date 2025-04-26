import WeekProgram from "./WeekProgram";
import FloatingDock from "./FloatingDock";
import CreateWorkout from "./CreateWorkout";

export default function Configuration() {
  return (
    <section className="w-full h-full flex flex-col justify-start items-center pt-10 gap-8 overflow-y-scroll">
      <WeekProgram numberOfDays={28} />
      <div className="w-[80%] flex justify-center items-center mt-10">
        <CreateWorkout />
      </div>
      <FloatingDock />
    </section>
  );
}
