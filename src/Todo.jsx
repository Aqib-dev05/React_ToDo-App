import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./todo.css";

export default function Todo() {
  //  empty array is initial state of todo(list).it is filled with value of input on submitting the form
  // val is input value
  let [todos, setTodo] = useState([]);
  let [val, setVal] = useState("");


  // for submit todo to ul
  let addNewTodo = (e) => {
    e.preventDefault();
    if (val.trim() != "") setTodo([...todos, { task: val, id: uuidv4() }]);
    setVal(""); //set value to empty after submittion
  };

  //  for val state
  let updateVal = (e) => {
    setVal(e.target.value);
  };

  //for deleting a list task
  let deleteTodo = (id) => {
    console.log(id);
    let copy = todos.filter((todo) => todo.id != id);
    setTodo(copy);
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
                // individual items of i should have unique key.
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
