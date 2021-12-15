import './App.css';
import './checkbox.css';

import { stringify } from 'yaml';
import React, { Component, useState } from "react";
import * as R from "ramda";
import {
  getDefaultOrState,
  genCompactMediatedStateSetter
} from './utils'
import mappings from './settings'

const emptyList = [{ name: "No known settings available for this version"}]


function newRestrictedInput(form, id, genSetter) {
  if (!form) { 
    return
  }

  const setter = genSetter(id);

  return R.cond([
    [R.equals("text"), R.always(<input id={id} value={getDefaultOrState(setter, form.default)} onChange={setter.getBoundStateSetter()}></input>)],
    [R.equals("int"), R.always(<input id={id} value={getDefaultOrState(setter, form.default)} onChange={setter.pack((value) => {
      let val = Number.parseInt(value)
      if (val < form.range.from) {
        return setter.setError()
      }
      setter.setState(val)
    })}></input>)],
    [R.equals("bool"), () => {
      let csetter = setter.withProperty("checked");
      return <label class="switch">    
        <input checked = {getDefaultOrState(csetter, form.default)} id={id} onClick={csetter.getBoundStateSetter()} type="checkbox"></input>
        <span class="slider"></span>
      </label>
    }
     
    ],
    [R.T, R.always()]
  ])(form?.type)
}


function whenPresent(item, stuff) {
  if (item) {
    return stuff
  }
  return null
}

function newConfigEntry(item, genSetter) {
  return <div class='child'>
      <h3>{item.name}</h3>
      {whenPresent(item.description, <p>{item.description}</p>)}
      {newRestrictedInput(item.form, item.name, genSetter)}
    </div>
}

function newSettingsList(items, genSetter) {
  return items.map(item => newConfigEntry(item, genSetter))
}


function handleSelect(setVersion, val) {
  setVersion(
    val ?? document.getElementById('version-selector').value
  )
}

function useState_(func, ...rest) {
  let [var_, setVar] = useState(...rest)
  return [var_, () => func(setVar)]
}

function App(props) {
  const [objState, setObjState] = useState({})
  const [version, setVersion] = useState_((...args) => {
    setObjState({})
    handleSelect(...args)
  }, 0)

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
        {newSettingsList(mappings[version] ?? emptyList, compact)}
        <div class='child'>
          <textarea value={stringify(objState)}></textarea>
        </div>
      </div>
    </header>
  </div>
}


export default App;
