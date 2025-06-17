"use client"

import { useState } from "react"

export function TodoListTrhee() {
    const [inputTarefa, setInputTarefa] = useState<string>("")
    const [tarefas, setTarefas] = useState<string[]>([])
    const [isEditing, setIsEditing] = useState<null | number>(null)

    const addTask = () => {
        if(inputTarefa.trim() === ""){
            setInputTarefa("")
            return
        }

        if(isEditing !== null){
            const update = [...tarefas]
            update[isEditing] = inputTarefa
            setTarefas(update)
            setIsEditing(null)
            setInputTarefa("")
            return

        }

        setTarefas(prev => [...prev, inputTarefa])
        setInputTarefa("")
        return
    }

    const RemoveTask = (item: string): void => {
        const remove = tarefas.filter(prev => prev !== item)
        setTarefas(remove)

    }

    const EditTask = (item: string) =>{
        const index = tarefas.indexOf(item)
        setInputTarefa(item)
        setIsEditing(index)

    }



    return (
        <div>
            <h1>ToDo List</h1>

            <section>
                <input
                    type="text"
                    placeholder="Digite sua tarefa"
                    value={inputTarefa}
                    onChange={(e) => setInputTarefa(e.target.value)}
                />

                <button onClick={addTask}>Cadastrar</button>
            </section>

            <section>
                {tarefas.length === 0 ? "Nenhuma tarefa Cadastrada" : (
                    <ul>
                        {tarefas.map((item, index) => (
                            

                                <div key={index} className=" p-4 flex gap-12">
                                    <li >{item}</li>
                                    <button onClick={() => RemoveTask(item)}>X</button>
                                    <button onClick={() => EditTask(item)}>E</button>
                                </div>


                            

                        ))}
                    </ul>
                )}
            </section>
        </div>
    )
}