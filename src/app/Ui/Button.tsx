"use client"

export default function Button({ handleNext, text }: { handleNext: () => void, text: string }) {

    return (
        <div className="w-full flex justify-end p-2 py-2">
            <div className="flex items-center justify-end  gap-5 w-full">
                {/* <p className={`font-mono text-base p-2 px-5 font-bold ${text==='Wrong answer'? 'text-red-600' : 'text-green-500'}`}>{text}{"!"}</p> */}
                <button onClick={handleNext} className="p-2 px-5 bg-amber-400 text-white rounded-lg font-medium font-mono">Next</button>
            </div>
        </div>
    )
}

