import {createContext, useState} from "react";

export const PlayerContext = createContext()
export function PlayerProvider({children}){
  const [playerLetters, setPlayerLetters] = useState( [])
  return (
    <PlayerContext.Provider value={{playerLetters, setPlayerLetters}}>
      {children}
    </PlayerContext.Provider>
  )
}
