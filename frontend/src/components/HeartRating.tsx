import { useState } from "react";
import { motion } from "framer-motion";

type HeartRatingProps = {
  satisfaction: number;
  setSatisfaction: (value: number) => void;
  disabled: boolean;
};

export default function HeartRating({
  satisfaction,
  setSatisfaction,
  disabled,
}: HeartRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const totalHearts = 10;

  const handleMouseEnter = (index: number) => {
    if (!disabled) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (!disabled) {
      setSatisfaction(index);
    }
  };

  return (
    <div className="flex flex-col items-center px-6 py-2 max-w-md mx-auto">
      <div className={`flex mb-4`}>
        {[...Array(totalHearts)].map((_, index) => {
          const heartIndex = index + 1;
          // Toujours afficher les cœurs sélectionnés, même pendant le survol
          const isFilled =
            hoverRating >= heartIndex ||
            (!hoverRating && heartIndex <= satisfaction);
          const isCurrentlyHovered = heartIndex === hoverRating && !disabled;

          return (
            <motion.button
              key={heartIndex}
              className={`focus:outline-none px-1 ${
                disabled ? "cursor-default" : "cursor-pointer"
              }`}
              onMouseEnter={() => handleMouseEnter(heartIndex)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(heartIndex)}
              animate={
                isCurrentlyHovered
                  ? {
                      scale: [1, 1.3, 1.15, 1.2],
                      transition: {
                        duration: 0.5,
                        times: [0, 0.4, 0.7, 1],
                        ease: "easeInOut",
                      },
                    }
                  : { scale: 1 }
              }
              whileTap={disabled ? {} : { scale: 0.8 }}
              aria-label={`Évaluer ${heartIndex} sur ${totalHearts}`}
              disabled={disabled}
            >
              {isFilled ? (
                <svg
                  className="w-8 h-8 text-red-500 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-gray-300 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
