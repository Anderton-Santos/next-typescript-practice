"use client"

import { useState } from "react";

type QuizProps = {
    id: number;
    name: string;
    awnser: boolean
}



export function NewQuiz() {
    const [index, setIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [result, setResult] = useState(false)



    const Quiz: QuizProps[] = [
        {
            id: 1,
            name: "O filme Avatar (2009) foi dirigido por Steven Spielberg.",
            awnser: false
        },
        {
            id: 2,
            name: "O personagem Forrest Gump foi interpretado por Tom Hanks.",
            awnser: true,
        },
        {
            id: 3,
            name: "A saga Harry Potter tem um total de 10 filmes.",
            awnser: false,
        },
        {
            id: 4,
            name: "O filme O Rei Leão foi lançado originalmente em 1994.",
            awnser: true,
        },
        {
            id: 5,
            name: " O filme Batman: O Cavaleiro das Trevas ganhou o Oscar de Melhor Filme.",
            awnser: false,
        },
        {
            id: 6,
            name: "Homem-Aranha: Sem Volta Para Casa (2021) reúne os três atores que já interpretaram o herói no cinema.",
            awnser: true

        }

    ]

    function handleQuest(res: boolean) {
        const handleRes = Quiz[index].awnser === res
        if (handleRes) {
            setScore(prev => prev + 1)
        }


        const questIndex = index
        if (questIndex + 1 < Quiz.length) {
            setIndex(prev => prev + 1)
        } else {
            setResult(true)
        }


    }





    return (
        <div>
            <h1>Quiz Filmes</h1>

            <section>
                {!result ? (
                    <>
                        <h1>{Quiz[index].name}</h1>

                        <div className="flex gap-6 p-4">
                            <button onClick={() => handleQuest(true)}>Verdadeiro</button>
                            <button onClick={() => handleQuest(false)}>Falso</button>
                        </div>
                    </>
                ) : (
                    <span>Você acertou {score} de {Quiz.length} prguntas</span>
                )}
            </section>


        </div>
    );



}