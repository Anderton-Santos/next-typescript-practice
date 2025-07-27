import { createContext, ReactNode, useState } from "react";

type Product = {
    id: string,
    name: string,
    category: string,
}

type ProductProps = {
    product: Product[],
    HandleAdd: (name: string, category: string) => void,
    UpdateTask: (id: string, name: string) => void,
    HandleRemove: (id: string) => void,
}

export const ProductContext = createContext({} as ProductProps)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [product, setProduct] = useState<Product[]>([])

    function HandleAdd(name: string, category: string) {
        setProduct(prev => [...prev, { id: String(Date.now()), name, category }])
    }

    function UpdateTask(id: string, name: string) {
        setProduct(prev =>
            prev.map((item) => item.id === id ? { ...item, name: name } : item)
        )
    }

    function HandleRemove(id: string) {
        setProduct(prev =>
            prev.filter((item) => item.id !== id)
        )
    }

    return (
        <ProductContext.Provider value={{
            product,
            HandleAdd,
            HandleRemove,
            UpdateTask,
        }}>
            {children}
        </ProductContext.Provider>
    )

}