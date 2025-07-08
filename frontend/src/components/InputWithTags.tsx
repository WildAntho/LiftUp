import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Tag {
  text: string;
  onRemove: () => void;
}

const Tag = ({ text, onRemove }: Tag) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: -10, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.8, y: -10, filter: "blur(10px)" }}
      transition={{
        duration: 0.4,
        ease: "circInOut",
        type: "spring",
      }}
      className="bg-gray-100 px-2 py-1 rounded-xl text-xs flex items-center gap-2 backdrop-blur-sm text-dark"
    >
      {text}
      <motion.div>
        <Button
          onClick={onRemove}
          className="bg-transparent text-xs h-fit flex items-center rounded-full shadow-none justify-center text-dark p-1 hover:bg-gray-200"
        >
          <X className="w-2 h-2" />
        </Button>
      </motion.div>
    </motion.span>
  );
};

interface InputWithTagsProps {
  tags: string[];
  setTags: (tag: string[]) => void;
  placeholder?: string;
  className?: string;
  limit?: number;
}

const InputWithTags = ({
  tags,
  setTags,
  placeholder,
  className,
  limit = 10,
}: InputWithTagsProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!limit || tags.length < limit) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={cn("flex flex-col gap-2 max-w-xl w-full", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="w-full flex justify-start items-center gap-2"
      >
        <motion.input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Type something and press Enter..."}
          className="w-[85%] text-xs px-4 py-2 bg-white border-1 border-gray-200 hover:border-gray-300 rounded-md backdrop-blur-sm text-dark disabled:opacity-50 disabled:cursor-not-allowed outline-none ring-0"
          disabled={limit ? tags.length >= limit : false}
        />
        <p className="text-sm text-gray-400 flex">⌘ Entrée</p>
      </motion.div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {tags.map((tag, index) => (
            <Tag key={index} text={tag} onRemove={() => removeTag(index)} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { InputWithTags };
