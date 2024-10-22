import Navbar from "@/app/components/Navbar/Navbar"
import RestartButton from "@/app/Ui/RestartButton"

async function page({ params }: { params: { score: string, category: string } }) {

  const res = await fetch(`http://localhost:5000/questions/${params.category}`, { cache: 'force-cache' ,next:{revalidate:30} })
  const data = await res.json()

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center p-5 px-40 pt-10">
        <p className="text-black font-medium text-xl font-mono">Total score you got in {params.category} : {params.score} / {data.quiz.length >= 10 ? 10 * 5 : data.quiz.length * 5}</p>
        <RestartButton />
      </div>
    </>
  )
}

export default page
