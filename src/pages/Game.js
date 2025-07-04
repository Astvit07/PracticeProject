import React, {useState} from 'react';
import classes from './Game.module.css';
import Grid from "../components/Grid";
import Modal from "../components/Modal/Modal";
import PlayerInfo from "../components/PlayerInfo";
import {PlayerProvider} from "../components/PlayerContext";

function Game() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [firstPlayerName, setFirstPlayerName] = useState('Player 1');
  const [secondPlayerName, setSecondPlayerName] = useState('Player 1');
  const handleStart = () => {
    setModalIsOpen(false);
  }
  return (
    <PlayerProvider>
      <div className={classes.container}>
        <div className={classes['board-container']}>
          <PlayerInfo name={firstPlayerName}/>
          <Grid/>
          <PlayerInfo name={secondPlayerName}/>
        </div>
        <div className={`${classes.centered} ${classes['p-3']}`  }>
          <button>Go</button>
        </div>

        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <Modal.Header>Введіть імена гравців</Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder={firstPlayerName}
              value={firstPlayerName}
              required={true}
              onChange={(e) => setFirstPlayerName(e.target.value)}
            />
            <input
              type="text"
              placeholder={secondPlayerName}
              value={secondPlayerName}
              required={true}
              onChange={(e) => setSecondPlayerName(e.target.value)}
            />
          </Modal.Body>
          <Modal.Actions>
            <button onClick={handleStart}>Start</button>
          </Modal.Actions>
        </Modal>
      </div>
    </PlayerProvider>
  );
}

export default Game;
