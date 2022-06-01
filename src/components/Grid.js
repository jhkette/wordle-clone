import React from "react";
import Row from "./Row";

export default function Grid({ currentGuess, guesses, turn }) {
  return (
    <div className="">
      {guesses.map((g, i) => {
        // if turn === i then pass in currentGuess as a prop
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} />;
        }
        // otherwise just return a row with index as key and guess as g
        return <Row key={i} guess={g} />;
      })}
    </div>
  );
}
