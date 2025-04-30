import { Separator } from "@/components/ui/separator";
import { Tooltip } from "@heroui/react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function ExerciceComponent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };
  return (
    <motion.section
      className="flex flex-col justify-start items-center gap-4 w-full h-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Separator orientation="vertical" className="h-12" />
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-semibold text-center text-gray-500"
      >
        Ajouter un exercice à cette séance
      </motion.h2>
      <motion.div
        variants={itemVariants}
        className="flex flex-col justify-center items-center gap-2"
      >
        <p className="text-md text-gray-400 text-center">
          Créer un exercice personnalisé pour un entraînement sur mesure.
        </p>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="w-full flex justify-center items-center"
      >
        <Tooltip
          content="Ajouter un exercice"
          className="text-xs"
          showArrow={true}
          color="foreground"
        >
          <div className="group flex justify-center items-center w-12 h-12 rounded-full my-2 cursor-pointer text-tertiary border border-tertiary border-opacity-20 bg-tertiary bg-opacity-20 hover:bg-tertiary hover:bg-opacity-20 shadow-sm p-2 hover:translate-y-[-2px] hover:shadow-md transition-all duration-200">
            <Plus className="transition-all duration-200 group-hover:rotate-90" />
          </div>
        </Tooltip>
      </motion.div>
    </motion.section>
  );
}
