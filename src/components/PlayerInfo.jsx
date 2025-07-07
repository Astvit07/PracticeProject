import {useContext, useState} from "react";
import classes from './PlayerInfo.module.css';
import {GameContext} from "./GameContext";

export default function PlayerInfo({name , isActive , isFirstPlayer}) {

  const [score, setScore] = useState('')

  const {
    firstPlayerWords,
    secondPlayerWords,
    setModalIsOpen,
  } = useContext(GameContext);

  const playerWords = isFirstPlayer ? firstPlayerWords : secondPlayerWords;


  return (
    <div className="player-info">
      <h2 className={isActive && classes.active}>Player Information</h2>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <p>Name: {name}</p>
        <button
          className="btn btn-primary"
          onClick={() => setModalIsOpen(true)}
        >edit</button>

      </div>
      {score !== '' && <p>Score: {score}</p>}
      <ul>
        {playerWords && playerWords.map((word,index) => (
          <>
            <li key={index}>{word.map(l => l.letter).join('')}</li>
          </>
        ))}

      </ul>
    </div>
  );
}
