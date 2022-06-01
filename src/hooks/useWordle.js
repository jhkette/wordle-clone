import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0); // state for turn
  const [currentGuess, setCurrentGuess] = useState(""); // state for guess
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState(["hello"]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false); // state for if guess is correct

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    //   solutionArray - solution into array to split word
    let solutionArray = [...solution];
    // formattedGuess key is the letter and color is grey
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });
    console.log("formatting the guess", currentGuess);
    // check if foreach solutionArray[i] == l.key
    // then add color green to each color if this is true
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] == l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });
    // if solutionArray includes l.key and is not green it is in
    // letter array but not in place so make it yellow
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
      }
    });
    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setCurrentGuess("");
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if (key == "Enter") {
      if (turn > 5) {
        console.log("you used all your guesses");
        return;
      }
      if (history.includes(currentGuess)) {
        console.log("you already tried that word");
        return;
      }
      if (currentGuess.length !== 5) {
        console.log("word must be 5 chars long");
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key == "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup, addNewGuess };
};

export default useWordle;
