import React from "react";

export default function Row({ guess, currentGuess }) {
  // if guess is a prop
  // map through guess l (the guess object) and i the index
  if (guess) {
    console.log(guess, 'guess')
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

  if (currentGuess) {
    let letters = currentGuess.split("");
    console.log(letters, 'letters')
    return (
      <div className="row current">
        {letters.map((letter, i) => (
          <div key={i} className="filled">
            {letter}
          </div>
        ))}
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
