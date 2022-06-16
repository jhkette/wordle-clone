import { useEffect, useState } from "react";
import Wordle from "./components/wordle";

function App() {
  const [solution, setSolution] = useState(null);
  const [dictionary, setDictionary] = useState(null);
  // fetch solutions
  useEffect(() => {
    fetch("https://fakeserver-j.herokuapp.com/solutions")
      .then((res) => res.json())
      .then((json) => {
        // random int between 0 & 14
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word);
      });
    fetch("https://fakeserver-j.herokuapp.com/words")
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
    </div>
  );
}

export default App;
