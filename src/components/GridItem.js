import React, {useContext, useState} from "react";
import classes from "./GridItem.module.css";
import {GameContext} from "./GameContext";

export default function GridItem({letter, setLetters, row, col, activePlayer, cellIsActive, isActive, isHightlight, isDisabled}) {
  const {
    setFirstPlayerLetters,
    setSecondPlayerLetters,
  } = useContext(GameContext);

  const isReadOnly = Boolean(letter);


  const handleChange = (e) => {
    const value = e.target.value.slice(-1);

    setLetters(row, col, value);
  }

  const handleSelectGridItem = () => {
    cellIsActive(row, col);
  }

  return (
    <div
      // className={`${classes.grid_item} ${isActive ? classes.active : ''}`}
      // onClick={handleActiveGridItem}
    >
      <input
        type="text"
        value={letter ? letter.toUpperCase() : letter}
        // onChange={handleChange}
        onClick={handleSelectGridItem}
        readOnly={isReadOnly}
        onChange={handleChange}
        disabled={isDisabled}
        className={`${classes.grid_item} ${isActive ? classes.active : ''} ${isHightlight ? classes.highlight : ''}`}
      />
    </div>
  );
}
