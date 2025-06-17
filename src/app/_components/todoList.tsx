"use client"

import { useState } from "react"

export function TodoList() {
    const [input, setInput] = useState("")
    const [list, setList] = useState<string[]>([])

    const addTarefa = () => {
        setList(prev => [...prev, input])
        setInput("")
        return
    }


    return (
        <div>
            <h1>ToDo List</h1>

            <div>
                <input
                    className="text-black"
                    type="text"
                    value={input}
                    placeholder="Digite uma tarefa"
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={addTarefa}>Cadastrar</button>
            </div>

            <section>
                <ul >
                    {
                        list.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))
                    }
                </ul>
            </section>
        </div>
    )
}