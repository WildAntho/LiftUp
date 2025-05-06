import { create } from "zustand";
import { persist } from "zustand/middleware";

type TrainingState = {
  ids: string[] | null;
  set: (ids: string[]) => void;
  clear: () => void;
};

export const useTrainingStore = create<TrainingState>()(
  persist(
    (set) => ({
      ids: null,
      set: (ids: string[]) => set(() => ({ ids })),
      clear: () => set(() => ({ ids: null })),
    }),
    {
      name: "training-store",
    }
  )
);
