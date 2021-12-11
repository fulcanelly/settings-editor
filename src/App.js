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


function App() {
  const [version, setVersion] = useState(0)
  return <div className="App">
    <header className="App-header">
      <p>
        Select version
      </p>
      
      <select 
        class = "dropdown"
        id='version-selector'
        onChange = {() => handleSelect(setVersion)}
        name="cars" >
        <option value={0}>beyond 1.3</option>
        <option value={1.3}>1.3</option>
        <option value={1.5}>1.5</option>
        
      </select>

      <p>
        Settings generator for {version}
      </p>
      <SettingsList items = {[]}/>
    </header>
  </div>
}


export default App;
