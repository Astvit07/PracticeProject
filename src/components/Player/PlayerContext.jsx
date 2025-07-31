import {createContext, useState} from "react";

export const PlayerContext = createContext()
export function PlayerProvider({children}){
  const [firstPlayerName, setFirstPlayerName] = useState('Player 1');
  const [secondPlayerName, setSecondPlayerName] = useState('Player 1');

  return (
    <PlayerContext.Provider value={{
      firstPlayerName,
      setFirstPlayerName,
      secondPlayerName,
      setSecondPlayerName,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}
