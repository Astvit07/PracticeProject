import React, {useEffect, useState, useContext} from 'react';
import GridItem from "./GridItem";
import Dictionary from "../service/dictionary";
import {GameContext} from "./GameContext";

import {GRID_SIZE, emptyGrid, initBoard} from "../utils/boardUtils";
import Modal from "./Modal/Modal";


// const GRID_SIZE = 5;
//
// function emptyGrid() {
//   return Array.from({length: GRID_SIZE}, () =>
//     Array.from({length: GRID_SIZE}, () => "")
//   );
// }
//
// function generateBoardFromWords(words) {
//   const firstWord = words.filter(word => word.length === GRID_SIZE);
//   if (firstWord.length === 0) return emptyGrid();
//
//   const word = firstWord[Math.floor(Math.random() * firstWord.length)];
//   const board = emptyGrid();
//   const centerRow = Math.floor(GRID_SIZE / 2);
//   board[centerRow] = word.split("");
//   return board;
// }

export default function Grid({activePlayer}) {
  const [board, setBoard] = useState([]);
  const [activeCells, setActiveCells] = useState([]);
  const [lastActiveCell, setLastActiveCell] = useState(null)
  const [letterAdded, setLetterAdded] = useState(false);
  const [modalError, setModalError] = useState(false);

  const {
    setFirstPlayerLetters,
    setSecondPlayerLetters,
    firstPlayerLetters,
    secondPlayerLetters,
    activePlayer: contextActivePlayer
  } = useContext(GameContext);

  useEffect(() => {
    setActiveCells([]);
    setLastActiveCell(null);
    setLetterAdded(false);
  }, [contextActivePlayer]);

  // useEffect(() => {
  //   window.Dictionary = Dictionary;
  //
  //   Dictionary.getDictionary().then(() => {
  //     const words = Dictionary.getAll(); // Dictionary.dictionary
  //     setBoard(generateBoardFromWords(words));
  //   });
  // }, []);

  useEffect(() => {
    window.Dictionary = Dictionary;

    initBoard().then((newBoard) => {
      setBoard(newBoard);
    });
  }, []);

  const resetSelection = () => {
    setActiveCells([]);
    setLastActiveCell(null);
    setLetterAdded(false);
    if (activePlayer){
      setFirstPlayerLetters([]);
    } else {
      setSecondPlayerLetters([]);
    }
  }

  const validationTurn = () =>{
    const currentLetters = activePlayer ? firstPlayerLetters : secondPlayerLetters;
     if (currentLetters.length < 3) {
       setModalError(true);
       return false;
    }
    return true;

  }


  const setLetters = (row, col, letter) => {
    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[row][col] = letter;
      return newBoard;
    });

    setLetterAdded(true);

    if (letter !== "") {
      const letterObj = {
        row,
        col,
        letter: letter
      };

      if (activePlayer) {
        setFirstPlayerLetters(prev => [...prev, letterObj]);
      } else {
        setSecondPlayerLetters(prev => [...prev, letterObj]);
      }

      setActiveCells(prev => [...prev, {row, col}]);
      setLastActiveCell({row, col});
    }
  };

  const activeCell = (row, col) => {
    if (board[row][col] === "") {
      return;
    }

    const letterObj = {
      row,
      col,
      letter: board[row][col]
    };

    if (activePlayer) {
      setFirstPlayerLetters(prev => [...prev, letterObj]);
    } else {
      setSecondPlayerLetters(prev => [...prev, letterObj]);
    }

    console.log({row, col})
    setActiveCells(prev => [...prev, {row, col}]);
    setLastActiveCell({row, col})
  };

  useEffect(() => {
    console.log('active Cell', lastActiveCell);
  }, [lastActiveCell]);

  const isNeighborCell = (rowIndex, colIndex) => {
    if (!lastActiveCell) return false;
    if (letterAdded && board[rowIndex][colIndex] === "") {
      return false;
    }

    const lastCellIsEmpty = lastActiveCell && board[lastActiveCell.row][lastActiveCell.col] === "";
    const currentCellIsEmpty = board[rowIndex][colIndex] === "";
    if (lastCellIsEmpty && currentCellIsEmpty) {
      return false;
    }

    return (
      (Math.abs(lastActiveCell.row - rowIndex) === 1 && lastActiveCell.col === colIndex) ||
      (Math.abs(lastActiveCell.col - colIndex) === 1 && lastActiveCell.row === rowIndex)
    )
  }
  const isCellActive = (rowIndex, colIndex) => {
    return activeCells.some(cell => cell.row === rowIndex && cell.col === colIndex)
  }

  const isGridItemDisabled = (rowIndex, colIndex) => {
    if (isCellActive(rowIndex, colIndex)) {
      return true;
    }

    if (lastActiveCell) {
      if (board[rowIndex][colIndex] === "" && !isNeighborCell(rowIndex, colIndex)) {
        return true;
      }

      if (board[rowIndex][colIndex] !== "" && !isNeighborCell(rowIndex, colIndex)) {
        return true;
      }
    }

    return false;
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
            activeCell={activeCell}
            setLetters={setLetters}
            row={rowIndex}
            col={colIndex}
            activePlayer={activePlayer}
            onClick={{}}
            isHightlight={isNeighborCell(rowIndex, colIndex)}
            isActive={isCellActive(rowIndex, colIndex)}
            isDisabled={isGridItemDisabled(rowIndex, colIndex)}
          />
        ))
      )}
      {activeCells.length > 0 && (
        <button onClick={resetSelection}>Reset</button>
      )}

      <Modal isOpen={modalError} onClose={() => setModalError(false)}>
        <Modal.Header>Введіть слово </Modal.Header>

        <Modal.Actions>
          <button
            onClick={() => setModalError(false)}
          >
            Ok
          </button>
        </Modal.Actions>
      </Modal>

    </div>
  )
}
