import { collection, onSnapshot, QuerySnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { query } from "firebase/firestore";
import { db } from "../firebase";
export default function Todo() {
  //let getLocalData = JSON.parse(localStorage.getItem("toDos"));

  // todo list from local storege
  //const [toDos, setToDos] = useState(getLocalData);
  const [toDos, setToDos] = useState([]);
  //localStorage.setItem("toDos", JSON.stringify(toDos));
  // temp input text input blank
  const [inputTodo, setInputTodo] = useState("");

  // temp input data in update task
  const [editInputData, setEditInputData] = useState("");

  //firebase storage

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      let todoArray = [];
      QuerySnapshot.forEach((doc) => {
        todoArray.push({ ...doc.data(), id: doc.id });
      });
      setToDos(todoArray);
      console.log(toDos);
    });
    return () => unsub();
  }, []);

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
  };
  //delete todos from the data
  const deleteTodo = (todoID) => {
    let afterDeleteTasks = [...toDos].filter((each) => each.id !== todoID);
    setToDos(afterDeleteTasks);
  };
  //add button Handler
  const addInputValue = (e) => {
    e.preventDefault();
    if (inputTodo) {
      let idToNewToDo = toDos.length + 1;
      let newEntry = { id: idToNewToDo, title: inputTodo, status: false };
      setToDos([...toDos, newEntry]);
      setInputTodo("");
    }
  };
  //update editied TODO Task
  const changeEditedTask = (e) => {
    let newTask = {
      id: editInputData.id,
      title: e.target.value,
      status: editInputData.status ? true : false,
    };
    setEditInputData(newTask);
    console.log(newTask);
  };
  //Update list after edit Update Handler
  const updateList = () => {
    console.log(editInputData);
    let filterToDos = [...toDos].filter((each) => each.id !== editInputData.id);

    let afterUpdate = [...filterToDos, editInputData];
    setToDos(afterUpdate);
    console.log(editInputData);
    setEditInputData("");
  };
  //calcel Button Handler
  const cancelUpadate = (e) => {
    e.preventDefault();
    setEditInputData("");
  };
  // from TODO list mapping and diplaying tasks
  const todoListMapping = toDos.map((each) => (
    <div className="todo_List_main" key={each.id}>
      <li className={each.status ? "done" : ""} key={each.id}>
        {each.title}
        <div className="todo_list_button ">
          {/*DONE Button*/}
          <button className="btn green" onClick={(e) => markDone(each.id)}>
            done
          </button>
          {/*EDIT Button*/}
          {!each.status ? (
            <button
              className="btn"
              onClick={() =>
                setEditInputData({
                  id: each.id,
                  title: each.title,
                  status: each.status ? true : false,
                })
              }
            >
              edit
            </button>
          ) : (
            ""
          )}
          {/*DELETE Button*/}
          <button className="btn red" onClick={(e) => deleteTodo(each.id)}>
            delete
          </button>
        </div>
      </li>
    </div>
  ));

  //HTML that returns into Canvas
  return (
    <div className="App_header">
      <h3>ToDos</h3>
      {editInputData && editInputData ? (
        <div className="input_and_button">
          <form>
            <input
              value={editInputData && editInputData.title}
              onChange={(e) => changeEditedTask(e)}
            />
            <button className="btn green" onClick={updateList}>
              Update
            </button>
            <button className="btn red" onClick={() => cancelUpadate}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className="input_and_button">
          <form>
            <input
              value={inputTodo}
              onChange={(e) => {
                setInputTodo(e.target.value);
              }}
            />
            {/*ADD Button*/}
            <button onClick={addInputValue} className="btn">
              add
            </button>
          </form>
        </div>
      )}
      {toDos && toDos.length ? "" : "No todos .. "}
      <ul className="todo_list">{todoListMapping}</ul>
    </div>
  );
}
