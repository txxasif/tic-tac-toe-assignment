import { winningLines } from "@/store/data";

export function calculateWinner(squares: Array<string | null>) {
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (
      squares[a] !== null &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}
export function getWiningIndex(squares: Array<string | null>): number | null {
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (
      squares[a] !== null &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return i;
    }
  }
  return null;
}
