function HowTo(props) {
    return (
        <div style={{"opacity": props.showingHelp ? 1 : 0, "visibility": props.showingHelp ? "visible" : "hidden"}} className={props.showingHelp ? "HowToBackground fade-in" : "HowToBackground"}>
            <div className="HowTo">
            <h3>What is a subanagram?</h3>
            <p>A subanagram is a contiguous subset of a word rearranged to form a new word.<br></br><br></br>Here is an example of one:</p>
            <div>
                <p>s<span style={{'backgroundColor':'yellow'}}>ponso</span>rships</p>
                <p><span style={{'visibility':'hidden'}}>s</span><span style={{'backgroundColor':'yellow'}}>ponso</span></p>
                <p>snoop <span style={{'color':'green', 'fontWeight':'boldest'}}>✓</span></p></div>
            <p>And this is <span style={{'fontWeight':'bold'}}>not</span> a subanagram, because the letters need to all be from the same chunk of the word:</p>
            <div>
                <p><span style={{'backgroundColor':'yellow'}}>s</span>ponsorsh<span style={{'backgroundColor':'yellow'}}>ips</span></p>
                <p><span style={{'backgroundColor':'yellow'}}>s</span><span style={{'visibility':'hidden'}}>ponshors</span><span style={{'backgroundColor':'yellow'}}>ips</span></p>
                <p>sips <span style={{'color':'red', 'fontWeight':'boldest'}}>✗</span></p></div>
            <button className="button-4" onClick={props.onCloseClicked}>Okay</button>
            </div>
        </div>
        
        
    )
}

export default HowTo;