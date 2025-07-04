import React, {useContext, useState} from "react";
import classes from "./GridItem.module.css";
import {PlayerContext} from "./PlayerContext";

export default function GridItem({letter, row, col, activePlayer}) {
  const {
    setFirstPlayerLetters,
    setSecondPlayerLetters,
    firstPlayerLetters,
    secondPlayerLetters
  } = useContext(PlayerContext);

  const [active, setActive] = useState(false)
  const [value, setValue] = useState(letter)
  const handleActiveGridItem = () => {
    if (letter !== '') {
      setActive((prev) => !prev)
      // setPlayerLetters((prev) => [...prev, {row, col, letter: value}]);

      if (activePlayer) {
        setFirstPlayerLetters((prev) => [...prev, {row, col, letter: value}]);
      } else {
        setSecondPlayerLetters((prev) => [...prev, {row, col, letter: value}]);
      }
    }
    console.log(value)
    console.log(firstPlayerLetters)
    console.log(secondPlayerLetters)
  }



  const clearActiveGridItem = () => {
    setActive(false)

  }

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase().slice(0, 1);
    setValue(value);
    if (activePlayer) {
      setFirstPlayerLetters((prev) => [...prev, {row, col, letter: value}]);
    } else {
      setSecondPlayerLetters((prev) => [...prev, {row, col, letter: value}]);
    }


    // setPlayerLetters((prev) => [...prev, {row, col, letter: value}]);
  }

  /*
  const classes = className([
    classes.grid_item,                         ----> https://www.npmjs.com/package/classnames
    active ? classes.active : ''
  ]);
  */

  return (
    <div className={`${classes.grid_item} ${active ? classes.active : ''}`}
         onClick={handleActiveGridItem}>
      <input
        type="text"
        value={value}
        className={`${classes.input}`}
        disabled={letter !== ''}
        onChange={handleChange}
      />
    </div>
  );
}
