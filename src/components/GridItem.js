import React, {useContext, useState} from "react";
import classes from "./GridItem.module.css";
import {GameContext} from "./GameContext";

export default function GridItem({letter, row, col, activePlayer}) {
  const {
    setFirstPlayerLetters,
    setSecondPlayerLetters,
  } = useContext(GameContext);

  const [active, setActive] = useState(false)
  const [value, setValue] = useState(letter)
  // const handleActiveGridItem = () => {
  //   if (letter !== '') {
  //     setActive((prev) => !prev)
  //     // setPlayerLetters((prev) => [...prev, {row, col, letter: value}]);
  //
  //     if (activePlayer) {
  //       setFirstPlayerLetters((prev) => [...prev, {row, col, letter: value}]);
  //     } else {
  //       setSecondPlayerLetters((prev) => [...prev, {row, col, letter: value}]);
  //     }
  //   }
  //   console.log(value)
  //   console.log(firstPlayerLetters)
  //   console.log(secondPlayerLetters)
  // }


  const clearActiveGridItem = () => {
    setActive(false)
  }

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

    // if (activePlayer) {
    //   setFirstPlayerLetters((prev) => [...prev, {row, col, letter: value}]);
    // } else {
    //   setSecondPlayerLetters((prev) => [...prev, {row, col, letter: value}]);
    // }
    console.log(value)

    // setPlayerLetters((prev) => [...prev, {row, col, letter: value}]);
  }

  /*
  const classes = className([
    classes.grid_item,                         ----> https://www.npmjs.com/package/classnames
    active ? classes.active : ''
  ]);
  */

  return (
    <div
      // className={`${classes.grid_item} ${active ? classes.active : ''}`}
      // onClick={handleActiveGridItem}
    >
      <input
        type="text"
        value={value}
        // className={classes.grid_item}
        className={`${classes.grid_item} ${active ? classes.active : ''}`}

        // className={`${classes.input}`}
        disabled={letter !== ''}
        onChange={handleChange}
        // todo 5 . Додати перевірку (івент) чи клітинка заопвнена і по ньму робив хайлайт клітинок
      />
    </div>
  );
}


//todo 2. ввод  в інпут через онкейдаун або через онуей пресс
