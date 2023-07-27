import React, { useEffect, useState } from "react";
import Results from "./Results";

export default function Preguntas({
  filteredQuestions,
  setIndexQuestion,
  indexQuestion,
  filtroPreguntas,
  setActiveQuiz
}) {
  const [score, setScore] = useState(0);
  const [selectAnswerIndex, setselectAnswerIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [respuestaRandon, setRespuestaRandon] = useState([]);
  const [activeResult, setActiveResult] = useState(false);

  useEffect(() => {
    const respuestas = [
      ...filteredQuestions.incorrect_answers,
      filteredQuestions.correct_answer,
    ];
    setRespuestaRandon(respuestas.sort(() => Math.random() - 0.5));
  }, [filteredQuestions]);

  const checkAnswer = (answerText, index) => {
    if (answerText === filteredQuestions.correct_answer) {
      setScore(score + 1);
    }
    setselectAnswerIndex(index);
    setAnswered(true);
  };

  const onNextQuestion = () => {
    setIndexQuestion(indexQuestion + 1);
    setselectAnswerIndex(null)
    setAnswered(false)
  };

  const onReset = () => {
    setScore(0);
    setActiveQuiz(false);
    setIndexQuestion(0);
  };

  return (
    <>

    {
        activeResult ? (
        <Results filtroPreguntas={filtroPreguntas} score={score} onReset={onReset}/>
        ) : (
            <div className="flex flex-col justify-between shadow-md shadow-slate-300 w-[600px] h-[600px] p-10 rounded-lg">
            <div className="flex justify-between">
              <span className="text-xl font-bold">
                {indexQuestion + 1} / {filtroPreguntas.length}
              </span>
              <div>
                <span className="font-semibold">Dificultad: </span>
    
                <span className="font-bold">{filteredQuestions.difficulty}</span>
              </div>
            </div>
    
            <button
              className="border px-5 py-2 rounded-lg font-bold transition-all hover:bg-yellow-500"
              onClick={onReset}
            >
              Reiniciar
            </button>
            <div>
              <h1 className="font-bold">{filteredQuestions.question}</h1>
            </div>
    
            <div className="grid grid-cols-2 gap-5">
              {respuestaRandon.map((answer, index) => (
                <button
                  className={`border p-5 rounded-lg flex justify-center items-center hover:scale-105
                  ${selectAnswerIndex !== null && 
                    index === selectAnswerIndex 
                    ? answer === filteredQuestions.correct_answer 
                        ? 'bg-green-500' 
                        : 'bg-red-500'
                    : ''
                    }`}
                  key={answer}
                  onClick={() => checkAnswer(answer, index)}
                  disabled={answered && selectAnswerIndex !== index}
                >
                  <p className="font-medium text-center text-sm">{answer}</p>
                </button>
              ))}
            </div>
    
            {indexQuestion + 1 === filtroPreguntas.length ? (
              <button
                className="border-2 border-yellow-600 text-yellow-600 rounded-md px-5 py-2 
            hover:bg-yellow-600 hover:text-black font-medium"
                onClick={()=>{
                    setAnswered(false);
                    setActiveResult(true);
                }}
              >
                Finalizar
              </button>
            ) : (
              <button
                className="border-2 border-yellow-600 text-yellow-600 rounded-md px-5 py-2 
            hover:bg-yellow-600 hover:text-black font-medium"
                onClick={onNextQuestion}
              >
                Siguiente Pregunta
              </button>
            )}
          </div>
        )
    }


     
    </>
  );
}
