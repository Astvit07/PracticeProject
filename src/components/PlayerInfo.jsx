import {useContext, useState} from "react";
import {PlayerContext} from "./PlayerContext";
import classes from './PlayerInfo.module.css';

export default function PlayerInfo({name , isActive , isFirstPlayer}) {

  const [score, setScore] = useState('')
  const {
    firstPlayerLetters,
    secondPlayerLetters
  } = useContext(PlayerContext);

  const playerLetters = isFirstPlayer ? firstPlayerLetters : secondPlayerLetters;

  return (
    <div className="player-info">
      <h2 className={isActive && classes.active}>Player Information</h2>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <p>Name: {name}</p>
        <button className="btn btn-primary">edit</button>

      </div>
      {score !== '' && <p>Score: {score}</p>}
      {playerLetters && playerLetters.map(l => <span key={l.letter}>{l.letter}</span>)}
</div>
  );
}
