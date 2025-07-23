"use client"

import { ProductProvider } from "./context/renderProductContext";
import { useContext, useState } from "react"
import { ProductContext } from "./context/renderProductContext";


export function RederProductCart() {
    const {
        product,
        addNewProduct,
        updateNewProduct,
        deleteNewProduct
    } = useContext(ProductContext)

    const [input, setInput] = useState("")
    const [category, setCategory] = useState("")
    const [editIndex, setEditIndex] = useState<null | number>(null)




    const handleAdd = () => {
        if (input.trim() === "") return

        if (editIndex !== null) {
            const newItem = [...product]
            updateNewProduct(newItem[editIndex].id, input)
            setEditIndex(null)
            setInput("")
            return

        }
        addNewProduct(input, category)
        console.log(category)
        setInput("")

    }

    const handleEdit = (name: string, id: number) => {
        setInput(name)
        setEditIndex(id)
    }

    const categories = ["Eletronicos", "Roupas", "Livros"];

    return (


        <div>
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Digite uma tarefa"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <select
                    className="text-black"
                    name=""
                    id=""
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {/* <option value="Eletronicos">Eletronicos</option>
                    <option value="Roupas">Roupas</option>
                    <option value="Livros">Livros</option> */}

                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <button onClick={() => handleAdd()}>Add</button>

            </div>


            <section className="grid grid-cols-3 gap-8 w-full max-w-4xl mx-auto items-center h-full">
                {categories.map((cat, index) => (

                    <div key={index} className="bg-orange-300 h-[200px] ">
                        <span>{cat}</span>
                        <ul className="flex flex-col justify-center items-center">
                            {product
                                .filter((prev) => prev.category === cat)
                                .map((item, index) => (

                                    <li key={item.id}>
                                        <span className="flex gap-4">
                                            {item.name}
                                            <button onClick={() => handleEdit(item.name, index)}>E</button>
                                            <button onClick={() => deleteNewProduct(item.id)}>X</button>
                                        </span>
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
            <RederProductCart />
        </ProductProvider>
    );
}