import { create } from "zustand"

import { v4 as uuid } from "uuid";

import { translateText } from "../../api/translate";
import { useErrorStore } from "../errorStore";

import type { TranslatePayload } from "../../types/translate";
import type { AppError } from "../../types/error";

interface TransateStoreProps {
  translatedText: string;
  errorMessage?: string;
  setTranslatedText: (translatedText: string) => void;
  setErrorMessage: (errorMessage: string) => void;
  setClearErrorMessage: () => void;
  setCleanTranslatedText: () => void;
}

export const useTranslateStore = create<TransateStoreProps>((set) => ({
  translatedText: "",
  errorMessage: "",
  setTranslatedText: (translatedText) => set({ translatedText }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  setClearErrorMessage: () => set({ errorMessage: "" }),
  setCleanTranslatedText: () => set({ translatedText: "" }),
}));

export const handleTranslation = async (payload: TranslatePayload) => {
  const { fromLang, toLang, text } = payload;

  const result = await translateText({ fromLang, toLang, text });
  const { error, message } = result;

  useTranslateStore.getState().setClearErrorMessage();

  if (error) {
    const transError: AppError = {
      id: uuid(),
      source: "translation",
      message,
    };
    return useErrorStore.getState().addError(transError);
  }
  return useTranslateStore.getState().setTranslatedText(message);
};
