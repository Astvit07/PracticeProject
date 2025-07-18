import React, {useContext} from 'react';
import classes from './Game.module.css';
import Grid from "../components/Grid";
import Modal from "../components/Modal/Modal";
import PlayerInfo from "../components/PlayerInfo";
import {PlayerContext} from "../components/PlayerContext";
import PlayerNameInput from "./PlayerNameInput";
import {GameContext} from "../components/GameContext";

function Game() {
  // const [modalIsOpen, setModalIsOpen] = useState(true);
  // const [firstPlayerName, setFirstPlayerName] = useState('Player 1');
  // const [secondPlayerName, setSecondPlayerName] = useState('Player 1');
  // const [activePlayer, setActivePlayer] = useState(true);
  const {
    firstPlayerName,
    secondPlayerName,
    setFirstPlayerName,
    setSecondPlayerName,
    firstPlayerLetters,
    secondPlayerLetters,
  } = useContext(PlayerContext);

  const {
    modalIsOpen,
    setModalIsOpen,
    activePlayer,
    handleNextTurn,
    handlePlayerNameChange
  } = useContext(GameContext);
  const handleStart = () => {
    if (firstPlayerName.trim() !== "" && secondPlayerName.trim() !== "") {
      setModalIsOpen(false);
    }
  }

  const handleChangeTurn = () => {
    const currentLetters = activePlayer ? firstPlayerLetters : secondPlayerLetters;

    if (currentLetters.length < 3) {
      setModalIsOpen(true);
      return;
    }

    handleNextTurn();
  }


  return (
    <>
      <div className={classes.container}>
        <div className={classes['board-container']}>
          <PlayerInfo
            name={firstPlayerName}
            isActive={activePlayer}
            isFirstPlayer={true}
          />
          <Grid activePlayer={activePlayer}/>
          <PlayerInfo
            name={secondPlayerName}
            isActive={!activePlayer
            } isFirstPlayer={false}
          />
        </div>
        <div className={`${classes.centered} ${classes['p-3']}`}>
          <button onClick={handleChangeTurn}>Go</button>
        </div>

        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <Modal.Header>Введіть імена гравців</Modal.Header>
          <Modal.Body>
            <div className={classes.inputBox}>
              <PlayerNameInput
                value={firstPlayerName}
                onChange={handlePlayerNameChange(setFirstPlayerName)}
              />
              <PlayerNameInput
                value={secondPlayerName}
                onChange={handlePlayerNameChange(setSecondPlayerName)}
              />
            </div>

          </Modal.Body>
          <Modal.Actions>
            <button
              onClick={handleStart}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleStart();
                }
              }}
            >
              Start
            </button>
          </Modal.Actions>
        </Modal>
      </div>
    </>
  );
}

export default Game;
