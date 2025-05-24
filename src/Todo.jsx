import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./todo.css";

export default function Todo() {
  // Initialize todos from localStorage or empty array if nothing stored
  let [todos, setTodo] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  let [val, setVal] = useState("");

  // Save todos to localStorage whenever todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  let addNewTodo = (e) => {
    e.preventDefault();
    if (val.trim() !== "") {
      const newTodos = [...todos, { task: val, id: uuidv4() }];
      setTodo(newTodos);
      // Remove this as it's handled by useEffect
      // localStorage.setItem("todos", JSON.stringify(newTodos));
    }
    setVal("");
  };

  let updateVal = (e) => {
    setVal(e.target.value);
  };

  let deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodo(newTodos);
    // Remove this as it's handled by useEffect
    // localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <>
      <div className="container">
        <div className="inner">
          <form className="top" onSubmit={addNewTodo}>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter Task Here...."
              value={val}
              onChange={updateVal}
            />
            <button>Add</button>
          </form>

          <ul className="ul">
            {todos.map((todo) => {
              return (
                <li className="list" key={todo.id}>
                  <p>{todo.task}</p>
                  <button
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
