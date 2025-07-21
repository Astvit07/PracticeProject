import {useContext, useState, useEffect} from "react";
import classes from './PlayerInfo.module.css';
import {GameContext} from "./GameContext";

export default function PlayerInfo({name, isActive, isFirstPlayer}) {

  const [score, setScore] = useState('')

  const {
    firstPlayerWords,
    secondPlayerWords,
    firstPlayerLetters,
    secondPlayerLetters,
    setModalIsOpen,
  } = useContext(GameContext);

  const playerWords = isFirstPlayer ? firstPlayerWords : secondPlayerWords;
  const currentLetters = isFirstPlayer ? firstPlayerLetters : secondPlayerLetters;

  useEffect(() => {
    if (playerWords && playerWords.length) {
      const newScore = playerWords.reduce((total, word) => {
        return total + word.length;
      }, 0);
      setScore(newScore);
    }
  }, [playerWords]);

  const currentWord = currentLetters.map(item => item.letter).join('');

  return (
    <div className="player-info">
      <div
        className={isActive ? classes.active : ''}
        style={{display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold'}}>
        <p>{name}</p>
        <button
          className="btn btn-primary"
          onClick={() => setModalIsOpen(true)}
        >edit
        </button>

      </div>
      <p>Score: {score !== "" ? score : 0}</p>
      <div className={classes.currentWord}>
        <p><strong>{currentWord}</strong></p>
      </div>
      <ul>
        {playerWords && playerWords.length > 0 ? (
          playerWords.map((word, index) => (
            <li key={index}>{Array.isArray(word) ? word.map(l => l.letter.toUpperCase()).join('') : word}</li>
          ))
        ) : (
          <li>No words yet</li>
        )}
      </ul>
    </div>
  );
}
