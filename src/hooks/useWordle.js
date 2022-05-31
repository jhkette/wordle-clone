import { useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0) 
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([]) // each guess is an array
  const [history, setHistory] = useState(['hello']) // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false)

  // format a guess into an array of letter objects 
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
      let solutionArray = [...solution]
      let formattedGuess = [...currentGuess].map((l) => {
        return {key: l, color: 'grey'}
      })
      console.log('formatting the guess', currentGuess)
  }

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = () => {

  }

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({key}) => {
    if (key == 'Enter'){
        if (turn > 5){
            console.log('you used all your guesses')
            return
        }
        if(history.includes(currentGuess)){
            console.log('you already tried that word')
            return
        }
        if(currentGuess.length !== 5){
            console.log('word must be 5 chars long')
            return
        }

        formatGuess()
    }
      if (key == 'Backspace'){
          setCurrentGuess((prev) => {
              return prev.slice(0, -1)
          })
          return
      }
      if (/^[A-Za-z]$/.test(key)) {
          if(currentGuess.length < 5){
              setCurrentGuess((prev) => {
                return prev + key
              })
          }
      }


  }

  return {turn, currentGuess, guesses, isCorrect, handleKeyup}
}

export default useWordle