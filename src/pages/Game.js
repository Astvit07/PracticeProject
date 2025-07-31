import React, {useContext} from 'react';
import classes from './Game.module.css';
import Grid from "../components/Grid/index";
import Modal from "../components/Modal/Modal";
import PlayerInfo from "../components/Player/PlayerInfo";
import {PlayerContext} from "../components/Player/PlayerContext";
import PlayerNameInput from "./PlayerNameInput";
import {GameContext} from "../components/GameContext";
import PlayerNameModal from "../components/Modal/PlayerNameModal";

function Game() {

  const {
    firstPlayerName,
    secondPlayerName,
  } = useContext(PlayerContext);

  const { activePlayer } = useContext(GameContext);

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
        <PlayerNameModal />
      </div>
    </>
  );
}

export default Game;
