import React, {useContext, useState} from "react";
import classes from "./GridItem.module.css";
import {GameContext} from "./GameContext";

export default function GridItem({letter, row, col, activePlayer}) {
  const {
    setFirstPlayerLetters,
    setSecondPlayerLetters,
    selectedCells,
    setSelectedCells,
  } = useContext(GameContext);

  const [active, setActive] = useState(false)
  const [value, setValue] = useState(letter)


  const clearActiveGridItem = () => {
    setActive(false)
  }
  const isActive = selectedCells.some(cell => cell.row === row && cell.col === col);
  const isSameCell = (a, b) => a.row === b.row && a.col === b.col;

  const handleClick = () => {
    const letterObj = { row, col, letter: value };
    if (isActive) {
      setSelectedCells(selectedCells.filter(cell => !isSameCell(cell, { row, col })));
      if (activePlayer) {
        setFirstPlayerLetters(prev => prev.filter(l => !isSameCell(l, { row, col })));
      } else {
        setSecondPlayerLetters(prev => prev.filter(l => !isSameCell(l, { row, col })));
      }
    } else {
      setSelectedCells([...selectedCells, { row, col }]);
      if (activePlayer) {
        setFirstPlayerLetters(prev => [...prev, letterObj]);
      } else {
        setSecondPlayerLetters(prev => [...prev, letterObj]);
      }
    }
   };

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase().slice(-1);
    setValue(value);

    const updateLetters = (prev) => {

      const filtered = prev.filter(item => !(item.row === row && item.col === col));
      return [...filtered, {row, col, letter: value}];
    };

    if (activePlayer) {
      setFirstPlayerLetters(updateLetters);
    } else {
      setSecondPlayerLetters(updateLetters);
    }
    console.log(value)

  }

  /*
  const classes = className([
    classes.grid_item,                         ----> https://www.npmjs.com/package/classnames
    active ? classes.active : ''
  ]);
  */


  return (
    <label onClick={handleClick} >
      <input
        type="text"
        value={value}
        className={`${classes.grid_item} ${isActive ? classes.active : ''}`}
        // disabled={letter !== ''}
        readOnly={letter !== '' || active}
        onKeyDown={e => {
          const key = e.key.toUpperCase();
          if (/^[А-ЯЁЇІЄҐ]$/.test(key)) {
            setValue(key);
            handleChange({ target: { value: key } });
          }
        }}
      />
    </label>
  );
}
