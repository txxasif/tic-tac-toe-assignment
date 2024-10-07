export interface ITranslation {
  [lang: string]: {
    [key: string]: string;
  };
}
export type ILanguage = "en" | "bn";
