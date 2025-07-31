import React, { useContext } from 'react';
import Modal from "../Modal/Modal";
import PlayerNameInput from "../../pages/PlayerNameInput";
import classes from '../../pages/Game.module.css';
import { PlayerContext } from "../Player/PlayerContext";
import { GameContext } from "../GameContext";

function PlayerNameModal() {
  const {
    firstPlayerName,
    secondPlayerName,
    setFirstPlayerName,
    setSecondPlayerName,
  } = useContext(PlayerContext);

  const {
    modalIsOpen,
    setModalIsOpen,
    handlePlayerNameChange
  } = useContext(GameContext);

  const handleStart = () => {
    if (firstPlayerName.trim() !== "" && secondPlayerName.trim() !== "") {
      setModalIsOpen(false);
    }
  };

  return (
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
  );
}

export default PlayerNameModal;
