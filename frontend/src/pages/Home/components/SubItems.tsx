import { motion, AnimatePresence } from "framer-motion";

type SubItemProps = {
  title: string;
  open: boolean;
  get?: () => void;
};

export default function SubItems(props: SubItemProps) {
  const childVariants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
    },
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <section
      className={`group flex items-center justify-between w-full h-5 cursor-pointer px-4 py-5 rounded-r-md hover:bg-dark/5`}
      onClick={props.get}
    >
      <div className="h-full flex justify-center items-center gap-5">
        <AnimatePresence>
          {props.open && (
            <motion.p
              variants={childVariants}
              animate="enter"
              exit="exit"
              initial="initial"
              className={`text-sm text-gray-500 transition transform group-hover:translate-x-1 group-hover:text-dark`}
            >
              {props.title}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
