import {React, useState} from 'react'

function WordBox(props) {
    return (
        props.guesses.has(props.word) || props.hasGivenUp ?
        <div style={{"color": !props.guesses.has(props.word) && props.hasGivenUp ? "red" : ""}} className="WordBox">{props.word}</div>
        :
        <div className="WordBox">{new Array(props.word.length + 1).join("_")}</div>
    )
}

export default WordBox;