import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";

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


class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      version: 0
    } 
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect() {
    var version = document.getElementById('version-selector').value
    this.setState({ version: version });
  }

  render() {
    return <div className="App">
      <header className="App-header">
        <p>
          Select version
        </p>
        
        <select 
          class = "dropdown"
          id='version-selector'
          onChange ={this.handleSelect}
          name="cars" >
          <option value={0}>beyond 1.3</option>
          <option value={1.3}>1.3</option>
          <option value={1.5}>1.5</option>
          
        </select>

        <p>
          Settings generator for {this.state.version}
        </p>
        <SettingsList items = {[]}/>
      </header>
    </div>
  }
}

export default App;
