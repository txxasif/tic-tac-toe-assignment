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

// "use client";
// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // Translations
// const translations: {
//   [lang: string]: {
//     [key: string]: string;
//   };
// } = {
//   en: {
//     title: "Tic Tac Toe",
//     player: "Player",
//     winner: "Winner",
//     draw: "Draw!",
//     restart: "Restart Game",
//     nextPlayer: "Next player",
//     language: "Language",
//   },
//   bn: {
//     title: "টিক ট্যাক টো",
//     player: "খেলোয়াড়",
//     winner: "জয়ী",
//     draw: "ড্র!",
//     restart: "গেম পুনরায় শুরু করুন",
//     nextPlayer: "পরবর্তী খেলোয়াড়",
//     language: "ভাষা",
//   },
// };

// // Outside React component translation helper
// const getTranslation = (lang: string, key: string) => {
//   console.log(`Getting translation for: ${key} in ${lang}`); // Console output
//   return translations[lang]?.[key] || translations.en[key];
// };

// const TicTacToe = () => {
//   const [board, setBoard] = useState(Array(9).fill(null));
//   const [xIsNext, setXIsNext] = useState(true);
//   const [language, setLanguage] = useState<string>("en");

//   // Inside render translation (using state)
//   const t = (key: string) => getTranslation(language, key);

//   useEffect(() => {
//     // Internationalization in console
//     console.log(`Game language changed to: ${language}`);
//     console.log(`Current title: ${t("title")}`);
//   }, [language]);

//   const calculateWinner = (squares: Array<string | null>) => {
//     const lines = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8], // rows
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8], // columns
//       [0, 4, 8],
//       [2, 4, 6], // diagonals
//     ];

//     for (let i = 0; i < lines.length; i++) {
//       const [a, b, c] = lines[i];
//       if (
//         squares[a] !== null &&
//         squares[a] === squares[b] &&
//         squares[a] === squares[c]
//       ) {
//         return squares[a];
//       }
//     }
//     return null;
//   };

//   const handleClick = (i: number) => {
//     if (calculateWinner(board) !== null || board[i] !== null) return;

//     const newBoard = board.slice();
//     newBoard[i] = xIsNext ? "X" : "O";
//     setBoard(newBoard);
//     setXIsNext(!xIsNext);
//   };

//   const renderSquare = (i: number) => (
//     <Button
//       variant="outline"
//       className="h-20 w-20 text-2xl font-bold"
//       onClick={() => handleClick(i)}
//     >
//       {board[i]}
//     </Button>
//   );

//   const winner = calculateWinner(board);
//   const isDraw = !winner && board.every((square) => square !== null);

//   let status;
//   if (winner !== null) {
//     status = `${t("winner")}: ${winner}`;
//   } else if (isDraw) {
//     status = t("draw");
//   } else {
//     status = `${t("nextPlayer")}: ${xIsNext ? "X" : "O"}`;
//   }

//   const handleReset = () => {
//     setBoard(Array(9).fill(null));
//     setXIsNext(true);
//   };

//   return (
//     <Card className="w-[400px] p-4">
//       <CardHeader>
//         <CardTitle className="text-center">{t("title")}</CardTitle>
//         <div className="flex items-center gap-2">
//           <span>{t("language")}:</span>
//           <Select value={language} onValueChange={setLanguage}>
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="en">English</SelectItem>
//               <SelectItem value="bn">Bangla</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="text-center mb-4">{status}</div>
//         <div className="grid grid-cols-3 gap-2 mb-4">
//           {Array(9)
//             .fill(null)
//             .map((_, i) => (
//               <div key={i}>{renderSquare(i)}</div>
//             ))}
//         </div>
//         <Button className="w-full" onClick={handleReset}>
//           {t("restart")}
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default TicTacToe;
