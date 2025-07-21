import React, {useContext} from 'react';
import classes from './Game.module.css';
import Grid from "../components/Grid";
import Modal from "../components/Modal/Modal";
import PlayerInfo from "../components/PlayerInfo";
import {PlayerContext} from "../components/PlayerContext";
import PlayerNameInput from "./PlayerNameInput";
import {GameContext} from "../components/GameContext";

function Game() {

  const {
    firstPlayerName,
    secondPlayerName,
    setFirstPlayerName,
    setSecondPlayerName,
  } = useContext(PlayerContext);

  const {
    modalIsOpen,
    setModalIsOpen,
    activePlayer,
    handlePlayerNameChange
  } = useContext(GameContext);
  const handleStart = () => {
    if (firstPlayerName.trim() !== "" && secondPlayerName.trim() !== "") {
      setModalIsOpen(false);
    }
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
          <Grid/>
          <PlayerInfo
            name={secondPlayerName}
            isActive={!activePlayer
            } isFirstPlayer={false}
          />
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
