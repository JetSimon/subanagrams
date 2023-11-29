import {React, useState} from 'react'

import './App.css';
import SolutionBox from './components/SolutionBox.js'
import Logo from './components/Logo.js'
import HowTo from './components/HowTo.js'

let data = {'startingWord': 'umbellate', 'solutions': [['ballet'], ['label', 'blume', 'umbel'], ['late', 'tall', 'bell', 'tela', 'tale', 'tael', 'teal', 'leal']]}

let currentWord = localStorage.getItem("word");
let started = localStorage.getItem("started");

if(currentWord == null || currentWord !== data.startingWord) {
  localStorage.setItem("word", data.startingWord);
  localStorage.setItem("guesses", null);
  started = false;
}

let allSolutions = new Set();

for(let i = 0; i < data.solutions.length; i++) {
  for(let j = 0; j < data.solutions[i].length; j++) {
    allSolutions.add(data.solutions[i][j])
  }
}

let guesses = loadGuesses() ?? new Set();

let autosubmit = false;

function loadGuesses() {
  try {
    return new Set(JSON.parse(localStorage.getItem("guesses")));
  }
  catch {
    return new Set();
  }
}

function saveGuesses() {
  localStorage.setItem("guesses", JSON.stringify(Array.from(guesses)));
}

function App() {

  const [guess, setGuess] = useState("");
  const [showingHelp, setShowingHelp] = useState(false);
  const [hasStarted, setHasStarted] = useState(started);

  function startGame() {
    started = true;
    setHasStarted(started);
    localStorage.setItem("started", started);
    localStorage.setItem("startDateTime", new Date());
  }

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

  function handleOnKeyUp(e) {
    if(e.key === "Enter") {
      let currentGuess = e.target.value.toLowerCase();

      if(allSolutions.has(currentGuess) && !guesses.has(currentGuess)) {
        guesses.add(currentGuess);
        setGuess("");
        saveGuesses();
      }
    }
  }

  function handleGuess(e) {
    setGuess(e.target.value);

    if(!autosubmit) {
      return;
    }

    let currentGuess = e.target.value.toLowerCase();

    if(allSolutions.has(currentGuess) && !guesses.has(currentGuess)) {
      guesses.add(currentGuess);
      setGuess("");
      saveGuesses();
    }
  }

  return (
    <div className="App">
      {<HowTo showingHelp={showingHelp} onCloseClicked={() => setShowingHelp(false)}></HowTo>}
      <div style={{'display':!showingHelp && hasStarted? "block" : "none"}}>
        <button className="HelpButton button-4" onClick={() => setShowingHelp(true)}>?</button>
        <Logo></Logo>
        <div>your word is...</div>
        <h1>{data.startingWord}</h1>
        <div className="SolutionBoxHolder">
          {data.solutions.map((words) => <SolutionBox key={words[0].length} guesses={guesses} words={words}></SolutionBox>)}
        </div>
        <div className="ScoreArea">
          <div style={{"fontSize":"large", "margin":"5px"}}>{guesses.size}/{allSolutions.size} guessed</div>
          <div>level: {getLevel()}</div>
        </div>
        <input placeholder="Enter a guess..." type="text" value={guess} onKeyUp={handleOnKeyUp} onChange={handleGuess}></input>
        {<div className="AutoSubmitInstructions">{autosubmit ? "your guess will be autosubmitted if it is correct" : "press enter to submit your guess"}</div>}
      </div>
      <div style={{'display':!showingHelp && !hasStarted? "block" : "none", "height":"100%"}}>
        <button className="HelpButton button-4" onClick={() => setShowingHelp(true)}>?</button>
        <Logo></Logo>
        <div className="MainMenu">
          <h2>{new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</h2>
          <button className="button-4" onClick={startGame}>Begin</button>
        </div>
      </div>
    </div>
  );
}

export default App;
