import {createContext, useState} from "react";

export const PlayerContext = createContext()
export function PlayerProvider({children}){
  const [firstPlayerLetters, setFirstPlayerLetters] = useState( [])
  const [secondPlayerLetters, setSecondPlayerLetters] = useState( [])
  const [firstPlayerName, setFirstPlayerName] = useState('Player 1');
  const [secondPlayerName, setSecondPlayerName] = useState('Player 1');
  const [modalIsOpen, setModalIsOpen] = useState(true)

  const handlePlayerNameChange = (name) =>(e)=>name(e.target.value);



  return (
    <PlayerContext.Provider value={{
      firstPlayerLetters,
      setFirstPlayerLetters,
      secondPlayerLetters,
      setSecondPlayerLetters,
      firstPlayerName,
      setFirstPlayerName,
      secondPlayerName,
      setSecondPlayerName,
      modalIsOpen,
      setModalIsOpen,
      handlePlayerNameChange
    }}>
      {children}
    </PlayerContext.Provider>
  )
}
