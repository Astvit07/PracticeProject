import React, {useState} from "react";
import classes from "./GridItem.module.css";

export default function GridItem({ letter }) {

  const [active, setActive] = useState(false)
  const [value, setValue] = useState(letter)
  const handleActiveGridItem = () => {
    setActive((prev)=>!prev)
  }
  const clearActiveGridItem = () => {
    setActive(false)
  }

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase().slice(0,1);
    setValue(value);
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
        className={classes.input}
        readOnly={letter !== ''}
        onChange={handleChange}
      />
    </div>
  );
}
