import { useEffect, useState } from "react";
import Wordle from "./components/wordle";

function App() {
  const [solution, setSolution] = useState(null);
  const [dictionary, setDictionary] = useState(null);
  // fetch solutions
  useEffect(() => {
   
    fetch("https://indigo-shark-sock.cyclic.app/solutions/solutions")
    
      .then((res) => res.json())
      .then((json) => {
        // random int between 0 & 14
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word);
      });
    fetch("https://indigo-shark-sock.cyclic.app/solutions/words")
      .then((res) => res.json())
      .then((dict) => {
        setDictionary(dict);
      });
    
  }, [setSolution, setDictionary]);


  return (
    <div className="App">
  
      <h1>Wordle</h1>
    
      {/* wordle solution added as prop */}
      <Wordle solution={solution} dictionary={dictionary} />
      <p className="note"><em>Nb. This is a wordle clone simply to see if I can develop it in React. The real one is over <a href="https://www.nytimes.com/games/wordle/index.html">here</a></em></p>
    </div>
  );
}

export default App;
