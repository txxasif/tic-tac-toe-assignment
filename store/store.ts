import { create } from "zustand";
import { translations } from "./data";
import { ILanguage } from "@/types/types";

interface ITranslationAndLanguage {
  language: ILanguage;
  board: Array<string | null>;
  xIsNext: boolean;
  setXIsNext: (xIsNext: boolean) => void;
  setLanguage: (lang: ILanguage) => void;
  getTranslation: (key: string) => string;
  handleReset: () => void;
  setBoard: (board: Array<string | null>) => void;
}
const translationAndLanguageStore = create<ITranslationAndLanguage>(
  (set, get) => ({
    language: "en",
    board: Array(9).fill(null),
    xIsNext: true,

    setLanguage: (lang: ILanguage) =>
      set((state) => ({ ...state, language: lang })),
    getTranslation: (key: string) => {
      const { language } = get();
      return translations[language]?.[key] || translations.en[key];
    },
    handleReset: () => {
      set((state) => ({ ...state, board: Array(9).fill(null), xIsNext: true }));
    },
    setXIsNext: (next: boolean) =>
      set((state) => ({ ...state, xIsNext: next })),
    setBoard: (board: Array<string | null>) =>
      set((state) => ({ ...state, board: board })),
  })
);

export { translationAndLanguageStore };
