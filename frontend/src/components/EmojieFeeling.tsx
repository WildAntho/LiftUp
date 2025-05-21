import React, { useState } from "react";
import { motion } from "framer-motion";

interface EmojiFeelingProps {
  value: number;
  setValue: (value: number) => void;
  disabled?: boolean;
}

const EmojiFeeling: React.FC<EmojiFeelingProps> = ({
  value,
  setValue,
  disabled = false,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const emojis = [
    { value: 1, name: "Horrible", emoji: "😡", color: "#ff5252" },
    { value: 2, name: "Mal", emoji: "🙁", color: "#ff9800" },
    { value: 3, name: "Moyen", emoji: "😐", color: "#ffeb3b" },
    { value: 4, name: "Bien", emoji: "🙂", color: "#8bc34a" },
    { value: 5, name: "Super", emoji: "😄", color: "#4caf50" },
  ];

  const handleMouseEnter = (emojiValue: number) => {
    if (!disabled) {
      setHoverValue(emojiValue);
    }
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const handleClick = (emojiValue: number) => {
    if (!disabled) {
      setValue(emojiValue);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="flex justify-center items-center mb-2 gap-8">
        {emojis.map((emoji) => (
          <div
            key={emoji.value}
            className={`flex flex-col items-center ${
              disabled ? "cursor-default" : "cursor-pointer"
            }`}
            onMouseEnter={() => handleMouseEnter(emoji.value)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(emoji.value)}
          >
            <motion.div
              className={`
                rounded-full p-2 mb-2
                ${value === emoji.value ? "bg-opacity-20" : "bg-gray-100"}
              `}
              style={{
                backgroundColor: value === emoji.value ? emoji.color : "",
                boxShadow:
                  value === emoji.value ? `0 0 0 3px ${emoji.color}30` : "none",
              }}
              whileHover={!disabled ? { scale: 1.15 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              animate={{
                scale:
                  hoverValue === emoji.value || value === emoji.value ? 1.1 : 1,
                opacity:
                  hoverValue !== null &&
                  hoverValue !== emoji.value &&
                  value !== emoji.value
                    ? 0.7
                    : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-center w-12 h-12 text-4xl">
                {emoji.emoji}
              </div>
            </motion.div>
            <motion.p
              className="text-sm font-medium"
              animate={{
                opacity:
                  hoverValue === emoji.value || value === emoji.value ? 1 : 0.7,
                fontWeight:
                  hoverValue === emoji.value || value === emoji.value
                    ? 600
                    : 400,
              }}
              style={{
                color:
                  hoverValue === emoji.value || value === emoji.value
                    ? emoji.color
                    : "#666",
              }}
            >
              {emoji.name}
            </motion.p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiFeeling;
