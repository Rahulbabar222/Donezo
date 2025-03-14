import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import { v4 as uuidv4 } from 'uuid';


function App() {

    const [todos, setTodos] = useState(() => {
        // Load from localStorage on mount
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [todo, setTodo] = useState("")

    const [editTodoId, setEditTodoId] = useState("");
    const [editText, setEditText] = useState("");

    const [filter, setFilter] = useState("all")

    //Filtering Todos
    const filteredTodos = () => {
        let tempTodos = [...todos];
        if (filter === "active") {
            return tempTodos.filter(todo => !todo.isCompleted); 
        } else if (filter === "completed") {
            return tempTodos.filter(todo => todo.isCompleted); 
        } else {
            //sort: Incomplete first, Completed last
            return tempTodos.sort((a, b) => a.isCompleted - b.isCompleted);
        }
    };
    
    // Auto-save todos to localStorage when they change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
    
    const handleChange = (e) => {
        setTodo(e.target.value)
    };

    const handleAdd = () => {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
        setTodo("");
    };

    const handleDelete = (uid) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
        if (!confirmDelete) return;

        let modifiedTodos = todos.filter(todo => todo.id !== uid);
        setTodos(modifiedTodos);
    };

    const handleCheckbox = (e) => {
        const uid = e.target.name;
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === uid ? { ...todo, isCompleted: !todo.isCompleted } : todo
            )
        );
    };

    const handleEditClick = (task) => {
        setEditTodoId(task.id);
        setEditText(task.todo);
    };

    const handleSave = (uid) => {
        const confirmSave = window.confirm("Do you want to save new changes?");
        if (!confirmSave) {
            setEditTodoId("");
            return;
            
        } else {
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo.id === uid ? { ...todo, todo: editText } : todo
                )
            );
            setEditTodoId("");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container sm:mx-auto bg-[#fffbf6] rounded-3xl p-5 my-5 space-y-5 sm:w-[80vw] ">

                {/* title */}
                <div className="title text-center">
                    <h1 className=' text-xl font-bold'>Donezo - Less Stress, More Donezo</h1>
                </div>

                {/* Add todo section */}
                <div className="addToDo bg-[#f1ece6] rounded-full sm:w-full flex justify-between">
                    <input onChange={handleChange} value={todo} required className='w-full focus:outline-none px-5' type="text" name="todo" placeholder='What do you need to do?' />
                    <button onClick={handleAdd} disabled={!todo.trim()} className=' disabled:bg-gray-500 text-white rounded-r-full py-3 px-5 bg-[#76b7cd] hover:bg-[#8bc5da]'>ADD</button>
                </div>

                {/*View Buttons */}
                <div className="flex justify-center items-center gap-2 px-5">
                    <button onClick={()=>setFilter("all")} className={` px-4 hover:bg-gray-100 rounded-full ${filter === "all" ? "text-zinc-700 font-bold" : "text-zinc-400"}`}>All</button>
                    <button onClick={()=>setFilter("active")} className={` px-4 hover:bg-gray-100 rounded-full ${filter === "active" ? "text-zinc-700 font-bold" : "text-zinc-400"}`}>Active</button>
                    <button onClick={()=>setFilter("completed")} className={` px-4 hover:bg-gray-100 rounded-full ${filter === "completed" ? "text-zinc-700 font-bold" : "text-zinc-400"}`}>Completed</button>
                </div>

                {/* Todos list Section */}
                <div className="tasks bg-[#f1ece6] rounded-3xl sm:w-full h-[52vh] px-5 py-3 overflow-y-auto">

                    {/* empty message */}
                    {filteredTodos().length === 0 && (
                        <p className='text-zinc-400 text-xl text-center py-20'>
                            {filter === "all"
                                ? "All clear! Ready to conquer your next task?"
                                : filter === "active"
                                ? "No pending tasks! Time to relax or add new ones."
                                : filter === "completed"
                                ? "Finish strong! Mark tasks as done to see them here."
                                : ""}
                        </p>
                    )}

                    {/* Todo List*/}
                    <TodoList
                    filteredTodos={filteredTodos}
                    handleCheckbox={handleCheckbox}
                    editTodoId={editTodoId}
                    editText={editText}
                    handleEditClick={handleEditClick}
                    setEditText={setEditText}
                    handleDelete={handleDelete}
                    handleSave={handleSave}
                    />

                </div>
            </div>
            <Footer/>
        </>
    )
}

export default App
