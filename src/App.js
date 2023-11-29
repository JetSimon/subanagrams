import {React, useState} from 'react'

import './App.css';
import SolutionBox from './components/SolutionBox.js'
import Logo from './components/Logo.js'

let data = {'startingWord': 'budgetary', 'solutions': [['gyrate', 'budget', 'grated'], ['retag', 'great', 'terga', 'budge', 'teary', 'gated', 'grate', 'debug', 'targe'], ['tare', 'gude', 'rate', 'geta', 'gate', 'arty', 'tear', 'tray']]}
let allSolutions = new Set();

for(let i = 0; i < data.solutions.length; i++) {
  for(let j = 0; j < data.solutions[i].length; j++) {
    allSolutions.add(data.solutions[i][j])
  }
}

let guesses = new Set();

function App() {

  const [guess, setGuess] = useState("");

  function handleOnKeyUp(e) {
    if(e.key === "Enter") {
      if(allSolutions.has(guess)) {
        guesses.add(guess);
      }
      
      setGuess("");
    }
  }

  function help() {
    alert("You have to guess subanagrams of the word.\nExample: in the word 'sponsorships' you have the chunk of letters 'ponso' which can be rearranged to subanagram 'snoop'.")
  }

  return (
    <div className="App">
      <button onClick={help} className="HelpButton">Help</button>
      <Logo></Logo>
      <div>your word is...</div>
      <h1>{data.startingWord}</h1>
      <div className="SolutionBoxHolder">
        {data.solutions.map((words) => <SolutionBox guesses={guesses} words={words}></SolutionBox>)}
      </div>
      <div>{guesses.size}/{allSolutions.size}</div>
      <input type="text" value={guess} onKeyUp={handleOnKeyUp} onChange={(e) => setGuess(e.target.value)}></input>
    </div>
  );
}

export default App;
