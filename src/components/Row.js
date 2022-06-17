import React from "react";

export default function Row({ guess, currentGuess, error }) {
  // if guess is a prop
  // map through guess l (the guess object) and i the index
  if (guess) {
    console.log(guess, "guess");
    return (
      <div className="row past">
        {/* map through guess color and key - which is the letter */}
        {guess.map((l, i) => (
          <div key={i} className={l.color}>
            {l.key}
          </div>
        ))}
      </div>
    );
  }
  // currentGuess is letters typed in - so if currentGuess
  if (currentGuess) {
    let letters = currentGuess.split("");
    console.log(letters, "letters");
    return (
      <div className={ error ? "row current wrong" : "row current"}>
        {/* map through letters */}
        {letters.map((letter, i) => (
          <div key={i} className="filled">
            {letter}
          </div>
        ))}
        {/* array - letters length - 5 -letters length */}
        {[...Array(5 - letters.length)].map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
