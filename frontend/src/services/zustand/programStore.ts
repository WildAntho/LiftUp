import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProgramStore = {
  id: string;
  duration: number;
  title: string;
};

type ProgramState = {
  program: ProgramStore | null;
  set: (program: ProgramStore) => void;
  clear: () => void;
};

export const useProgramStore = create<ProgramState>()(
  persist(
    (set) => ({
      program: null,
      set: (program: ProgramStore) => set(() => ({ program })),
      clear: () => set(() => ({ program: null })),
    }),
    {
      name: "program-store",
    }
  )
);
