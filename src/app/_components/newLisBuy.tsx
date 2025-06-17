//Cagastrar produto
//preço
//categorias ex.Alimentos Higiene Limpeza
//exbir produto, preço, categoria
//total

"use client"


import { useState } from "react"

type ProductProps = {
    name: string;
    price: string
}

export function NewListBuy() {
    const [product, setProduct] = useState<ProductProps[]>([])
    const [input, setInput] = useState("")
    const [inputPrice, setInputPrice] = useState("")

    const [isEditing, setIsEditing] = useState<null | number>(null)

    function handleAdd() {
        if (input.trim() === "" || inputPrice.trim() === "") return

        const newItem = {
            name: input,
            price: inputPrice
        }


        if (isEditing !== null) {
            const newList = [...product]
            newList[isEditing] = newItem
            setProduct(newList)
            setIsEditing(null)
            setInput("")
            setInputPrice("")
            return

        }



        setProduct(prev => [...prev, newItem])

        setInput("")
        setInputPrice("")

    }


    function handleEdit(item: ProductProps) {
        const index = product.findIndex(prev => prev === item)
        setInput(item.name)
        setInputPrice(item.price)
        setIsEditing(index)
    }

    function handleRemove(item:ProductProps){
        setProduct(prev => prev.filter(prev => prev !== item))
    }

    return (
        <div>
            <h1>LISTA DE COMPRAS</h1>

            <section className="flex gap-4 p-4">
                <div>
                    <input type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <div>
                    <input type="text"
                        value={inputPrice}
                        onChange={(e) => setInputPrice(e.target.value)}
                    />

                </div>
                <button onClick={handleAdd}>Cadastrar</button>
            </section>

            <section >
                <ul>
                    {product.map((item, index) => (
                        <div className="flex gap-4" key={index}>
                            <li>{item.name}</li>
                            <li>{item.price}</li>
                            <button onClick={() => handleEdit(item)}>E</button>
                            <button onClick={() => handleRemove(item)}>X</button>
                        </div>

                    ))}
                </ul>
            </section>
        </div>
    )
}