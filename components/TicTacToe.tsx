"use client";
import React, { useEffect } from "react";
import { ticTacToeStore } from "@/store/store";

import { Square } from "./3d";
import { ILanguage } from "@/types/types";
const TicTacToe = () => {
  const {
    board,
    setStatus,
    status,
    language,
    setLanguage,
    getTranslation,
    handleReset,
    winner,
    isDraw,
    xIsNext,
    calculateWinnerX,
  } = ticTacToeStore();

  useEffect(() => {
    console.log(`Game language changed to: ${language}`);
    console.log(`Current title: ${getTranslation("title")}`);
    if (winner !== null) {
      setStatus(`${getTranslation("winner")}: ${winner}`);
    } else if (isDraw) {
      setStatus(getTranslation("draw"));
    } else {
      setStatus(`${getTranslation("nextPlayer")}: ${xIsNext ? "X" : "O"}`);
    }
  }, [language, getTranslation, winner, isDraw, xIsNext, setStatus]);

  const handleClick = (i: number) => {
    calculateWinnerX(i);
  };
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
