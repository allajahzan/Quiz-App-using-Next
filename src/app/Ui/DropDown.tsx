"use client"
import { useRouter } from "next/navigation"

function DropDown({ categories }: { categories: string[] }) {

    const router = useRouter()

    return (
        <select onChange={(event) => router.push(`/quiz/${event.target.value}`)} className='p-3 rounded-lg outline-none font-medium font-mono w-full' name="category" required>
            <option value="" hidden>Select Category</option>
            {categories.map((cat: string, index: number) => {
                return <option key={index} value={cat}>{cat}</option>
            })}
        </select>
    )
}

export default DropDown
