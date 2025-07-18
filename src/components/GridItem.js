import React from "react";
import classes from "./GridItem.module.css";

export default function GridItem({letter, setLetters, row, col, activeCell, isActive, isHightlight, isDisabled}) {
  const isReadOnly = Boolean(letter);

  const handleChange = (e) => {
    const value = e.target.value.slice(-1);

    setLetters(row, col, value);
  }

  const handleSelectGridItem = () => {
    activeCell(row, col);
  }

  return (
    <div
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
