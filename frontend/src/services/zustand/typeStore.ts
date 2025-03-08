import { ExerciceType } from "@/graphql/hooks";
import { create } from "zustand";

type TypeState = {
  types: ExerciceType[];
  setTypes: (types: ExerciceType[]) => void;
};

export const useTypeStore = create<TypeState>((set) => ({
  types: [],
  setTypes: (types) => set({ types }),
}));
