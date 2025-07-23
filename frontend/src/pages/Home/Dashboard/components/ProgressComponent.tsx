import { ChevronRight, Circle } from "lucide-react";
import { Task } from "../Dashboard";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

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

  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Délai entre chaque tâche
        delayChildren: 0.1, // Délai avant le début des animations des enfants
      },
    },
  };

  const taskVariants = {
    hidden: {
      opacity: 0,
      y: 30, // Vient de bas en haut
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: 0.3,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${progressPercentage}%`,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col items-start justify-center gap-6"
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="w-full flex flex-col items-start justify-center gap-8"
        variants={headerVariants}
      >
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Bonjour {userName} 👋
          </h1>
          <p className="text-sm">Découvre l'application en quelques clics !</p>
        </div>
        
        {/* Progress Section */}
        <div className="mb-2 w-full">
          <motion.div
            className="flex justify-between items-center mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              PROGRESSION
            </span>
            <motion.span
              className="text-sm font-bold text-gray-900"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
            >
              {progressPercentage}%
            </motion.span>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gray-900 h-3 rounded-full"
              variants={progressBarVariants}
              initial="hidden"
              animate="visible"
            />
          </div>
        </div>
      </motion.div>

      {/* Tasks List */}
      <motion.div
        className="space-y-8 my-4 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            className="group flex items-center gap-4 group cursor-pointer"
            variants={taskVariants}
            onClick={() => {
              task.action();
            }}
            whileHover={{
              x: 4,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {task.completed ? (
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      damping: 15,
                    }}
                  >
                    <FaCheckCircle className="w-6 h-6 text-green-600" />
                  </motion.div>
                </div>
              ) : (
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                  <Circle className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </motion.div>

            <span
              className={`w-full flex justify-between items-center text-sm font-medium transition-all ${
                task.completed
                  ? "text-gray-500 line-through"
                  : "text-gray-700 group-hover:text-gray-900"
              }`}
            >
              {task.text}
              {!task.completed && (
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight size={20} />
                </motion.div>
              )}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}