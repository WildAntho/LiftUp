import { create } from "zustand";
import { persist } from "zustand/middleware";

export type StudentStore = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
};

type StudentState = {
  student: StudentStore | null;
  set: (student: StudentStore) => void;
  clear: () => void;
};

export const useStudentStore = create<StudentState>()(
  persist(
    (set) => ({
      student: null,
      set: (student: StudentStore) => set(() => ({ student })),
      clear: () => set(() => ({ student: null })),
    }),
    {
      name: "student-store",
    }
  )
);
