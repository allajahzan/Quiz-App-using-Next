import Navbar from "../../components/Navbar/Navbar";
import Question from "../../Ui/QuestionCard";

export default async function Home({ params }: { params?: { category: string[] } }) {

    const param = params?.category?.[0]
    let data;
    if (!param) {
        data = { quiz: [] }
    } else {
        const res = await fetch(`http://localhost:5000/questions/${param}`, { cache: 'force-cache',next:{revalidate:30} })
        data = await res.json()
    }

    return (
        <>
            <Navbar />
            <div className="p-5 px-40 flex ">
                <div className="bg-gray-100 mt-5 w-full rounded-lg p-3">
                    <Question quiz={data.quiz} category={params?.category?.[0]} />
                </div>
            </div>
        </>
    );
}
