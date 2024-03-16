import React from 'react'

interface CardProps {
    titulo : string,
    numero : number
}

function Card(props : CardProps) {

    return (
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden bg-gray-150">
            <div className="px-6 py-4 flex flex-col justify-center items-center">
                <h2 className="font-bold text-xl text-black mb-2">{props.titulo}</h2>
                <p className="text-gray-700 text-base">
                    <span className="text-gray-600 text-lg font-bold">{props.numero}</span>
                </p>
            </div>
        </div>

    )
}

export default Card;