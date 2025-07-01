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
  return (
    <div className={`${classes.grid_item} ${active ? classes.active : ''}`}
         onClick={handleActiveGridItem}>
      {letter}
    </div>
  );
}