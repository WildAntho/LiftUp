import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import FloatingDock from "./FloatingDock";
import { motion } from "framer-motion";

export default function CreateWorkout() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-center items-between gap-4 w-full h-full"
    >
      <section className="flex flex-col justify-center items-center gap-4 w-full h-full">
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-semibold text-center text-gray-500"
        >
          Ajouter votre première séance
        </motion.h2>
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-center items-center gap-2"
        >
          <p className="text-md text-gray-400 text-center">
            Créer un entraînement personnalisé en ajoutant des exercices.
          </p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="w-full flex justify-center items-center"
        >
          <Button className="group h-12 w-1/3 text-black bg-gray-100 hover:bg-gray-200 border border-black my-5 rounded-xl hover:translate-y-[-2px] hover:shadow-md transition-all duration-200">
            <PlusCircle className="transition-all duration-200 group-hover:rotate-90" />
            <p className="transition-all duration-200 group-hover:translate-x-1">
              Créer une séance
            </p>
          </Button>
        </motion.div>
        <motion.div variants={itemVariants} className="h-64 w-full bg-white" />
      </section>
      <FloatingDock />
    </motion.section>
  );
}
