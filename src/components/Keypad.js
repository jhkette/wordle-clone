import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";

export default function Keypad({ usedKeys, onPress}) {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/letters")
      .then((res) => res.json())
      .then((json) => {
        setLetters(json);
      });
  }, []);


 
  return (
    <div className="keypad" >
      {letters &&
        letters.map((l) => {
          const color = usedKeys[l.key];
          return (
            <div key={l.key} className={color} onClick={onPress} >
              {l.key}
            </div>
          );
        })}
    </div>
  );
}
