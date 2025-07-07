import React from "react";


export default function  PlayerNameInput ({value,onChange, ...props}) {


  return (
    <input
      type="text"
      placeholder={value}
      value={value}
      required={true}
      // onChange={(e) => setFirstPlayerName(e.target.value)}
      onChange={onChange}
      {...props}
    />
  )
};
