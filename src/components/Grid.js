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
  const board = emptyGrid();
  const centerRow = Math.floor(GRID_SIZE / 2);
  board[centerRow] = word.split("");
  return board;
}


export default function Grid({activePlayer}) {
  const [board, setBoard] = useState([]);
  const [activeCell, setActiveCell] = useState(null);

  useEffect(() => {
    window.Dictionary = Dictionary;

    Dictionary.getDictionary().then(() => {
      const words = Dictionary.getAll(); // Dictionary.dictionary
      setBoard(generateBoardFromWords(words));
    });
  }, []);

  if (!board.length) return <>loading....</>

  const setLetters = (row, col, letter) => {
    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[row][col] = letter;
      return newBoard;
    });
  };


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
            setLetters={setLetters}
            row={rowIndex}
            col={colIndex}
            activePlayer={activePlayer}
          />
        ))
      )}

    </div>
  )
}
