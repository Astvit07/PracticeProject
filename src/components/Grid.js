import React, {useEffect, useState, useContext} from 'react';
import GridItem from "./GridItem";
import {GameContext} from "./GameContext";
import Modal from "./Modal/Modal";
import {useBoard,GRID_SIZE} from "../service/useBoard";
import classes from "../pages/Game.module.css";


export default function Grid() {
  const { board, updateBoard } = useBoard();
  const [activeCells, setActiveCells] = useState([]);
  const [lastActiveCell, setLastActiveCell] = useState(null)
  const [letterAdded, setLetterAdded] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const {
    setFirstPlayerLetters,
    setSecondPlayerLetters,
    firstPlayerLetters,
    secondPlayerLetters,
    activePlayer,
    handleNextTurn,
    secondPlayerWords,
    firstPlayerWords,
  } = useContext(GameContext);

  useEffect(() => {
    setActiveCells([]);
    setLastActiveCell(null);
    setLetterAdded(false);
  }, [activePlayer]);



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
    if (!currentLetters || currentLetters.length < 3) {
      setModalError(true);
      setErrorMessage('Ви повинні вибрати принаймні 3 літери для слова.');
      return false;
    }
    const currentWord = currentLetters.map(letterObj => letterObj.letter).join('');
    const opponentWords = activePlayer ? secondPlayerWords : firstPlayerWords;
    const isDuplicate = opponentWords.some(wordArray => {
      const word = wordArray.map(letterObj => letterObj.letter).join('');
      return word === currentWord;
    });
    if (isDuplicate) {
      setModalError(true);
      resetSelection();
      setErrorMessage("Слово вже використовується іншим гравцем.");
      return false;
    }
    return true;

  }

  const handleChangeTurn = () => {
    if (validationTurn()) {
      handleNextTurn();
    }
  }

  const setLetters = (row, col, letter) => {
    const newBoard = [...board];
    newBoard[row][col] = letter;
    updateBoard(newBoard);
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

    <div>
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

      </div>
      {activeCells.length > 0 && (
        <div className={`${classes.centered} ${classes['p-3']}`}>
          <button onClick={resetSelection}>Reset</button>
          <button onClick={handleChangeTurn}>Go</button>
        </div>
      )}

      <Modal isOpen={modalError} onClose={() => setModalError(false)}>
        <Modal.Header>{errorMessage}</Modal.Header>

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
