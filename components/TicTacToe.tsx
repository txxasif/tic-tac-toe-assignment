"use client";

import React, { useEffect } from "react";
import { ticTacToeStore } from "@/store/store";
import { Globe } from "lucide-react";
import { Square } from "./Squares";
import { ILanguage } from "@/types/types";

export default function TicTacToe() {
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-white p-6 mb-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          {getTranslation("title")}
        </h1>
        <div className="flex items-center justify-center gap-4 mb-6">
          <Globe className="w-6 h-6" />
          <span className="text-lg font-medium">
            {getTranslation("language")}:
          </span>
          <select
            aria-label={getTranslation("language")}
            value={language}
            onChange={(e) => {
              const selectedLanguage: ILanguage = e.target.value as ILanguage;
              setLanguage(selectedLanguage);
            }}
            className="bg-white/20 text-white font-semibold py-2 px-4  cursor-pointer"
          >
            <option value="en" className="bg-gray-700 text-white">
              English
            </option>
            <option value="bn" className="bg-gray-700 text-white">
              Bangla
            </option>
          </select>
        </div>
        <div className="text-center text-3xl font-semibold">{status}</div>
      </div>

      <div className="">
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
        <button
          className="w-full bg-white/20 text-white font-bold py-3 px-6 rounded-md hover:bg-white/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          onClick={handleReset}
        >
          {getTranslation("restart")}
        </button>
      </div>
    </div>
  );
}
