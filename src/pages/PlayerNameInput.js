import React from "react";


export default function  PlayerNameInput ({value,onChange, ...props}) {


  return (
    <input
      type="text"
      placeholder="Player Name"
      value={value}
      required
      // onChange={(e) => setFirstPlayerName(e.target.value)}
      onChange={onChange}
      {...props}
    />
  )
};
