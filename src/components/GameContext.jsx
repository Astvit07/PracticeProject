import {createContext, useState} from "react";

export const GameContext = createContext()
export function GameProvider({children}){
  const [firstPlayerWords, setFirstPlayerWords] = useState( [])
  const [secondPlayerWords, setSecondPlayerWords] = useState( [])
  const [firstPlayerLetters, setFirstPlayerLetters] = useState( [])
  const [secondPlayerLetters, setSecondPlayerLetters] = useState( [])
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const [activePlayer, setActivePlayer] = useState(true);
  const handleNextTurn = () => {
    // setActivePlayer(prevState => !prevState);
    if (activePlayer && firstPlayerLetters.length) {
      const word = [...firstPlayerLetters];
      setFirstPlayerWords(prev => [...prev, word]);
      setFirstPlayerLetters([]);
    } else if (!activePlayer && secondPlayerLetters.length) {
      const word = [...secondPlayerLetters];

      setSecondPlayerWords(prev => [...prev, word]);
      setSecondPlayerLetters([]);
    }
    setActivePlayer(prev => !prev);
  }

  const handlePlayerNameChange = (name) =>(e)=>name(e.target.value);



  return (
    <GameContext.Provider value={{
      firstPlayerLetters,
      setFirstPlayerLetters,
      secondPlayerLetters,
      setSecondPlayerLetters,
      modalIsOpen,
      setModalIsOpen,
      handlePlayerNameChange,
      activePlayer,
      setActivePlayer,
      handleNextTurn,
      firstPlayerWords,
      setFirstPlayerWords,
      secondPlayerWords,
      setSecondPlayerWords,
    }}>
      {children}
    </GameContext.Provider>
  )
}
