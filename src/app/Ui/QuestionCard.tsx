"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Button from "@/app/Ui/Button"
import QuestionNo from "@/app/Ui/QuestionNo"

interface objectType {
    category: string,
    question: string,
    answer: string,
    options: string[]
}

interface propType {
    quiz: objectType[]
}

const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export default function Question({ quiz }: propType) {

    const [quesions, _setQuesion] = useState<objectType[]>(quiz)
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [currentOption, setOptions] = useState<string[]>()
    const [isSelect, setSelect] = useState<boolean>(false)
    const [answer, setAnswer] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [score, setScore] = useState<number>(0)

    const router = useRouter()

    // set question number and loading false
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500);
        setCurrentQuestion(localStorage.getItem('questionNo') ? Number(localStorage.getItem('questionNo')) : 0)
        setSelect(localStorage.getItem('isSelect') === 'true' ? true : false)
        setAnswer(localStorage.getItem('answer') ? localStorage.getItem('answer') as string : '')
        setScore(localStorage.getItem('score') ? Number(localStorage.getItem('score')) : 0)
    }, [])


    // shuffle the options in each quesitions
    useEffect(() => {
        if (quesions.length > 0) {
            let newOptions: string[] = shuffleArray(quesions[currentQuestion].options);
            newOptions.length = 4;
            const correctAnswer = quesions[currentQuestion].answer;
            const storedAnswer = localStorage.getItem('answer') as string;
            if (!newOptions.includes(correctAnswer)) {
                newOptions.unshift(correctAnswer);
            }
            newOptions = shuffleArray(newOptions).slice(0, 4);
            if (storedAnswer && !newOptions.includes(storedAnswer)) {
                newOptions.unshift(storedAnswer);
            }
            newOptions.length = 4
            setOptions(newOptions);
        }
    }, [currentQuestion]);

    // check answer
    const handleAnswer = (answer: string) => {
        if (isSelect) {
            alert('already selected')
        } else {
            setSelect(true)
            setAnswer(answer)
            localStorage.setItem('isSelect', 'true')
            localStorage.setItem('answer', `${answer}`)
        }
    }

    // add score
    useEffect(() => {
        if (quesions.length > 0) {
            if (answer === quesions[currentQuestion].answer) {
                setScore((prev) => {
                    return prev + 5
                })
                localStorage.setItem('score', `${score}`)
            }
        }
    }, [answer])

    // next question
    const handleNext = () => {
        if (currentQuestion + 1 < (quesions.length >= 10 ? 10 : quesions.length)) {
            localStorage.clear()
            setCurrentQuestion(prev => {
                const newQuestionIndex = prev + 1;
                localStorage.setItem('questionNo', `${newQuestionIndex}`);
                return newQuestionIndex;
            });
            setScore((prev) => {
                return prev
            })
            localStorage.setItem('score', `${score}`)
            setSelect(false)
            setAnswer('')
        } else {
            router.push(`/score/${quesions[currentQuestion].category}/${score}`)
            setTimeout(() => {
                setCurrentQuestion(0)
                setSelect(false)
                setAnswer('')
                setScore(0)
                localStorage.clear()
            }, 1000);
        }
    }

    return (
        <>
            {/* loading */}
            {loading && <div className="flex justify-center">
                <p className="font-medium font-mono text-lg">Loading...</p>
            </div>}

            {/* if questions are there */}
            {!loading && quesions.length > 0 && <div>
                <QuestionNo score={score} category={quesions[currentQuestion].category} number={currentQuestion + 1} total={quesions.length === 10 ? 10 : quesions.length} />
                <div className="p-2">
                    <h1 className="font-medium text-lg font-mono">{quesions[currentQuestion].question}{"?"}</h1>
                    <div className="rounded-lg pt-5">
                        <p className="font-medium text-base font-mono">Please choose one of the following answers :</p>
                        {currentOption?.map((opt, index) => {
                            return <div key={index} onClick={() => handleAnswer(quesions[currentQuestion].options[index])} className={`w-full p-2 px-5 py-4 my-4 bg-gray-200 rounded-lg cursor-pointer ${isSelect
                                ? answer === quesions[currentQuestion].answer && answer === opt
                                    ? 'bg-green-600 text-white'
                                    : answer === opt
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-200'
                                : 'bg-gray-200'
                                }`}><p className="font-medium text-base font-mono">{index + 1}{") "}<span>{opt}</span> </p></div>
                        })}
                    </div>
                </div>
                {isSelect && <Button handleNext={handleNext} text={answer === quesions[currentQuestion].answer ? 'Correct answer' : 'Wrong answer'} />}
            </div>}

            {/* if no questions */}
            {!loading && quesions.length === 0 &&
                <div className="flex justify-center">
                    <p className="font-medium font-mono text-lg">No questions found!</p>
                </div>
            }
        </>
    )
}

