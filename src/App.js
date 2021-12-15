import logo from './logo.svg';
import './App.css';
import React, { Component, useState } from "react";

class SettingsList extends Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    );
  }
}


function handleSelect(setVersion) {
  setVersion(
    document.getElementById('version-selector').value
  )
}


function useState_(func, ...rest) {
  let [var_, setVar] = useState(...rest)
  return [var_, () => func(setVar)]
}

function App(props) {
  const [version, setVersion] = useState_(handleSelect, 0)
  const [objState, setObjState] = useState({})

  let compact = genCompactMediatedStateSetter(setObjState, objState)

  return <div className="App">
    <header className="App-header">
      <div class="parent"> 
        <div class="child">
          <p>Config editor for {version} version</p> 
          <select class = "dropdown" id ='version-selector' onChange = {setVersion}>
            {props.versions.map(version => <option value={version.number}>{version.text}</option>)}
          </select>
        </div>
        {newSettingsList(form, compact)}
        <div class='child'>
          <textarea value={stringify(objState)}></textarea>
        </div>
        
      </div>
    </header>
  </div>
}


export default App;
