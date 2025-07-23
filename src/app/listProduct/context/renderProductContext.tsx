import { createContext, useState, ReactNode } from "react";

type Product = {
    id: string;
    name: string;
    category: string;
}

type ProductProp = {
    product: Product[]
    addNewProduct: (name: string, category:string) => void
    deleteNewProduct: (id: string) => void
    updateNewProduct: (id: string, name:string) => void
}

export const ProductContext = createContext({} as ProductProp)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [product, setProduct] = useState<Product[]>([])

    function addNewProduct(name: string,category:string) {
        setProduct(prev => [...prev, { id: Date.now().toString(), name, category }])

    }

    function updateNewProduct(id: string, name: string) {
        setProduct(prev =>
            prev.map(item =>
                item.id === id ? { ...item, name:name } : item
            )
        );
    }


    function deleteNewProduct(id: string) {
        setProduct(prev => prev.filter((item) => item.id !== id))
    }

    return (
        <ProductContext.Provider value={{
            product,
            addNewProduct,
            deleteNewProduct,
            updateNewProduct,
        }}>
            {children}
        </ProductContext.Provider>

    )
}