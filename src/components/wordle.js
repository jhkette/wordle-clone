import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";

export default function Wordle({ solution }) {
  // get values and functions from useWordle
  const { currentGuess, guesses, turn, isCorrect, handleKeyup } =
    useWordle(solution);

  // addevent listener for keyup
  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    // remove event listener
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  useEffect(() => {
    // console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  return (
    <div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
     
     
    </div>
  );
}
