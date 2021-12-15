import * as R from "ramda";



class LazyValue {
  constructor(provider) {
    this.provider = provider
  }

  get() {
    if (this.result) {
      return this.result
    } else {
      this.result = this.provider()
    }
    return this.result
  }

  transform(func) {
    return func(this.get())
  }

  static of(val) {
    return new LazyValue(val)
  }
}


class StateValueMediator {

  constructor(lazyValue, stateSetter, actualState)  {
    this.lazyValue = lazyValue
    this.stateSetter = stateSetter
    this.actualState = actualState
    this.property = "value"
  }

  setIfEmpty(state) {
    if (this.actualState) {
      return 
    }
    this.setState(state)
  }

  setError() {
  }

  private 
  remError() {

  }

  setState(state = this.getValue()) {
    this.remError()
    this.stateSetter(state)
  }

  setValue(value = '') {
    this.lazyValue.get()[this.property] = value
  }

  getValue() {
    return this.lazyValue.transform(it => it?.[this.property])
  }

  getBoundStateSetter() {
    console.log("giving bound state setter")
    return () => this.setState()
  }

  withProperty(property) {
    this.property = property
    return this
  }

  pack(next) {
    return () => next(this.getValue(), this.getBoundStateSetter())
  }
}


function getElementByIdLazy(index) {
  return LazyValue.of(() => document.getElementById(index))
}

function genStateSetter(setState, index, state) {
  let element = getElementByIdLazy(index)
  let lens = R.lensPath(index.split("."))
  return () => 
    setState(
      R.set(lens, element.transform(it => it.value), state) 
    )
  
}

function getMediatedStateSetter(setState, index, state) {
  let lens = R.lensPath(index.split("."))
  return new StateValueMediator(
    getElementByIdLazy(index), 
    value => setState(R.set(lens, value, state)),
    R.view(lens, state)
  )
}

let genStateSetterCompact = 
  (setState, value) => 
    index => genStateSetter(setState, index, value)
  

let genCompactMediatedStateSetter = 
  (setState, value) => 
    index => getMediatedStateSetter(setState, index, value)

export {
  LazyValue,
  genStateSetter,
  genStateSetterCompact,
  genCompactMediatedStateSetter
}



