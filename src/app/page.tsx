import Navbar from "./components/Navbar/Navbar";
import DropDown from "./Ui/DropDown";
export default async function Home() {

  const res = await fetch('http://localhost:5000/categories', { next: { revalidate: 120 } })
  const data = await res.json()

  return (
    <>
      <Navbar />
      <div className="p-5 px-40 flex ">
        <div className="bg-gray-100 mt-5 w-full flex flex-col items-center rounded-lg p-3">
          <p className='font-mono font-medium text-lg text-center mb-5'>Select category</p>
          <DropDown categories={data.categories} />
        </div>
      </div>
    </>
  );
}
