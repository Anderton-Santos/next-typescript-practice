"use client"


import { ReactHTMLElement, useState } from "react"

type Category = 'Alimentos' | 'Limpeza' | 'Higiene' | 'Outros';

type productItemProps = {
    name: string;
    price: number;
    category: Category;
}

export function ListBuy() {
    const [product, setProduct] = useState("")
    const [inputPrice, setInputPrice] = useState<string>("")
    const [category, setCategory] = useState<Category>("Alimentos")

    const [products, setProducts] = useState<productItemProps[]>([])

    const [editIndex, setEditIndex] = useState<number | null>(null)

    function handleProduct() {
        if (product.trim() === '' || inputPrice.trim() === "") return alert("Produtos não preenchidos")

        const newItem: productItemProps = {
            name: product,
            price: parseFloat(inputPrice),
            category,
        };

        if (editIndex !== null) {
            const uptadedList = [...products]
            uptadedList[editIndex] = newItem
            setProducts(uptadedList)
            setEditIndex(null)
            setInputPrice("")

        } else {
            setProducts(prev => [...prev, newItem])
        }


        setProduct('')
        setInputPrice("")
    }

    const removeItem = (name: string) => {
        setProducts(prev => prev.filter(product => product.name !== name))
    }

    const editItem = (item: productItemProps, index: number) => {
        setProduct(item.name);
        setInputPrice(item.price.toString());
        setEditIndex(index);
    }

    const total = products.reduce((acc, item) => acc + item.price, 0);


    return (
        <div>
            <h1>Lista de compras:</h1>
            <section>
                <input
                className="text-black"
                    type="text"
                    placeholder="Digite seu produto"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Digite o preço"
                    value={inputPrice}
                    onChange={(e) => setInputPrice(e.target.value)}
                />

                <select
                    name=""
                    id=""
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="text-black"
                >
                    <option value="Alimentos">Alimentos</option>
                    <option value="Limpeza">Limpeza</option>
                    <option value="Higiene">Higiene</option>
                    <option value="Outros">Outros</option>
                </select>


                <button onClick={handleProduct}>{editIndex !== null ? "Atualizar" : "Cadastrar"}</button>
            </section>
            {products.length === 0 ? (
                <p>Não há item cadastrado</p>
            ) : (
                <ul>
                    {products.map((item, index) => (
                        <li key={index}>
                            {item.name} - R$ {item.price.toFixed(2)} {item.category}
                            <button onClick={() => removeItem(item.name)}>X</button>
                            <button onClick={() => editItem(item, index)}>E</button>
                        </li>
                    ))}
                </ul>
                
            )}
            {total <= 0 ? (
                ""
            ) : (
               <span>Total:{total > 0 ? (total.toFixed(2)) : ""}</span> 
            )}
            

        </div>
    )
}
