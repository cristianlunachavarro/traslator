import { create } from "zustand";
import type { AppError } from "../../types/error";

interface ErrorStore {
  errors: AppError[];
  addError: (error: AppError) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
}

export const useErrorStore = create<ErrorStore>((set) => ({
  errors: [],
  addError: (error) => {
    set((state) => ({
      errors: [...state.errors, error],
    }));
  },
  removeError: (id) =>
    set((state) => ({
      errors: state.errors.filter((e) => e.id !== id),
    })),
  clearErrors: () => set({ errors: [] }),
}));
