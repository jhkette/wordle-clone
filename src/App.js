import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

function App() {
  const [solution, setSolution] = useState(null);
  const [dictionary, setDictionary] = useState(null);
  // fetch solutions
  useEffect(() => {
    fetch("http://localhost:3001/solutions")
      .then((res) => res.json())
      .then((json) => {
        // random int between 0 & 14
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word);
      });
      fetch("http://localhost:3001/words")
      .then((res) => res.json())
      .then((dict) => {
      
        setDictionary(dict);
      });
  }, [setSolution, setDictionary]);


  return (
  
    <div className="App">
      <h1>Wordle</h1>
      {/* wordle solution added as prop */}
      {solution && <Wordle solution={solution} dictionary={dictionary}/>}
    </div>
  );
}

export default App;
