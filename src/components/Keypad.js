import React from "react";


export default function Keypad({ usedKeys, onPress }) {

  
  const letters = [
    {"key": "q"},
    {"key": "w"},
    {"key": "e"},
    {"key": "r"},
    {"key": "t"},
    {"key": "y"},
    {"key": "u"},
    {"key": "i"},
    {"key": "o"},
    {"key": "p"},
    {"key": "⌫"},
    {"key": "a"},
    {"key": "s"},
    {"key": "d"},
    {"key": "f"},
    {"key": "g"},
    {"key": "h"},
    {"key": "j"},
    {"key": "k"},
    {"key": "l"},
    {"key": "z"},
    {"key": "x"},
    
    {"key": "c"},
    {"key": "v"},
    {"key": "b"},
    {"key": "n"},
    {"key": "m"},
    {"key": "⏎"}
  ]

  return (
    <div className="keypad">
      {
        letters.map((l) => {
          const color = usedKeys[l.key];
          return (
            <div key={l.key} className={color} onClick={onPress}>
              {l.key.toUpperCase()}
            </div>
          );
        })}
    </div>
  );
}
