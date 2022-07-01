import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

export default function Wordle({ solution, dictionary }) {
  // get values and functions from useWordle
  const {
    currentGuess,
    guesses,
    turn,
    isCorrect,
    handleKeyup,
    usedKeys,
    handleMouseDown,
    error,
  } = useWordle(solution, dictionary);
  const [showModal, setShowModal] = useState(false);

  // addevent listener for keyup
  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    // remove event listener
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  if (dictionary && solution) {
    return (
      <div className="main">
     
        <div className={error ? "error" : "error hide"}>{error}</div>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} error={error} />
        <Keypad
          usedKeys={usedKeys}
          onPress={(e) => handleMouseDown(e.target.textContent)}
        />
        {showModal && (
          <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
        )}
       
      </div>
    );
  } else {
    return <p>Loading....(please wait a few seconds as I'm using a free heroku server)</p>;
  }
}
