import { useState } from "react";

const useWordle = (solution, dictionary) => {
  const [turn, setTurn] = useState(0); // state for turn
  const [currentGuess, setCurrentGuess] = useState(""); // state for guess
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false); // state for if guess is correct
  const [usedKeys, setUsedKeys] = useState({}); // {a: 'green', b: 'yellow'}
  const [error, setError] = useState(false); // {a: 'green', b: 'yellow'}

  const countFunc = (arr) => {
    const counts = {};
    for (const num of arr) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts;
  };

  // format a guess into an array of letter objects. This function is called
  // when the user presses enter and the guess is a valid guess
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    //   solutionArray - solution into array to split word
    let solutionArray = [...solution];

    // formattedGuess key is the letter and color is grey
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });
    // check if foreach solutionArray[i] == l.key
    // then add color green to each color if this is true
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        // solutionArray[i] = null;
      }
    });
    // if solutionArray includes l.key and is not green it is in
    // letter array but not in place so make it yellow
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    // if solutionArray includes l.key and is not green it is in
    // letter array but not in place so make it yellow
    formattedGuess.forEach((l, i) => {
      const c = {};
      if (solutionArray.includes(l.key) && l.color !== "green") {
        const sol = countFunc(solutionArray);
        for (var arr of formattedGuess) {
          // counts[num] = counts[num] ? counts[num] + 1 : 1;
          if (arr.color === "yellow" && arr.key === l.key) {
            c[l.key] = c[l.key] ? c[l.key] + 1 : 1;
          }
        }
        if (c[l.key] == null || c[l.key] < sol[l.key]) {
          formattedGuess[i].color = "yellow";
        }
        console.log(c, sol);
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
    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((l) => {
        const currentColor = prevUsedKeys[l.key];

        if (l.color === "green") {
          prevUsedKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          prevUsedKeys[l.key] = "yellow";
          return;
        }
        if (l.color === "grey" && currentColor !== ("green" || "yellow")) {
          prevUsedKeys[l.key] = "grey";
          return;
        }
      });

      return prevUsedKeys;
    });
    setCurrentGuess("");
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess (if the guess is valid)
  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        setError("you used all your guesses");
        setTimeout(() => {
          setError(false);
        }, 3000);

        return;
      }
      if (history.includes(currentGuess)) {
        setError("you already tried that word");
        setTimeout(() => {
          setError(false);
        }, 3000);
        return;
      }
      if (currentGuess.length !== 5) {
        setError("word must be 5 chars long");
        setTimeout(() => {
          setError(false);
        }, 3000);
        return;
      }

      if (dictionary.includes(currentGuess) === false) {
        setError("must be a word");
        setTimeout(() => {
          setError(false);
        }, 3000);
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === "Backspace") {
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
  const handleMouseDown = (text) => {
    if (/^[A-Za-z]$/.test(text)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + text;
        });
      }
    }
    if (text === "⌫") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    error,
    handleKeyup,
    handleMouseDown,
    addNewGuess,
  };
};

export default useWordle;
