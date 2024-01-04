import React from 'react';
import { useState } from 'react';

const Help = () => {
    const [questionsModal, setQuestionsModal] = useState({
        q1: false,
        q2: false,
        q3: false,
        q4: false,
        q5: false,
        q6: false,
        q7: false,
        q8: false,
        q9: false,
        q10: false,
    });

    const questions = [
        {
            question: '¿Como puedo realizar una compra en Creamitienda',
            answer: 'Por medio de nuestra pagina web',
        },
        {
            question: '¿Que opciones de despacho ofrece la tienda?',
            answer: 'Lorem',
        },
        {
            question: '¿Como puedo contactarme con la tienda?',
            answer: 'Puedes contactarnos en nuestras redes sociales, @rrss',
        },
    ];

    return (
        <div className="h-screen w-11/12 mx-auto ">
            <h1 className="text-center text-6xl mb-12 titulo">Ayuda</h1>
            <div className="flex flex-col justify-center">
                {questions.map((question, index) => (
                    <div key={index} className="flex flex-col mt-4 bg-slate-100 rounded-lg p-2">
                        <div className="flex flex-row">
                            <button
                                onClick={() =>
                                    setQuestionsModal((prevState) => ({
                                        ...prevState,
                                        [`q${index + 1}`]: !prevState[`q${index + 1}`],
                                    }))
                                }
                                className={`boton-ayuda text-center hover:animate-pulse w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${questionsModal[`q${index + 1}`] ? 'active' : ''}`}
                            >
                                +
                            </button>
                            <p
                                onClick={() =>
                                    setQuestionsModal((prevState) => ({
                                        ...prevState,
                                        [`q${index + 1}`]: !prevState[`q${index + 1}`],
                                    }))
                                }
                                className="text-lg hover:cursor-pointer"
                            >
                                {question.question}
                            </p>
                        </div>

                        {questionsModal[`q${index + 1}`] ? <p className={`text-lg ml-12 mt-2 respuesta respuesta-activa `}>{question.answer}</p> : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Help;
