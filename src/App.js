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


function App(props) {
  const [version, setVersion] = useState(0)
  return <div className="App">
    <header className="App-header">
      <p>
        Select version
      </p>
      
      <select 
        class = "dropdown"
        id ='version-selector'
        onChange = {() => handleSelect(setVersion)}
        >
        {props.versions.map(version => <option value={version.number}>{version.text}</option>)}
      </select>

      <p>
        Settings generator for {version}
      </p>
      <SettingsList items = {[]}/>
    </header>
  </div>
}


export default App;
