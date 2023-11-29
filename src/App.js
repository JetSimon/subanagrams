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
      <div>level: {getLevel()}</div>
      <input placeholder="Enter a guess..." type="text" value={guess} onChange={handleGuess}></input>
    </div>
  );
}

export default App;
