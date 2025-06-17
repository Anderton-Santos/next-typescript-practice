"use client"

import { useEffect, useState } from "react"


export function Cronometro() {
    const [segundos, setSegundos] = useState(0)
    const [rodando, setRodando] = useState(false)



    useEffect(() => {
        let id: ReturnType<typeof setInterval>;

        if (rodando) {
            id = setInterval(() => {
                setSegundos(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(id)


    }, [rodando])

    const handlePlay = () => {
        setRodando(prev => !prev)
    }


    return (
        <div>
            <h1 className="text-3xl m-16 text-center">Cronometro</h1>

            <section className="flex items-center justify-center flex-col gap-8">
                <span>{segundos}</span>
                <div>
                    <button onClick={handlePlay}>
                        {rodando ? "Pausar" : "Iniciar"}
                    </button>
                </div>

            </section>
        </div>
    )
}

