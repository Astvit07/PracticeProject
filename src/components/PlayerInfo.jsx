import {useState} from "react";

export default function PlayerInfo({name}) {
  const [score, setScore] = useState('')
  return (
    <div className="player-info">
      <h2>Player Information</h2>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <p>Name: {name}</p>
        <button className="btn btn-primary">edit</button>

      </div>
      {score !== '' && <p>Score: {score}</p>}
</div>
  );
}
