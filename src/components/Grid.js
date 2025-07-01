import React, {useEffect, useState} from 'react';
import GridItem from "./GridItem";
const GRID_SIZE = 5;


async function loadWords() {
  const response = await fetch('/words.txt');
  const text = await response.text();
  return text
  .split('\n')
  .map(w => w.trim().toUpperCase())
  .filter(w => w.length === GRID_SIZE);
}

function generateBoardFromWords(words) {
  if (words.length < GRID_SIZE) return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(""));
  const used = [...words];
  const board = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    const idx = Math.floor(Math.random() * used.length);
    const word = used.splice(idx, 1)[0];
    board.push(word.split(""));
  }
  return board;
}

function emptyGrid() {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => "")
  );
}

const GameBoard = ({ board }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${GRID_SIZE}, 60px )`,justifyContent: "center", gap: "5px" }}>
      {board.map((row, rowIndex) =>
        row.map((letter, colIndex) => (
          <GridItem key={`${rowIndex}-${colIndex}`} letter={letter} />
        ))
      )}
    </div>
  );
};


export default function Grid() {
  // const initBoard = emptyGrid();
  const [board, setBoard] = useState([]);
  useEffect(() => {
    loadWords().then(words => {
      setBoard(generateBoardFromWords(words));
    });
  }, []);
  if (!board.length) return <>loading....</>
  return <GameBoard board={board} />;
}
