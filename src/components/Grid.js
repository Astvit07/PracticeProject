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
  const [activeCells, setActiveCells] = useState([]);
  const [lastActiveCell, setLastActiveCell] = useState(null)

  useEffect(() => {
    window.Dictionary = Dictionary;

    Dictionary.getDictionary().then(() => {
      const words = Dictionary.getAll(); // Dictionary.dictionary
      setBoard(generateBoardFromWords(words));
    });
  }, []);



  const setLetters = (row, col, letter) => {
    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[row][col] = letter;
      return newBoard;
    });
  };

  const cellIsActive = (row, col) => {
    console.log({row, col})
    setActiveCells(prev => [...prev, { row, col }]);
    setLastActiveCell({ row, col })
  };

  useEffect(() => {
    console.log('active Cell', lastActiveCell);
  }, [lastActiveCell]);

  const isNeighborCell = (currentRow, currentCol) => {
    return lastActiveCell !== null && (
      (Math.abs(lastActiveCell.row - currentRow) === 1 && lastActiveCell.col === currentCol) ||
      (Math.abs(lastActiveCell.col - currentCol) === 1 && lastActiveCell.row === currentRow)
    )
  }
  const isCellActive = (rowIndex, colIndex) => {
   return activeCells.some(cell => cell.row === rowIndex && cell.col === colIndex)
  }

  const boardDisabled = (rowIndex, colIndex) => {
    if (isCellActive(rowIndex, colIndex) && board[rowIndex][colIndex] !== "") {
      return true;
    }

    if (!lastActiveCell) {
      return false;
    }

    return !isNeighborCell(rowIndex, colIndex);
  }

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
            cellIsActive={cellIsActive}
            setLetters={setLetters}
            row={rowIndex}
            col={colIndex}
            activePlayer={activePlayer}
            onClick={{}}
            isHightlight={isNeighborCell(rowIndex, colIndex)}
            isActive={isCellActive(rowIndex, colIndex)}
            isDisabled={boardDisabled(rowIndex,colIndex)}
          />
        ))
      )}

    </div>
  )
}
