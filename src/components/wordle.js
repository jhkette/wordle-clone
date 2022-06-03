import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";

export default function Wordle({ solution, dictionary }) {
  // get values and functions from useWordle
  const {currentGuess,guesses,turn, isCorrect,handleKeyup, usedKeys, handleMouseDown} = useWordle(solution, dictionary);

  // addevent listener for keyup
  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    if (isCorrect) {
      console.log("congrats, you win");
      window.removeEventListener("keyup", handleKeyup);
    }
    if (turn > 5) {
      console.log("unlucky, out of guesses");
      window.removeEventListener("keyup", handleKeyup);
    }
    // remove event listener
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  return (
    <div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} onPress={(e) => handleMouseDown(e.target.textContent)}/>
    </div>
  );
}
