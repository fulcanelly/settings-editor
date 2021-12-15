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

  const [version, setVersion] = useState(0)
  
  return <div className="App">
    <header className="App-header">
      <div class="parent"> 
        <div child="child">
          <p>
            Select version
          </p>
        </div>
        <div class="box child">
          <select 
            class = "dropdown"
            id ='version-selector'
            onChange = {() => handleSelect(setVersion)}
            >
            {props.versions.map(version => <option value={version.number}>{version.text}</option>)}
          </select>
        </div>
        <div child="child">
          <p>
            Settings generator for {version}
          </p>
        </div>
        <SettingsList items = {[]}/>
      </div>
    </header>
  </div>
}


export default App;
