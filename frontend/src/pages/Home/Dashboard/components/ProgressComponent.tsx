import { CheckCircle, ChevronRight, Circle } from "lucide-react";
import { Task } from "../Dashboard";

interface ProgressComponentProps {
  userName: string;
  tasks: Task[];
}

export default function ProgressComponent({
  userName,
  tasks,
}: ProgressComponentProps) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progressPercentage = Math.round((completedTasks / tasks.length) * 100);

  return (
    <div className="w-full h-full flex flex-col items-start justify-center gap-6">
      {/* Header */}
      <div className="w-full flex flex-col items-start justify-center gap-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Bonjour {userName} 👋
          </h1>
          <p className="text-sm">
            Envie de découvrir une application qui simplifie ton quotidien ?
            Laisses-toi guider.
          </p>
        </div>
        {/* Progress Section */}
        <div className="mb-2 w-full">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              PROGRESSION
            </span>
            <span className="text-sm font-bold text-gray-900">
              {progressPercentage}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gray-900 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-8 my-4 w-full">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group flex items-center gap-4 group cursor-pointer"
            onClick={() => {
              task.action();
            }}
          >
            <div className="flex-shrink-0">
              {task.completed ? (
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                  <Circle className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>

            <span
              className={`w-full flex justify-between items-center text-sm font-medium transition-all transform group-hover:translate-x-1 ${
                task.completed
                  ? "text-gray-500 line-through"
                  : "text-gray-700 group-hover:text-gray-900"
              }`}
            >
              {task.text}
              {!task.completed && <ChevronRight size={20} />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
