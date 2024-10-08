import { ITranslation } from "@/types/types";

export const translations: ITranslation = {
  en: {
    title: "Tic Tac Toe",
    player: "Player",
    winner: "Winner",
    draw: "Draw!",
    restart: "Restart Game",
    nextPlayer: "Next player",
    language: "Language",
  },
  bn: {
    title: "টিক ট্যাক টো",
    player: "খেলোয়াড়",
    winner: "জয়ী",
    draw: "ড্র!",
    restart: "গেম পুনরায় শুরু করুন",
    nextPlayer: "পরবর্তী খেলোয়াড়",
    language: "ভাষা",
  },
};

export const winningLines: Array<[number, number, number]> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
