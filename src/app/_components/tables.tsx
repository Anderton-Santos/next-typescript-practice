"use client"

import { ReactNode, useState } from "react"

type tab = {
    label: string
    content: ReactNode
}

type tabs = {
    tables: tab[]
}

export function Tables({ tables }: tabs) {
    const [tableIndex, setTableIndex] = useState(0)


    return (
        <div>
            <section>
                {tables.map((item, index) => (
                    <button
                        onClick={() => setTableIndex(index)}
                        key={index}
                        style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: tableIndex === index ? "#333" : "#ccc",
                            color: tableIndex === index ? "#fff" : "#000",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}

                    >
                        {item.label}</button>
                ))}

                <div
                    style={{ marginBottom: "1.5rem" }}>
                    {tables[tableIndex].content}
                </div>
            </section>
        </div>
    )
}


