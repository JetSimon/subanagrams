import {React, useState} from 'react'

import './App.css';
import SolutionBox from './components/SolutionBox.js'
import Logo from './components/Logo.js'
import HowTo from './components/HowTo.js'

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
  const [showingHelp, setShowingHelp] = useState(false);

  function getLevel() {
    let percentage = guesses.size / allSolutions.size;

    if(percentage >= 1.0) {
      return "anagramaster";
    }
    if(percentage >= 0.90) {
      return "genius";
    }
    if(percentage >= 0.75) {
      return "smarty";
    }
    if(percentage >= 0.5) {
      return "grammer";
    }
    if(percentage >= 0.33) {
      return "average";
    }
    if(percentage >= 0.25) {
      return "anagram andy";
    }
    if(percentage >= 0.10) {
      return "rookie";
    }
    
    return "beginner";
  }

  function handleGuess(e) {
    setGuess(e.target.value);
    let currentGuess = e.target.value.toLowerCase();

    if(allSolutions.has(currentGuess) && !guesses.has(currentGuess)) {
      guesses.add(currentGuess);
      setGuess("");
    }
  }

  return (
    <div className="App">
      {showingHelp && <HowTo onCloseClicked={() => setShowingHelp(false)}></HowTo>}
      <div style={{'display':!showingHelp ? "block" : "none"}}>
        <button className="HelpButton button-4" onClick={() => setShowingHelp(true)}>?</button>
        <Logo></Logo>
        <div>your word is...</div>
        <h1>{data.startingWord}</h1>
        <div className="SolutionBoxHolder">
          {data.solutions.map((words) => <SolutionBox guesses={guesses} words={words}></SolutionBox>)}
        </div>
        <div class="ScoreArea">
          <div>{guesses.size}/{allSolutions.size} subs</div>
          <div>level: {getLevel()}</div>
        </div>
        <input placeholder="Enter a guess..." type="text" value={guess} onChange={handleGuess}></input>
        <div className="AutoSubmitInstructions">your guess will be autosubmitted if it is correct</div>
      </div>
    </div>
  );
}

export default App;
