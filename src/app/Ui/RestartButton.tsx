"use client"
import { useRouter } from "next/navigation"

function RestartButton() {

    const router = useRouter()
    const handleRouter = () => {
        router.push('/')
    }

    return (
        <button onClick={handleRouter} className="bg-amber-400 text-white p-2 px-5 mt-5 rounded-lg font-mono font-medium">Restart</button>
    )
}

export default RestartButton
