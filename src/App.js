import React, { useState } from "react";
import "./App.css";
export default function App() {
  //list of to-dos state
  const [toDos, setToDos] = useState([
    { id: 1, title: "react", status: false },
    { id: 2, title: "to FrontEnd", status: false },
  ]);

  const [inputTodo, setInputTodo] = useState("");
  //Mark todo is Done
  let markDone = (todoID) => {
    let newTasks = toDos.map((each) => {
      if (each.id === todoID) {
        return {
          ...toDos,
          status: !each.status,
          id: each.id,
          title: each.title,
        };
      }
      return each;
    });
    setToDos(newTasks);
    console.log(newTasks);
  };
  const deleteTodo = (todoID) => {};
  const todoListMapping = toDos.map((each) => (
    <li className={each.status ? "done" : ""} key={each.id}>
      {each.title}
      <div className="todo_list_button ">
        <button className="btn " onClick={(e) => markDone(each.id)}>
          done
        </button>
        <button className="btn ">edit</button>
        <button className="btn " onClick={(e) => deleteTodo(each.id)}>
          delete
        </button>
      </div>
    </li>
  ));
  //add button
  const addInputValue = (e) => {
    e.preventDefault();
    if (inputTodo) {
      let idToNewToDo = toDos.length + 1;
      let newEntry = { id: idToNewToDo, title: inputTodo, status: false };
      setToDos([...toDos, newEntry]);
      setInputTodo("");
    }
  };
  return (
    <div className="App_header">
      <h3>ToDos</h3>
      <form>
        <input
          value={inputTodo}
          onChange={(e) => {
            setInputTodo(e.target.value);
          }}
        />
        <button onClick={addInputValue} className="btn">
          add
        </button>
      </form>
      <ul className="todo_list">{todoListMapping}</ul>
    </div>
  );
}
