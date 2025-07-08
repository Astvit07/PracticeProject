import {createContext, useState} from "react";

export const GameContext = createContext()
export function GameProvider({children}){
  const [firstPlayerWords, setFirstPlayerWords] = useState( [])
  const [secondPlayerWords, setSecondPlayerWords] = useState( [])
  const [firstPlayerLetters, setFirstPlayerLetters] = useState( [])
  const [secondPlayerLetters, setSecondPlayerLetters] = useState( [])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [activePlayer, setActivePlayer] = useState(true);

  const [selectedCells, setSelectedCells] = useState([]);
  const handleNextTurn = () => {
    if (selectedCells.length >= 3) {
      if (activePlayer && firstPlayerLetters.length) {
        setFirstPlayerWords(prev => [...prev, firstPlayerLetters]);
        setFirstPlayerLetters([]);
      } else if (!activePlayer && secondPlayerLetters.length) {
        setSecondPlayerWords(prev => [...prev, secondPlayerLetters]);
        setSecondPlayerLetters([]);
      }
    }
    setSelectedCells([]);
    setActivePlayer(prev => !prev);
    console.log('handleNextTurn');
  };


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
      selectedCells,
      setSelectedCells
    }}>
      {children}
    </GameContext.Provider>
  )
}
