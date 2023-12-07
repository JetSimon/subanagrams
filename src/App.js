import {React, useState} from 'react'

import './App.css';
import SolutionBox from './components/SolutionBox.js'
import Logo from './components/Logo.js'
import HowTo from './components/HowTo.js'

let data = {'startingWord': 'cosmist', 'solutions': [['sitcoms'], ['moists', 'osmics'], ['mists', 'stims', 'micos', 'smits', 'osmic', 'misos'], ['smit', 'sims', 'stim', 'mocs', 'coms', 'miss', 'miso', 'isms', 'mist']]}

let currentWord = localStorage.getItem("word");
let started = JSON.parse(localStorage.getItem("started"));
let hasPlayed = JSON.parse(localStorage.getItem("hasPlayed"));
let gaveUp = JSON.parse(localStorage.getItem("gaveUp"));

let pressedGiveUpOnce = false;

if(currentWord == null || currentWord !== data.startingWord) {
  localStorage.setItem("word", data.startingWord);
  localStorage.setItem("guesses", null);
  localStorage.setItem("gaveUp", false);
  started = false;
  gaveUp = false;
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
  const [showingHelp, setShowingHelp] = useState(() => {
    if(!hasPlayed) {
      localStorage.setItem("hasPlayed", true);
      return true;
    }

    return false;
  });
  const [hasStarted, setHasStarted] = useState(started);
  const [hasGivenUp, setHasGivenUp] = useState(gaveUp);

  const [isShaking, setShaking] = useState(false);

  const [giveUpText, setGiveUpText] = useState("Give Up");
  const [shareText, setShareText] = useState("Share Results");

  function shake() {
    setShaking(true);
    setTimeout(() => setShaking(false), 100);
  }

  function giveUp() {

    if(!pressedGiveUpOnce) {
      pressedGiveUpOnce = true;
      setGiveUpText("For Sure?");
      setTimeout(() => {
        setGiveUpText("Give Up");
        pressedGiveUpOnce = false;
      }, 10000);
      return;
    }

    setHasGivenUp(true);
    localStorage.setItem("gaveUp", true);
    localStorage.setItem("endDateTime", new Date());
  }

  function startGame() {
    started = true;
    setHasGivenUp(false);
    setHasStarted(started);
    localStorage.setItem("started", started);
    localStorage.setItem("startDateTime", new Date());
  }

  function getFinalTime() {
    let start = new Date(localStorage.getItem("startDateTime"));
    let end = new Date(localStorage.getItem("endDateTime"));

    if(!start || !end) {
      return "???";
    }

    let diff = end.getTime() - start.getTime();

    let hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    let mins = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);

    let seconds = Math.floor(diff / (1000));
    diff -= seconds * (1000);

    let res = "";

    if(hours > 0) {
      res += hours + " hours ";
    }

    if(mins > 0) {
      res += mins + " minutes ";
    }

    res += seconds + " seconds"

    return res;
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

  function getShareString() {
    let results = `Subanagrams ${new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}\n\n`;
    for(let i = 0; i < data.solutions.length; i++) {
      let length = data.solutions[i][0].length;
      let words = data.solutions[i];
      results += length + " "
      for(let j = 0; j < words.length; j++) {
        let word = words[j];
        
        results += guesses.has(word) ? "🟩" : "🟥";
      }
      results += "\n";
    }

    results += "\n" + guesses.size + " out of " + allSolutions.size + " guessed\nlevel: " + getLevel();
    results += "\nplayed for: " + getFinalTime();
    results += "\n\nPLAY HERE: " + window.location.href;
    navigator.clipboard.writeText(results);
    setShareText("Copied!");
    setTimeout(() => setShareText("Share Results"), 500);
  }

  function handleOnKeyUp(e) {
    if(e.key === "Enter") {

      let currentGuess = guess.toLowerCase();
      if(e.target) {
        currentGuess = e.target.value.toLowerCase();
      }
      
      if(allSolutions.has(currentGuess) && !guesses.has(currentGuess)) {
        guesses.add(currentGuess);
        setGuess("");
        saveGuesses();

        if(guesses.size / allSolutions.size >= 1) {
          pressedGiveUpOnce = true;
          giveUp();
        }
      } else {
        shake();
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
    <div className={isShaking ? "App shake" : "App"}>
      {<HowTo showingHelp={showingHelp} onCloseClicked={() => setShowingHelp(false)}></HowTo>}
      <div style={{'display':!showingHelp && hasStarted? "block" : "none"}}>
        <button className="HelpButton button-4" onClick={() => setShowingHelp(true)}>?</button>
        {!hasGivenUp && <button onClick={giveUp} className="red-button GiveUpButton button-4">{giveUpText}</button>}
        <Logo></Logo>
        <div>your word is...</div>
        <h1>{data.startingWord}</h1>
        <div className="SolutionBoxHolder">
          {data.solutions.map((words) => <SolutionBox key={words[0].length} hasGivenUp={hasGivenUp} guesses={guesses} words={words}></SolutionBox>)}
        </div>
        <div className="ScoreArea">
          <div style={{"fontSize":"large", "margin":"5px"}}>{guesses.size}/{allSolutions.size} guessed</div>
          <div>level: {getLevel()}</div>
        </div>
        <div className={hasGivenUp ? "InputArea hidden" : "InputArea shown"}>
          <input placeholder="Enter a guess..." type="text" value={guess} onKeyUp={handleOnKeyUp} onChange={handleGuess}></input>
          <button onClick={() => handleOnKeyUp({'key':'Enter'})} className="button-4 green-button">Go</button>
        </div>
        {<div style={{"display": hasGivenUp ? "none" : "block"}} className="AutoSubmitInstructions">{autosubmit ? "your guess will be autosubmitted if it is correct" : "you can press enter to submit your guess"}</div>}
        <div style={{"display": hasGivenUp ? "block" : "none", "marginTop":"16px"}} >
          <div className="TimeSpent">Played for {getFinalTime()}</div>
          <button className="ShareButton button-4" onClick={getShareString}>{shareText}</button>
        </div>
        
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
