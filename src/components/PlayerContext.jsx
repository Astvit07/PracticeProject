import {createContext, useState} from "react";

export const PlayerContext = createContext()
export function PlayerProvider({children}){
  const [firstPlayerLetters, setFirstPlayerLetters] = useState( [])
  const [secondPlayerLetters, setSecondPlayerLetters] = useState( [])


  return (
    <PlayerContext.Provider value={{
      firstPlayerLetters,
      setFirstPlayerLetters,
      secondPlayerLetters,
      setSecondPlayerLetters,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}
