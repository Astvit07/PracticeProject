import React, {useEffect, useState} from 'react';
import GridItem from "./GridItem";
import Dictionary from "../service/dictionary";

const GRID_SIZE = 5;

function emptyGrid() {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => "")
  );
}

function generateBoardFromWords(words) {
  const firstWord = words.filter(word => word.length === GRID_SIZE);
  if  (firstWord.length === 0) return emptyGrid();

  const word = firstWord[Math.floor(Math.random() * firstWord.length)];


  // if (words.length < GRID_SIZE) return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(""));
  // const used = [...words];

  // const board = [];
  const board = emptyGrid();

  const centerRow = Math.floor(GRID_SIZE / 2);
  board[centerRow] = word.split("");

  // for (let i = 0; i < GRID_SIZE; i++) {
  //   const idx = Math.floor(Math.random() * used.length);
  //   const word = used.splice(idx, 1)[0];
  //   board.push(word.split(""));
  // }
  return board;
}




export default function Grid() {
  // const initBoard = emptyGrid();
  const [board, setBoard] = useState([]);
  useEffect(() => {
    window.Dictionary = Dictionary;

    Dictionary.getDictionary().then(() => {
      const words = Dictionary.getAll(); // Dictionary.dictionary
      setBoard(generateBoardFromWords(words));
    });
  }, []);
  if (!board.length) return <>loading....</>

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_SIZE}, 60px )`,
        justifyContent: "center",
        gap: "5px"
    }}>

      {board.map((row, rowIndex) =>
        row.map((letter, colIndex) => (
          <GridItem
            key={`${rowIndex}-${colIndex}`}
            letter={letter}
            row={rowIndex}
            col={colIndex}
          />
        ))
      )}

    </div>
  )
}
