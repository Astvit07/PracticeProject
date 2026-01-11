import React, {useContext, useRef, useState} from 'react';
import classes from './Game.module.css';
import Grid from "../components/Grid/index";
import Modal from "../components/Modal/Modal";
import PlayerInfo from "../components/Player/PlayerInfo";
import {PlayerContext} from "../components/Player/PlayerContext";
import PlayerNameInput from "./PlayerNameInput";
import {GameContext} from "../components/GameContext";
import PlayerNameModal from "../components/Modal/PlayerNameModal";

import User from '../service/TestClass'

function Game() {

  const {
    firstPlayerName,
    secondPlayerName,
  } = useContext(PlayerContext);

  const { activePlayer } = useContext(GameContext);

  const handleUserInfo = () => {
    User.userInfo();
  }
  const handleUserAge = () => {
    User.userAge();
  }
  const handleUserBirthday = () => {
    User.birthday();
    console.log(User.age)
  }


  const refUserName = useRef(null);
  const refUserAge = useRef(null);

  const [isVisibleAddUserBox, setIsVisibleAddUserBox] = useState(false)

  const handleAddUserBox= ()=>{
    setIsVisibleAddUserBox(!isVisibleAddUserBox);
  }


  const handleAddUser = () => {
    User.name = refUserName.current.value;

    const name = refUserName.current.value;
    const age = parseInt(refUserAge.current.value);
    if (name && !isNaN(age)) {
      User.addUser(name, age);
      setIsVisibleAddUserBox(false);
    }

  }

  const handleShowUsers = () => {
    User.getAllUsers();
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
        <PlayerNameModal />
      </div>
      <div className={classes.container}>

        <button onClick={handleUserInfo}>Info</button>
        <button onClick={handleUserAge}>Age</button>
        <button onClick={handleUserBirthday}>Birthday</button>
        <br/>
        <br/>
        <button onClick={handleAddUserBox}>Додати користувача</button>
        <br/>
        <br/>


        {isVisibleAddUserBox && (
          <>
            <input
              type="text"
              ref={refUserName}
              placeholder="Name"
            />
            <input
              type="number"
              ref={refUserAge}
              placeholder="Age"
            />
            <button onClick={handleAddUser}>Додати</button>
            <br/>
            <br/>
          </>

        )}
        <button onClick={handleShowUsers}>Показати список</button>
      </div>
    </>
  );
}

export default Game;
