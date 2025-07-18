import { useState, useEffect } from 'react';
import Dictionary from "../service/dictionary";

export const GRID_SIZE = 5;

export function useBoard() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    async function initializeBoard() {
      window.Dictionary = Dictionary;
      await Dictionary.getDictionary();
      const words = Dictionary.getAll();
      setBoard(generateBoardFromWords(words));
    }

    initializeBoard();
  }, []);

  function emptyGrid() {
    return Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => "")
    );
  }

  function generateBoardFromWords(words) {
    const firstWord = words.filter(word => word.length === GRID_SIZE);
    if (firstWord.length === 0) return emptyGrid();

    const word = firstWord[Math.floor(Math.random() * firstWord.length)];
    const board = emptyGrid();
    const centerRow = Math.floor(GRID_SIZE / 2);
    board[centerRow] = word.split("");
    return board;
  }

  function updateBoard(newBoard) {
    setBoard(newBoard);
  }

  return {
    board,
    updateBoard,
  };
}
