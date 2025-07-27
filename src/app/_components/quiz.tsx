

"use client"

import { useState } from "react"

export function Quiz() {
    const [score, setScore] = useState(0)
    const [questionindex, setQuestionIndex] = useState(0)
    const [finished, setFinished] = useState(false)

    interface QuestionsProps {
        id: number,
        quiz: string,
        awner: boolean
    }

    const Quest: QuestionsProps[] = [

        {
            id: 1,
            quiz: "Qual clube o Flamengo enfrentou na semifinal da Libertadores de 1981?",
            awner: false, // Era o Atlético-MG, mas foi um triangular com Deportivo Cali também (questão capciosa)
        },
        {
            id: 2,
            quiz: "O Flamengo conquistou seu primeiro título do Campeonato Carioca em 1912?",
            awner: false, // O clube foi fundado em 1911 e só venceu o Carioca em 1914
        },
        {
            id: 3,
            quiz: "O treinador que levou o Flamengo ao título da Libertadores de 1981 foi o Carlinhos?",
            awner: false, // Foi Paulo César Carpegiani
        },
        {
            id: 4,
            quiz: "O Flamengo já venceu o Corinthians por mais de 5 gols em um jogo oficial?",
            awner: true, // Já venceu por 5x1 (2000) e outras goleadas
        },
        {
            id: 5,
            quiz: "Em 2009, o Flamengo foi campeão brasileiro com Adriano como artilheiro?",
            awner: true, // Sim, Adriano fez 19 gols
        },
        {
            id: 6,
            quiz: "Zico jogou mais de 700 partidas com a camisa do Flamengo?",
            awner: true, // Jogou 732 jogos
        },
        {
            id: 7,
            quiz: "O Flamengo já teve uma camisa com listras verticais como uniforme principal?",
            awner: false, // Sempre usou listras horizontais
        },
        {
            id: 8,
            quiz: "O Flamengo ganhou a Taça Guanabara e o Campeonato Carioca invicto em 1996?",
            awner: false, // Em 1996 perdeu o Carioca, apesar da boa campanha
        },
        {
            id: 9,
            quiz: "Petkovic marcou um gol de falta no último minuto da final do Carioca de 2001 contra o Vasco?",
            awner: true, // Gol histórico que deu o título
        },
        {
            id: 10,
            quiz: "Em 2022, o Flamengo venceu a Libertadores e a Copa do Brasil no mesmo ano?",
            awner: true, // Sim, venceu ambos
        }
    ]

    function handleRes(item: boolean) {
        const res = item === Quest[questionindex].awner
        if (res) {
            setScore(prev => prev + 1)
        }

        if (questionindex + 1 < Quest.length) {
            setQuestionIndex(prev => prev + 1)
        } else {
            setFinished(true)
        }
    }



    return (
        <div>
            <h1>Quiz Futebol</h1>

            <section className="flex flex-col items-center justify-center">
                {!finished ? (
                    <>
                        <span>{Quest[questionindex].quiz}</span>


                        <div className="flex gap-6">
                            <button onClick={() => handleRes(true)}>Verdadeiro</button>
                            <button onClick={() => handleRes(false)}>Falso</button>
                        </div>
                    </>

                ) : (
                    <span>Você acretou {score} de {Quest.length} perguntas</span>
                )}


            </section>



        </div>
    )
}
