import React, { useState } from "react";
import "./App.css";
//import { db } from "./firebase";

function App() {
  //todo Enter INput form
  const [toDos, setToDos] = useState([
    { id: 1, title: "task1", status: false },
    { id: 2, title: "task2", status: false },
  ]);
  //tasks in list of todos
  const [newTask, setNewTask] = useState([]);
  //edit tods useState
  const [updateData, setUpdateData] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (newTask) {
      let num = toDos.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDos([...toDos, newEntry]);
      setNewTask("");
    }
  };
  const deleteTask = (id) => {
    let newTasks = toDos.filter((task) => task.id !== id);
    setToDos(newTasks);
  };

  const markDone = (id) => {
    let newTasks = toDos.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDos(newTasks);
  };

  const cancelUpdate = () => {
    setUpdateData("");
  };

  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };
  const updateTask = () => {
    let filterRecords = [...toDos].filter((task) => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDos(updatedObject);
    setUpdateData("");
  };
  //List of todos html js array
  const todoArray = toDos.map((task) => (
    <li className={task.status ? "done" : " "} key={task.id}>
      {task.title}
      <button
        onClick={(e) => markDone(task.id)}
        className="btn todo_list_button"
      >
        Done
      </button>
      {task.status ? null : (
        <button
          className="btn todo_list_button"
          onClick={() =>
            setUpdateData({
              id: task.id,
              title: task.title,
              status: task.status ? true : false,
            })
          }
        >
          Edit
        </button>
      )}

      <button
        className="btn todo_list_button"
        onClick={() => deleteTask(task.id)}
      >
        Delete
      </button>
    </li>
  ));

  return (
    <div className="App">
      <h3>Todos</h3>
      <form>
        <div className="updateForm">
          <input
            value={updateData && updateData.title}
            onChange={(e) => changeTask(e)}
            className="tasks inputField"
          />
          <button onClick={updateTask} className="btn green">
            Update
          </button>
          <button className="btn red">Candel</button>
        </div>
      </form>
      <form>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="tasks inputField"
        />
        <button onClick={addTask} className="btn add">
          Add
        </button>
      </form>
      <div>
        <ul className="ul todo_list">{todoArray}</ul>
      </div>
    </div>
  );
}

export default App;
