
import React from 'react'

interface propsType {
    number: number,
    total: number,
    category: string,
    score: number
}

export default function QuestionNo({ number, total, category, score }: propsType) {
    return (
        <div className="w-full h-[50px] bg-transparent rounded-lg flex items-center justify-between px-2">
            <p className="text-base font-bold text-black font-mono">{number}&nbsp;/&nbsp;{total}</p>
            <p className="font-medium text-base text-black tracking-wider font-mono">Score : {score}</p>
            <p className="font-medium text-base text-black tracking-wider font-mono">{category}</p>
        </div>
    )
}
