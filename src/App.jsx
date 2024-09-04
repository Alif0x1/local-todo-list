/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable-next-line no-undef*/
import { useState , useEffect ,useRef } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import { v4 as uuidv4 } from 'uuid';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"




function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const isInitialRender = useRef(true);
  const [showFinished, setShowFinished] = useState(true)

   // Load todos from localStorage on component mount
  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);



  const saveToLS = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('Saving to localStorage:', todos);
  };




  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      saveToLS(todos);
    }
  }, [todos]);



  const ToggleFinished = (e) =>{
    setShowFinished(!showFinished)
    saveToLS()

  }


  const handleAdd = () => {
    // Check if the 'todo' input is empty
    if (todo.trim() === '') {
      // Show an alert if the input is empty
      alert('Please input a todo item');
      return; // Exit the function early to prevent adding an empty todo
    }

    // Add the new todo to the list
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }]);

    // Clear the input field
    setTodo('');

    saveToLS()



  };


  const handleEdit = (e, id) => {
  // Filter the todos to find the item with the matching id
  let t = todos.filter(i => i.id === id);

  // Set the state to the first item in the filtered array
  setTodo(t[0].todo);

  let newTodos = todos.filter(item=>
      item.id !== id
    );

  setTodos(newTodos)
  saveToLS()
}


  const handleDelete = (e,id) => {

    console.log(`i am id ${id}`)

    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    console.log(`The index is ${index}`)
    let newTodos = todos.filter(item=>
      item.id !== id
    );

    setTodos(newTodos)
    saveToLS()

  }
  const handleChange = (e) => {
    setTodo (e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }



  return (
  <>
  <Navbar/>
    <div className='mx-3 md:container md:mx-auto my-5 rounded-xl p-5  min-h-[80vh] md:w-[75%] bg-violet-200'>
    <Analytics />
    <SpeedInsights />
      <div className='' >
        <h1 className='text-center text-2xl font-bold'>iTask - Manage your todos at one place </h1>
        <h1 className='text-lg font-bold ms-1 '>Add a Todos</h1>
        <div className='flex justify-between items-center flex-col gap-4 '>
          <input onChange={handleChange} value={todo} type='text' className=' w-11/12 px-4  p-1 rounded-md text-black mx-1 ' placeholder='Add your todo here'/>
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 py-1 w-[89%]  border-dashed px-24 hover:opacity-90 text-sm font-bold rounded-lg'>save</button>
        </div>
        <span className="mit flex ms-2 me-2 my-3 justify-between">
        <h2 className='text-md font-bold me-1 ' >Your Todos</h2>
        
        <span className='flex items-center' >
        <input onChange={ToggleFinished} type='Checkbox' value={showFinished} ></input>
        <a className='ms-1 text-sm '>Show Finished </a>
        </span>
        
        </span>
        <div className="todos" >
        {todos.map(item=> {
         // eslint-disable-next-line react/jsx-key
         return (showFinished || !item.isCompleted ) && <div key={item.id} className="todo flex items-center bg-custom-pink p-1 m-3  rounded-lg justify-between">
          <div className="style flex overflow-auto">
          <input type="checkbox" name={item.id} onChange={handleCheckbox}  checked={item.isCompleted} className="ms-1"/>
          <div className={item.isCompleted?"line-through mx-3":"mx-3 "  }>{item.todo}</div>
          </div>
          <div className="buttons flex h-full gap-1 m-1   text-xs ">
            <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950  font-bold hover:opacity-90 p-2  rounded-md'><FiEdit /></button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 font-bold hover:opacity-90 p-2 rounded-md '><MdDelete /></button>
          </div>
        </div>

        })}
        </div>
      </div>
    </div>
  </>
  )
}

export default App
