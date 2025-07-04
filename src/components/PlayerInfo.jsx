import {useContext, useState} from "react";
import {PlayerContext} from "./PlayerContext";

export default function PlayerInfo({name}) {
  const [score, setScore] = useState('')
  const {playerLetters} = useContext(PlayerContext);
  return (
    <div className="player-info">
      <h2>Player Information</h2>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <p>Name: {name}</p>
        <button className="btn btn-primary">edit</button>

      </div>
      {score !== '' && <p>Score: {score}</p>}
      {playerLetters && playerLetters.map(l => <span key={l.letter}>{l.letter}</span>)}
</div>
  );
}
