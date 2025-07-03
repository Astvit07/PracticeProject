import React, {useState} from "react";
import classes from "./GridItem.module.css";

export default function GridItem({ letter }) {
  
  const [active, setActive] = useState(false)
  const handleActiveGridItem = () => {
    setActive((prev)=>!prev)
  }
  const clearActiveGridItem = () => {
    setActive(false)
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
      {letter}
    </div>
  );
}