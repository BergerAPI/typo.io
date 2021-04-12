import { Input } from '../../components/input/Input.jsx'
import { Line } from "react-chartjs-2";
import React, { useState } from 'react';

export default function App() {
  const [state, setState] = useState({ isFinished: false, wpm: 0, raw: 0, accuracy: 0, text: "", author: "", labels: [] })

  if (state.isFinished == false)
    return (
      <div>
        <Input text="Loading..." author="Loading..." finish={(finishState) => {
          let prev = []
          let temp = finishState.wpmData.slice(1, finishState.wpmData.legend)

          for (let c in temp)
              prev.push(parseInt(c) + 1)

          setState({ isFinished: true, wpm: finishState.wpm, raw: finishState.raw, accuracy: finishState.accuracy, text: finishState.text, author: finishState.author, wpmData: temp, rawData: finishState.rawData, labels: prev })
        }} />
      </div>
    )
  else {
    return (
      <div style={{ fontFamily: "monospace", fontSize: "20px" }}>
        <p>WPM: {state.wpm}</p>
        <p>Raw: {state.raw}</p>
        <p>Accuracy: {state.accuracy}</p>
        <p>Author: {state.author}</p>

        <Line data={{
          datasets: [
            {
              label: "WPM",
              data: state.wpmData,
              borderWidth: 1,
              fill: true,
              borderColor: "yellow",
              id: "wpm"
            },
            {
              label: "Raw",
              data: state.raw,
              borderWidth: 1,
              fill: true,
              borderColor: "grey",
              id: "raw"
            }
          ],
          labels: state.labels,
        }} options={{
          legend: {
            display: false,
            labels: {},
          },
          animation: {
            duration: 250,
          },
          responsive: true,
        }}
        />

        <button onClick={() => {
          window.location.reload()
        }}>Next Game</button>
      </div>
    )
  }
}