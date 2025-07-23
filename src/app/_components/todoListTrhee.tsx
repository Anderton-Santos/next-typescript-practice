"use client"

import { useState } from "react"

type objectProps = {
    name: string,
    year: string,
    done: boolean
}


export function TodoListTrhee() {
    const [inputName, setInputName] = useState("")
    const [inputYear, setInputYear] = useState("")

    const [task, setTask] = useState<objectProps[]>([])
    const [isEditing, setIsEditing] = useState<number | null>(null)



    function handleAdd() {
        if (inputName === "") return

        const NewObject: objectProps = {
            name: inputName,
            year: inputYear,
            done: false,
        }



        if (isEditing !== null) {
            const newItem = [...task]
            newItem[isEditing] = NewObject
            setTask(newItem)
            setIsEditing(null)
            setInputName("")
            setInputYear("")
            return

        }

        setTask(prev => [...prev, NewObject])
        setInputName("")
        setInputYear("")
    }

    function handleRemove(indexToRemove: number) {
        setTask(prev => prev.filter((_, index) => index !== indexToRemove));
    }

    function handleEdit(index: number, item: objectProps) {
        setInputName(item.name)
        setInputYear(item.year)
        setIsEditing(index)
    }

    function handleFinished(item: number) {
        const finishedTask = [...task]
        finishedTask[item].done = !finishedTask[item].done
        setTask(finishedTask)
    }





    return (
        <div>
            <h1>Todo list</h1>

            <div className="flex gap-2 p-2">
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        className="rounded-2xl p-2"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                    />

                    <input
                        type="text"
                        className="rounded-2xl p-2"
                        value={inputYear}
                        onChange={(e) => setInputYear(e.target.value)}
                    />
                </div>
                <button className="bg-amber-400 p-1 rounded-2xl" onClick={() => handleAdd()}>Adicionar</button>
            </div>

            <section>
                {task.length === 0 ? "Nenhuma tarefa adicionada" : (
                    <ul>
                        {task.map((item, index) => (
                            <li key={index} className="flex gap-4">
                                <span
                                    className={item.done ? "line-through text-gray-500" : ""}
                                >{item.name}</span>
                                <span>{item.year}</span>

                                <button onClick={() => handleRemove(index)}>X</button>
                                <button onClick={() => handleEdit(index, item)}>E</button>
                                <button onClick={() => handleFinished(index)}>F</button>
                            </li>
                        ))}
                    </ul>
                )}

            </section>
        </div>
    )
}