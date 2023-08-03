import React, { useState } from "react"
import "./App.css"

function App() {
  const [answer, setAnswer] = useState("")

  function calculatedMath(e){
    if(answer === "" && (e.target.value === "0" || e.target.value === "00" || e.target.value === "+" || e.target.value === "/" || e.target.value === "*" || e.target.value === "%")){
      setAnswer("")
    }else{
      setAnswer(answer + e.target.value)
    }
  }
 
  function calculate(str){
    let arr = []
    let string = ""
    let bool, b = 0
    let float
    
    if(str[0] === "-"){
      b = 1; bool = true
    }
    
    for (let i=b; i<str.length; i++){
      const char = str.charAt(i)
      
      if(!isNaN(char) || char === "."){
        if(char === "."){
          float = true
        }
        string += char
      }else{
        if(arr.length === 0 && bool){
          arr.push(parseInt("-" + string))
        }else if(float){
          arr.push(parseFloat(string))
        }
        else{
          arr.push(parseInt(string))
        }
          
        arr.push(char)
        string = ""
      
      }
    }
    if(float){
      arr.push(parseFloat(string))
    }else{
      if(arr.length === 0 && bool){
        arr.push(parseInt("-" + string))
      }else{
        arr.push(parseInt(string))
      }
    }
    return arr
  }

  function calculatedOutput(){
    if(answer && answer !== "-"){
      const str = answer
      const array = calculate(str)
      
      const symbol = ["%", "/", "*", "+", "-"]

      if(array.length > 1){
        for (let sym of symbol){
          if(array.includes(sym)){
            let res
            for (let i=0; i<array.length; i++){
              if(sym === array[i]){
                switch (array[i]) {
                  case '%':
                    res = array[i-1] % array[i+1]
                    break;
                  case '/':
                    res = array[i-1] / array[i+1]
                    break;
                  case '*':
                    res = array[i-1] * array[i+1]
                    break;
                  case '+':
                    res = array[i-1] + array[i+1]
                    break;
                  case '-':
                    res = array[i-1] - array[i+1]
                    break;
                  default:
                    return res
                }
                array.splice(i-1,3,res)
                i -= 1
              }
            }
          }
        }
        setAnswer(array)
      }else{
        setAnswer(array.join(""))
      }

    }else{
      setAnswer(answer)
    }
  }

  return (
    <div className="app-container">
      <div className="top-container">
        <h1>Calculator App</h1>
      </div>
      <div className="bottom-container">
        <div className="calculator-container">
          <div className="digits-display">{answer}</div>
          <div className="buttons-container">
            <button onClick={() => setAnswer("")}>C</button>
            <button value="%" onClick={calculatedMath}>%</button>
            <button onClick={() => setAnswer(answer.slice(0, answer.length-1))}>{`<`}</button>
            <button value="/" onClick={calculatedMath}>/</button>
          </div>
          <div className="buttons-container">
            <button value="7" onClick={calculatedMath}>7</button>
            <button value="8" onClick={calculatedMath}>8</button>
            <button value="9" onClick={calculatedMath}>9</button>
            <button value="*" onClick={calculatedMath}>*</button>
          </div>
          <div className="buttons-container">
            <button value="4" onClick={calculatedMath}>4</button>
            <button value="5" onClick={calculatedMath}>5</button>
            <button value="6" onClick={calculatedMath}>6</button>
            <button value="-" onClick={calculatedMath}>-</button>
          </div>
          <div className="buttons-container">
            <button value="1" onClick={calculatedMath}>1</button>
            <button value="2" onClick={calculatedMath}>2</button>
            <button value="3" onClick={calculatedMath}>3</button>
            <button value="+" onClick={calculatedMath}>+</button>
          </div>
          <div className="buttons-container" style={{marginBottom:"0px"}}>
            <button value="00" onClick={calculatedMath}>00</button>
            <button value="0" onClick={calculatedMath}>0</button>
            <button value="." onClick={calculatedMath}>.</button>
            <button onClick={calculatedOutput}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
