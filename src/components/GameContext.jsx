import {createContext, useState} from "react";

export const GameContext = createContext()

export function GameProvider({children}) {
  const [firstPlayerWords, setFirstPlayerWords] = useState([])
  const [secondPlayerWords, setSecondPlayerWords] = useState([])
  const [firstPlayerLetters, setFirstPlayerLetters] = useState([])
  const [secondPlayerLetters, setSecondPlayerLetters] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [activePlayer, setActivePlayer] = useState(true);
  const handleNextTurn = () => {
    if (activePlayer && firstPlayerLetters.length) {
      setFirstPlayerWords(prev => [...prev, [...firstPlayerLetters]]);
      setFirstPlayerLetters([]);
    } else if (!activePlayer && secondPlayerLetters.length) {
      setSecondPlayerWords(prev => [...prev, [...secondPlayerLetters]]);
      setSecondPlayerLetters([]);
    }
    setActivePlayer(prev => !prev);

  };

  const handlePlayerNameChange = (name) => (e) => name(e.target.value);

  return (
    <GameContext.Provider value={{
      firstPlayerLetters,
      setFirstPlayerLetters,
      secondPlayerLetters,
      setSecondPlayerLetters,
      modalIsOpen,
      setModalIsOpen,
      activePlayer,
      setActivePlayer,
      firstPlayerWords,
      setFirstPlayerWords,
      secondPlayerWords,
      setSecondPlayerWords,
      handleNextTurn,
      handlePlayerNameChange,
    }}>
      {children}
    </GameContext.Provider>
  )
}
