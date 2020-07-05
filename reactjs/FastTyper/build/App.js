import React, {useState,useEffect, useRef} from 'react'
import './style.css'

export default function App() {

  const GAME_TIME = 15
  const [text, setText] =useState('')
  const [timer, setTimer] = useState(GAME_TIME)
  const [isGameOn, setIsGameOn] = useState(false)
  const [wc, setWc] = useState(0)
  const [disable, setDisable] = useState(false)
  const txtBox = useRef(null)
  
  function handleChange(e){
    const {value} = e.target
    setText(()=>value)
  }

  const countWords = ()=>{
    return text===''?0:text.match(/\S+/g).length
  }

  useEffect(()=>{
    if(isGameOn && timer>0){
      txtBox.current.focus()
      setTimeout(()=>{setTimer(timer=>timer-1)},1000)
    }
    if(timer===0){
      setIsGameOn(false)
      setWc(countWords)
      setDisable(false)
    }
  },[timer,isGameOn])

  function startGame(){
    setIsGameOn(()=>true)
    setTimer(GAME_TIME)
    setText('')
    setWc(0)
    setDisable(true) 
    
  }

  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea 
        ref={txtBox}
        rows='15' 
        cols='100'
        name='text'
        value={text}
        onChange={handleChange}
        disabled={!disable}
        />
      <h4>Time remaining : {timer}</h4>
      <button 
        onClick={startGame}
        disabled={disable}>START</button>
      <h3>Word Count : {wc}</h3>
    </div>
  )
}
