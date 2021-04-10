import { Input } from '../../components/input/Input.jsx'
import React, { useState } from 'react';

export default function App() {
  const [state, setState] = useState({ isFinished: false, wpm: 0, raw: 0, accuracy: 0, text: "", author: "" })

  if (state.isFinished == false)
    return (
      <div>
        <Input text="Loading..." author="Loading..." finish={(finishState) => {
          setState({ isFinished: true, wpm: finishState.wpm, raw: finishState.raw, accuracy: finishState.accuracy, text: finishState.text, author: finishState.author })
          console.log("finished")
        }} />
      </div>
    )
  else {
    console.log("rendering")
    return (
      <div>
        <h1>WPM: {state.wpm}</h1>
        <h1>Raw: {state.raw}</h1>
        <h1>Accuracy: {state.accuracy}</h1>
        <h1>Author: {state.author}</h1>

        <button onClick={() => {
          window.location.reload()
        }}>Next Game</button>
      </div>
    )
  }
}