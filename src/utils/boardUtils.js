import Dictionary from "../service/dictionary";
import {useEffect} from "react";
export const GRID_SIZE = 5;

function emptyGrid() {
  return Array.from({length: GRID_SIZE}, () =>
    Array.from({length: GRID_SIZE}, () => "")
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

export async function initBoard(){
  // useEffect(() => {
  //   window.Dictionary = Dictionary;
  //
  //   Dictionary.getDictionary().then(() => {
  //     const words = Dictionary.getAll(); // Dictionary.dictionary
  //     setBoard(generateBoardFromWords(words));
  //   });
  // }, []);

  await Dictionary.getDictionary();
  const words = Dictionary.getAll();
  return generateBoardFromWords(words);
}

