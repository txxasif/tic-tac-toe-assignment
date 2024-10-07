"use client";
import React, { useEffect } from "react";
import { translationAndLanguageStore } from "@/store/store";
import { calculateWinner } from "@/helper/helper";
import { Square } from "./3d";
import { ILanguage } from "@/types/types";
const TicTacToe = () => {
  const {
    board,
    setBoard,
    xIsNext,
    setXIsNext,
    language,
    setLanguage,
    getTranslation,
    handleReset,
  } = translationAndLanguageStore();

  useEffect(() => {
    console.log(`Game language changed to: ${language}`);
    console.log(`Current title: ${getTranslation("title")}`);
  }, [language, getTranslation]);

  const handleClick = (i: number) => {
    if (calculateWinner(board) !== null || board[i] !== null) return;

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  let status;
  if (winner !== null) {
    status = `${getTranslation("winner")}: ${winner}`;
  } else if (isDraw) {
    status = getTranslation("draw");
  } else {
    status = `${getTranslation("nextPlayer")}: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <h1 className="text-center">{getTranslation("title")}</h1>
        <div className="flex items-center gap-2">
          <span>{getTranslation("language")}:</span>
          <select
            aria-label={getTranslation("language")}
            value={language}
            onChange={(e) => {
              const selectedLanguage: ILanguage = e.target.value as ILanguage;
              setLanguage(selectedLanguage);
            }}
          >
            <option value="en">English</option>
            <option value="bn">Bangla</option>
          </select>
        </div>
      </div>
      <div>
        <div className="text-center mb-4">{status}</div>
        <div className="grid grid-cols-3 mb-4">
          {board.map((square, i) => (
            <Square
              key={i}
              value={square}
              index={i}
              onClick={() => handleClick(i)}
            />
          ))}
        </div>
        <button className="w-full" onClick={handleReset}>
          {getTranslation("restart")}
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
