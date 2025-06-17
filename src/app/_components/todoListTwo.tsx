
"use client"


import { useState } from "react"

type TarefasProps = {
    name: string;
    done: boolean;
}

export function TodoListTwo() {
    const [inputTarefa, setInputTarefa] = useState<string>("")
    const [tarefas, setTarefas] = useState<TarefasProps[]>([])
    const [editTask, setEditTask] = useState<number | null>(null)

    const AddTarefa = () => {
        if (inputTarefa.trim() === "") {
            alert("Por favor, preencha o campo.")
            return
        }

        if (editTask !== null) {
            const updatedList = [...tarefas]
            updatedList[editTask].name = inputTarefa
            setTarefas(updatedList)
            setEditTask(null)
        } else {
            setTarefas(prev => [...prev, {name: inputTarefa, done: false}])
        }

        setInputTarefa("")
    }

    // const RemoveTarefa = (item: string) => {
    //     setTarefas(tarefas.filter(prev => prev !== item))
    // }

     const RemoveTarefa = (index:number) => {
        setTarefas(tarefas.filter((_, i) => i !== index))
    }

    
    const EditIndex = (index: number) => {
        setEditTask(index)
        setInputTarefa(tarefas[index].name)
    }

    const ConcluiTarefa = (index:number) =>{
        const updatedList = [...tarefas]
        updatedList[index].done = !updatedList[index].done
        setTarefas(updatedList)
    }

    return (
        <div>
            <h1>Lista de tarefas</h1>

            <section>
                <input
                    type="text"
                    value={inputTarefa}
                    onChange={(e) => setInputTarefa(e.target.value)}
                />
                <button onClick={AddTarefa}>
                    {editTask !== null ? "Salvar edição" : "Cadastrar"}
                </button>
            </section>

            <section>
                <ul>
                    {tarefas.map((item, index) => (
                        <li key={index} onClick={() =>ConcluiTarefa(index)}
                        style={{
                            cursor: "pointer",
                            textDecoration: item.done ? "line-through" : "none",
                            color: item.done ? "gray" : "white"
                        }}
                        
                        >
                            <span>{item.name}</span>
                            <div>
                                                            <button onClick={() => RemoveTarefa(index)}>X</button>

                            <button onClick={() => EditIndex(index)}>E</button>
                            </div>

                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}
