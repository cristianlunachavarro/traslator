import { create } from "zustand";
import { getLanguagesList } from "../../api/language";

interface LanguageStoreProps {
  languages: { code: string; name: string }[];
  setLanguages: (languages: { code: string; name: string }[]) => void;
}

export const useLanguageStore = create<LanguageStoreProps>((set) => ({
  languages: [],
  setLanguages: (languages) => set({ languages }),
}));

export const handleLanguages = async () => {
  const languages = await getLanguagesList();
  useLanguageStore.getState().setLanguages(languages?.message);
};

