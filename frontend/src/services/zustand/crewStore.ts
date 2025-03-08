import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CrewStore = {
  id: string;
  name: string;
};

type CrewState = {
  crew: CrewStore | null;
  set: (crew: CrewStore) => void;
  clear: () => void;
};

export const useCrewStore = create<CrewState>()(
  persist(
    (set) => ({
      crew: null,
      set: (crew: CrewStore) => set(() => ({ crew })),
      clear: () => set(() => ({ crew: null })),
    }),
    {
      name: "crew-store",
    }
  )
);
