import { useMemo } from "react";
import { useUserStore } from "./userStore";

export const useExerciceURL = () => {
  const s3CloudFront = import.meta.env.VITE_S3_CLOUDFRONT;
  const sex = useUserStore((state) => state.user?.sex);
  const s3URL = `${s3CloudFront}/exercices`;

  const exercicesURL = useMemo(() => {
    if (sex === "male") return "/men";
    if (sex === "female") return "/women";
    if (!sex) return "/men";
    return "/";
  }, [sex]);

  return `${s3URL}${exercicesURL}`;
};
