import { create } from "zustand";
import { translations, winningLines } from "./data";
import { ILanguage } from "@/types/types";
import { calculateWinner, getWiningIndex } from "@/helper/helper";

interface ITicTacToeStore {
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

const ticTacToeStore = create<ITicTacToeStore>((set, get) => ({
  language: "en",
  board: Array(9).fill(null),
  xIsNext: true,
  winner: null,
  isDraw: false,
  winingIndexes: null,

  setStatus: (status: string) => set((state) => ({ ...state, status })),
  setLanguage: (lang: ILanguage) =>
    set((state) => ({ ...state, language: lang })),
  getTranslation: (key: string) => {
    const { language } = get();
    return translations[language]?.[key] || translations.en[key];
  },
  handleReset: () => {
    set((state) => ({
      ...state,
      board: Array(9).fill(null),
      xIsNext: true,
      isDraw: false,
      winner: null,
      winingIndexes: null,
    }));
  },
  setXIsNext: (next: boolean) => set((state) => ({ ...state, xIsNext: next })),
  setBoard: (board: Array<string | null>) =>
    set((state) => ({ ...state, board: board })),
  calculateWinnerX: (index: number) => {
    const { board, xIsNext } = get();
    if (calculateWinner(board) !== null || board[index] !== null) return;
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";

    const winner = calculateWinner(newBoard);
    const isDraw = !winner && newBoard.every((square) => square !== null);
    let winingIndex: number | null;
    if (winner) {
      winingIndex = getWiningIndex(newBoard);
    }

    set((state) => ({
      ...state,
      board: newBoard,
      xIsNext: !xIsNext,
      isDraw,
      winner: winner || null,
      winingIndexes: winingIndex ? winningLines[winingIndex] : null,
    }));
  },
}));

export { ticTacToeStore };
