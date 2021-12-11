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


let genStateSetterCompact = 
  (setState, value) => 
    index => genStateSetter(setState, index, value)
  


export {
  LazyValue,
  genStateSetter,
  genStateSetterCompact
}



