/*
import { useState } from 'react'
import {
  useQuery,
  useMutation,
} from 'react-query'
import NavBar from "./components/NavBar/navbar";

interface Data {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const fetchTodoList = () => {
    return fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then((json: Data) => json)
  }
  const { isLoading, isError, data, error } = useQuery('todos', fetchTodoList)
  console.log(data?.id)
  
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) { // Uncommented error handling code
    return <span>Error: {error.message}</span>
  }

  return (
    <>
     <NavBar/>
    </>
  )
}

export default App
*/
import { useEffect } from "react";
import Navbar from "./Components/Navbar";
import { useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const temp = localStorage.getItem('access_token')
    console.log(temp)
    if (temp !== null) {
      navigate('/main')
    }
  }, [localStorage]);
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

