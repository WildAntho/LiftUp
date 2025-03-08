import { User } from "@/graphql/hooks";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserWithoutPassword = Omit<
  User,
  "password" | "coach" | "students" | "crew" 
>;

type UserState = {
  user: UserWithoutPassword | null;
  set: (user: UserWithoutPassword) => void;
  clear: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      set: (user: UserWithoutPassword) => set(() => ({ user: user })),
      clear: () => set(() => ({ user: null })),
    }),
    {
      name: "user-store",
    }
  )
);
