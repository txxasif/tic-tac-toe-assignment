export interface ITranslation {
  [lang: string]: {
    [key: string]: string;
  };
}
export type ILanguage = "en" | "bn";

export interface ITicTacToeStore {
  language: ILanguage;
  board: Array<string | null>;
  xIsNext: boolean;
  isDraw?: boolean;
  winner?: string | null;
  status?: string;
  winingIndexes?: Array<number> | null;
  setXIsNext: (xIsNext: boolean) => void;
  setLanguage: (lang: ILanguage) => void;
  setStatus: (status: string) => void;
  getTranslation: (key: string) => string;
  handleReset: () => void;
  calculateWinnerX: (index: number) => void;
  setBoard: (board: Array<string | null>) => void;
}
