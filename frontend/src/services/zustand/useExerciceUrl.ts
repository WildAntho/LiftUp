import { useMemo } from "react";
import { useUserStore } from "./userStore";

export const useExerciceURL = () => {
  const sex = useUserStore((state) => state.user?.sex);

  const exercicesURL = useMemo(() => {
    if (sex === "male") return "/exercices/men";
    if (sex === "female") return "/exercices/women";
    if (!sex) return "/exercices/men";
    return "/exercices";
  }, [sex]);

  return exercicesURL;
};
