
"use client"

import { useState } from "react"

export function CounterHistory() {

  const [history, setHistory] = useState<number[]>([0])
  const [message, setMessage] = useState("")

  function handleMessage(text: string){
    setMessage(text)
  }

  const current = history[history.length - 1]

  function handleIncrement() {
    setHistory(prev => {
      const newItem = [...prev, current + 1]
      handleMessage(`Adicionou ${current + 1}`)
      return newItem
    })
  }

  function handleDecrement() {
    setHistory(prev => [...prev, current - 1])
  }

  return (
    <div>
      <section className="flex p-8 gap-8 text-2xl">
        <button
          className="duration-75 transition-all hover:scale-125"
          onClick={handleIncrement}
        >
          +
        </button>
        <button
          className="duration-75 transition-all hover:scale-125"
          onClick={handleDecrement}
        >
          -
        </button>
      </section>

      <section>
        <p>{message}</p>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
