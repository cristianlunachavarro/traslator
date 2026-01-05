import { create } from "zustand";

import { v4 as uuid } from "uuid";

import type { Histories } from "../../types/histories";
import { fetchHistories } from "../../api/history";
import type { AppError } from "../../types/error";
import { useErrorStore } from "../errorStore";

interface HistoryStoreProps {
  histories: Histories;
  setHistories: (histories: Histories) => void;
}

export const useHistoryStore = create<HistoryStoreProps>((set) => ({
  histories: [],
  setHistories: (histories) => set({ histories }),
  clearHistories: () => set({ histories: [] }),
}));

export const HandleFetchHistories = async () => {
  const result = await fetchHistories();
  const [histories, error, message] = result;

  if (error) {
    const historyError: AppError = {
      id: uuid(),
      source: "histories",
      message,
    };
    return useErrorStore.getState().addError(historyError);
  }
  return useHistoryStore.getState().setHistories(histories);
};
