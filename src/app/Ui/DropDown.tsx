"use client"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect } from "react"

function DropDown({ categories }: { categories: string[] }) {

    const router = useRouter()

    const handleChange = (event:ChangeEvent<HTMLSelectElement>) =>{ 
        event.target.value!==localStorage.getItem('category')? localStorage.clear() : null 
        router.push(`/quiz/${event.target.value}`)
    }

    return (
        <select onChange={handleChange} className='p-3 rounded-lg outline-none font-medium font-mono w-full' name="category" required>
            <option value="" hidden>Select Category</option>
            {categories.map((cat: string, index: number) => {
                return <option key={index} value={cat}>{cat}</option>
            })}
        </select>
    )
}

export default DropDown
