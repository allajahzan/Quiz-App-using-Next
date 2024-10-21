import Image from "next/image"

export default function Navbar() {
    return (
        <div className="w-full p-5 px-40 flex gap-5 items-center bg-amber-400 shadow-xl">
            <Image src='/logo.svg' alt="logo" width='40' height='40' />
            <p className="text-white text-2xl font-bold font-mono">Quiz App</p>
        </div>
    )
}

