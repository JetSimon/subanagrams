import React from 'react'
import WordBox from './WordBox.js'

function SolutionBox(props) {
    return (
        <div className="SolutionBox">
            <h3>{props.words[0].length} letter words</h3>
            <div className="WordBoxHolder">
                {props.words.map((word) => <WordBox key={word} hasGivenUp={props.hasGivenUp} guesses={props.guesses} word={word}></WordBox>)}
            </div>
        </div>
    )
}

export default SolutionBox;