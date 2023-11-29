function HowTo(props) {
    return (
        <div className="HowToBackground">
            <div className="HowTo">
            <h3>What is a subanagram?</h3>
            <p>A subanagram is a contiguous subset of a word rearranged to form a new word. That's too many big words. Here is an example of one:</p>
            <div>s<span style={{'backgroundColor':'yellow'}}>ponso</span>rships → <span style={{'backgroundColor':'yellow'}}>ponso</span> → snoop <span style={{'color':'green', 'font-weight':'boldest'}}>✓</span></div>
            <p>And this is NOT a subanagram, because the letters need to all be from the same chunk of the word:</p>
            <div><span style={{'backgroundColor':'yellow'}}>s</span>ponsorsh<span style={{'backgroundColor':'yellow'}}>ips</span> → <span style={{'backgroundColor':'yellow'}}>s ips</span> → sips <span style={{'color':'red', 'font-weight':'boldest'}}>✗</span></div>
            <button className="button-4" onClick={props.onCloseClicked}>Close Help</button>
            </div>
        </div>
        
        
    )
}

export default HowTo;