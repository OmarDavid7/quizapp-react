import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { imgs, questions } from '../data'
import Preguntas from '../components/Preguntas'

//funcion para barajar las preguntas de cada categoria y tambien reducirla al numero 5
const shuffleArray = (array)=>{
  const newArray = array.sort(() => Math.random() - 0.5)
  return newArray.slice(0,5);
}

export default function Category() {

  //leer el parametro de la url
  const { category } = useParams()

  const [filtroPreguntas, setFiltroPreguntas] = useState(
    questions.filter(pregunta => pregunta.category === category))

  const [indexQuestion, setIndexQuestion] = useState(0);
  const [activeQuiz, setActiveQuiz] = useState(false);

    useEffect(()=>{
      const newPreguntas = shuffleArray(filtroPreguntas);
      setFiltroPreguntas(newPreguntas);      
    },[])

    const [imgCategory] = imgs.filter(img=> img === `/src/assets/${category.toLocaleLowerCase()}.png`)


  return (
    <>
    <div className='container flex flex-col items-center justify-center gap-10'
      style={{height: 'calc(100vh - 5rem)'}}>

{activeQuiz ? (   
    <Preguntas 
        filteredQuestions={filtroPreguntas[indexQuestion]} 
        setIndexQuestion={setIndexQuestion}
        indexQuestion={indexQuestion}
        filtroPreguntas={filtroPreguntas}
        setActiveQuiz={setActiveQuiz}
        />
        ) : (
          <>
          <div className='flex flex-col gap-5'>
            <h1 className='text-3xl text-teal-900 text-center font-bold'>
              {category}
            </h1>
            <div className='flex justify-center items-center'>
              <img src={imgCategory} alt={category} className='w-72' />
            </div>
          </div>

          <button className='text-white bg-gray-900 py-2 rounded-lg font-bold px-5 transition-all 
          hover:bg-yellow-500 hover:text-gray-900' onClick={() => setActiveQuiz(true)}>
            Iniciar Quiz
          </button>
          </>
        )}

    </div>
    </>
  )
}
