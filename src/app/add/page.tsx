"use client"

import React, { useReducer } from 'react'
import Navbar from '../components/Navbar/Navbar'

interface stateType {
  category: string,
  question: string,
  answer: string,
  option1: string,
  option2: string,
  option3: string,
  option4: string,
}

interface actionType {
  type: 'category' | 'question' | 'answer' | 'option1' | 'option2' | 'option3' | 'option4' | 'clear';
  payload: string;
}

function reducerFunction(prevState: stateType, action: actionType) {
  switch (action.type) {
    case 'category': return { ...prevState, category: action.payload }
    case 'question': return { ...prevState, question: action.payload }
    case 'answer': return { ...prevState, answer: action.payload }
    case 'option1': return { ...prevState, option1: action.payload }
    case 'option2': return { ...prevState, option2: action.payload }
    case 'option3': return { ...prevState, option3: action.payload }
    case 'option4': return { ...prevState, option4: action.payload }
    case 'clear': return {
      category: '',
      question: '',
      answer: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
    }
    default: return prevState
  }
}

function page() {

  const [state, dispatch] = useReducer(reducerFunction, {
    category: '',
    question: '',
    answer: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    const obj = {
      category: state.category,
      question: state.question,
      answer: state.answer,
      options: [
        state.option1,
        state.option2,
        state.option3,
        state.option4,
        state.answer,
      ]
    }

    event.preventDefault()
    fetch('http://localhost:5000/add', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(async (res) => {
        return await res.json()
      })
      .then((res) => {
        alert(res.msg)
        dispatch({ type: 'clear', payload: '' })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Navbar />
      <div className='flex justify-center'>
        <div className='p-5 px-40 w-full flex flex-col justify-center items-center'>
          <form className='flex gap-3 flex-col bg-gray-100 p-5 w-full mt-5 rounded-lg' onSubmit={handleSubmit}>
            <p className='font-mono font-medium text-lg text-center'>Add Questions</p>
            <select value={state.category || ""} onChange={(event) => { dispatch({ type: 'category', payload: event.target.value }) }} className='p-3 rounded-lg outline-none font-medium font-mono' name="" id="" required>
              <option value="" hidden >Select Category</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
            </select>
            <input onChange={(event) => { dispatch({ type: 'question', payload: event.target.value }) }} value={state.question} className='p-3 rounded-lg outline-none font-medium font-mono' placeholder='Question' type="text" required />
            <input onChange={(event) => { dispatch({ type: 'answer', payload: event.target.value }) }} value={state.answer} className='p-3 rounded-lg outline-none font-medium font-mono' placeholder='Answer' type="text" required />
            <input onChange={(event) => { dispatch({ type: 'option1', payload: event.target.value }) }} value={state.option1} className='p-3 rounded-lg outline-none font-medium font-mono' placeholder='Option1' type="text" required />
            <input onChange={(event) => { dispatch({ type: 'option2', payload: event.target.value }) }} value={state.option2} className='p-3 rounded-lg outline-none font-medium font-mono' placeholder='Option2' type="text" required />
            <input onChange={(event) => { dispatch({ type: 'option3', payload: event.target.value }) }} value={state.option3} className='p-3 rounded-lg outline-none font-medium font-mono' placeholder='Option3' type="text" required />
            <input onChange={(event) => { dispatch({ type: 'option4', payload: event.target.value }) }} value={state.option4} className='p-3 rounded-lg outline-none font-medium font-mono' placeholder='Option4' type="text" required />
            <button type='submit' className='p-3 rounded-lg outline-none font-medium font-mono text-white bg-amber-400'>Add</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default page
