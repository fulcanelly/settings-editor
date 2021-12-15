import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class Version {
  constructor(number, text) {
    this.number = number 
    this.text = text 
  }
}


function version(x, y) {
  return new Version(x, y)
}

let versions = [
  version(0, "beyond 1.3"),
  version(1.3, "1.3"),
  version(1.4, "latest")
]

ReactDOM.render(
  <React.StrictMode>
    <App versions ={versions} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
