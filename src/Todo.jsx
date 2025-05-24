import { v4 as uuidv4 } from "uuid";
import "./todo.css";
import { useState, useEffect } from "react";



  export default function Todo() {
    // Initialize todos from localStorage using lazy initialization
    const [todos, setTodos] = useState(() => {
      return JSON.parse(localStorage.getItem("todos") || "[]");
    });
    const [val, setVal] = useState("");

    // Use useEffect for localStorage updates
    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addNewTodo = (e) => {
      e.preventDefault();
      const trimmedVal = val.trim();
      if (trimmedVal) {
        setTodos(prevTodos => [...prevTodos, { task: trimmedVal, id: uuidv4() }]);
        setVal("");
      }
    };

    const deleteTodo = (id) => {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    return (
      <div className="container">
        <div className="inner">
          <form className="top" onSubmit={addNewTodo}>
            <input
              type="text"
              placeholder="Enter Task Here...."
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>

          <ul className="ul">
            {todos.map(({ id, task }) => (
              <li className="list" key={id}>
                <p>{task}</p>
                <button onClick={() => deleteTodo(id)}>
                  <i className="ri-delete-bin-line"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  
}
