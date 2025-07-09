import React, {useContext, useState} from "react";
import classes from "./GridItem.module.css";
import {GameContext} from "./GameContext";

export default function GridItem({letter, setLetters, row, col, activePlayer}) {
  const {
    setFirstPlayerLetters,
    setSecondPlayerLetters,
  } = useContext(GameContext);
  const isReadOnly = Boolean(letter);


  const [active, setActive] = useState(false)
  const handleSelectGridItem = () => {
    setActive(true)
  }


  const clearActiveGridItem = () => {
    setActive(false)
  }

  const handleChange = (e) => {
    const value = e.target.value.slice(-1);

    setLetters(row, col, value);
  }

  return (
    <div
      className={`${classes.grid_item} ${active ? classes.active : ''}`}
      // onClick={handleActiveGridItem}
    >
      <input
        type="text"
        value={letter ? letter.toUpperCase() : letter}
        // onChange={handleChange}
        onClick={handleSelectGridItem}
        readOnly={isReadOnly}
        onChange={handleChange}
        className={`${classes.grid_item} ${active ? classes.active : ''}`}
      />
    </div>
  );
}


