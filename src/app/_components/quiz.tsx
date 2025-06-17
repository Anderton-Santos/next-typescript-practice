// "use client"

// import { useState } from "react";

// type questionProps = {
//     question: string;
//     answer: boolean
// }


// const HandleQuestions = () =>{

//     const questions: questionProps[] = [
//         {"question": "O React é uma biblioteca para construção de interfaces?", answer: true },
//         {"question": "O JavaScript é uma linguagem compilada?", answer: false },
//         {"question": "O HTML é uma linguagem de programação?", answer: false },
//         {"question": "O CSS é usado para estilizar páginas web?", answer: true },
//     ]

//     const [questionIndex, setQuestionIndex] = useState(0)
//     const [score, setScore] = useState(0)
//     const [result, setResult] = useState(false)

//     const handleUser = (res: boolean) =>{
//         if(res === questions[questionIndex].answer)
//             setScore(score + 1)


//         if(questionIndex + 1 < questions.length){
//             setQuestionIndex(questionIndex + 1)
//             }else{
//                 setResult(true)
//             }
//         }

//         return(
//             <div>
//                 {!result ? (
//                     <div>
//                     <h2>{questions[questionIndex].question}</h2>
//                     <button onClick={() =>handleUser(true)}>Verdadeiro</button>
//                     <button onClick={() => handleUser(false)}>Falso</button>
//                     </div>
//                 ) : (
//                     <div>
//                         <h2>Voce acertou {score} de {questions.length} Perguntas</h2>
//                     </div>
//                 )}
//             </div>
//         )

// }

// export default HandleQuestions



"use client"

import { useState } from "react"

export function Quiz() {
    const [score, setScore] = useState(0)
    const [questionindex, setQuestionIndex] = useState(0)
    const [finished, setFinished] = useState(false)

    interface QuestionsProps{
        id: number,
        quiz: string,
        awner: boolean
    }

    const Quest:QuestionsProps[] = [

        {
            id: 1,
            "quiz": "O goleiro Rogério Ceni marcou mais de 100 gols em sua carreira?",
            awner: true,
        },
        {   id: 2,
            "quiz": "Zinédine Zidane foi expulso na final da Copa do Mundo de 2006 por dar um carrinho violento?"
            , awner: false
        },
        {   id: 3,
            "quiz": "A Inglaterra venceu sua única Copa do Mundo em 1966?"
            , awner: true
        },
        {   id:4,
            "quiz": "Lionel Messi fez sua estreia profissional no Barcelona em 2007?"
            , awner: false
        },
        {   id:5,
            "quiz": "A Juventus foi rebaixada para a segunda divisão italiana por envolvimento em escândalos de arbitragem?",
            awner: true
        },
    ]

    const HandleRes = (res:boolean):void =>{
        const acerted = res === Quest[questionindex].awner
        if (acerted){
             setScore(prev => prev + 1)
        }

       if(questionindex + 1 < Quest.length){
        setQuestionIndex(prev => prev + 1)
       }else{
        setFinished(true)
       }

    }


    return (
        <div>
            <h1>Quiz Futebol</h1>

           { !finished ? (
             <section>
                {Quest[questionindex].quiz}

                <div className="flex gap-6">
                    <button onClick={() => HandleRes(true)}>Verdadeiro</button>
                    <button onClick={() => HandleRes(false)}>Falso</button>
                </div>
            </section>
           ): (
            <>


            <span>Finalizado</span>
            <span>Voce acertou {score} de {Quest.length} perguntas</span>

            </>
           )
           }

        </div>
    )
}



// "use client"
// import { useState } from "react"

// export function Quiz() {

//     const [score, setScore] = useState(0)
//     const [index, setIndex] = useState(0)
//     const [result, setResult] = useState(false)

//     const Quest = [
//         {
//             id: 1,
//             quiz: "A água ferve a 100°C ao nível do mar?",
//             awner: true
//         },
//         { 
//             id: 2,
//             quiz: "O ser humano tem cinco corações?",
//             awner: false
//         },
//         {
//             id:3,
//             quiz: "A capital da Austrália é Sydney",
//             awner:false
//         },
//         {
//             id:4,
//             quiz: "O Sol é uma estrela?",
//             awner: true
//         },
//         {
//             id: 5,
//             quiz: "O Brasil faz parte do continente africano?",
//             awner:false
//         },
//         {
//             id: 6,
//             quiz: "A Amazônia é a maior floresta tropical do mundo?",
//             awner: true
//         }
//     ]

//     const handleRes = (res: boolean) =>{
//         const acerted = res === Quest[index].awner
//         if(acerted){
//             setScore(prev => prev + 1)
//         }

//         if(index + 1 < Quest.length){
//             setIndex(prev => prev + 1)
//         }else{
//             setResult(true)
//         }
//     }


//     return (
//         <div>
//           <h1>Quiz</h1>

//           <section>
//             {!result ? (
//                 <>
//                 <h2>{Quest[index].quiz}</h2>
//                 <section>
//                     <button onClick={()=> handleRes(true)}>Verdadeiro</button>
//                     <button onClick={()=> handleRes(false)}>Falso</button>
//                 </section>
//                 </>
//             ): (
//                 <div>
//                     <span>Voce acertou {score} de {Quest.length} Perguntas</span>
//                 </div>
//             )}
//           </section>

//         </div>
//     )
// }