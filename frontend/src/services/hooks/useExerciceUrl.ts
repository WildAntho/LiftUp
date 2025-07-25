import { useMemo } from "react";
import { useUserStore } from "../zustand/userStore";

export const useExerciceURL = (imageSource: string) => {
  const s3CloudFront = import.meta.env.VITE_S3_CLOUDFRONT;
  const sex = useUserStore((state) => state.user?.sex);
  const s3URL = `${s3CloudFront}/exercices`;

  const exercicesURL = useMemo(() => {
    if (imageSource?.startsWith("AWS")) return "/staging/thumbnail/";
    if (sex === "male") return "/men";
    if (sex === "female") return "/women";
    if (!sex) return "/men";
    return "/";
  }, [sex, imageSource]);

  return imageSource.startsWith("https") ? "" : `${s3URL}${exercicesURL}`;
};
