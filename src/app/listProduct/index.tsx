"use client"

import { useContext, useState } from "react"
import { ProductProvider } from "./context/renderProductContext"
import { ProductContext } from "./context/renderProductContext"

export function RenderProductCart() {
    const {
        product,
        HandleAdd,
        HandleRemove,
        UpdateTask
    } = useContext(ProductContext)

    const [input, setInput] = useState("")
    const [category, setCategory] = useState("")
    const [editIndex, setEditIndex] = useState<null | string>(null)

    const addNewProduct = () => {
        if (input.trim().length === 0) return

        if (editIndex !== null) {
            UpdateTask(editIndex, input)
            setEditIndex(null)
            setInput("")
            return
        }

        HandleAdd(input, category)
        setInput("")
    }

    const editTask = (id: string, name: string) => {
        setInput(name)
        setEditIndex(id)
    }

    const categories = ["Eletronicos", "Roupas", "Livros"]

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex gap-4 p-2">
                <input
                    type="text"
                    className="p-2"
                    placeholder="Digite seu Produto"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    name=""
                    id=""
                    className="text-black"
                >
                    {categories.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>

                <button onClick={addNewProduct} className="bg-orange-600 p-1 rounded-2xl">
                    {editIndex ? "Editar" : "Adicionar"}
                </button>
            </div>

            <section className="flex gap-4">
                {categories.map((item, index) => (
                    <div key={index} className="bg-orange-500 w-[250px] h-[320px] text-center">
                        <h2>{item}</h2>
                        <ul>
                            {product
                                .filter((prev) => prev.category === item)
                                .map((item) => (
                                    <li key={item.id} className="flex items-center justify-center gap-2">
                                        <span>{item.name}</span>
                                        <button
                                            onClick={() => HandleRemove(item.id)}
                                            className="bg-white rounded-full w-4 text-black"
                                        >
                                            X
                                        </button>
                                        <button
                                            onClick={() => editTask(item.id, item.name)}
                                            className="bg-black rounded-full w-4 text-white"
                                        >
                                            E
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default function ListProductPage() {
    return (
        <ProductProvider>
            <RenderProductCart />
        </ProductProvider>
    )
}
