import create from "zustand";
import { persist } from "zustand/middleware";

interface AuthType {
  token: string | null;
  setToken: (t: string | null) => void;
}

export const useAuthStore = create<AuthType>(
  persist(
    (set, get) => ({
      token: null,
      setToken: (t: string | null) => set({ token: t }),
    }),
    {
      name: "pfa-token",
    }
  )
);
