import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  //list of to-dos data
  return (
    <div>
      <div>
        <Todo />
        <Link to="/Contact">Contact</Link>
      </div>

      <Route path="./" element={About} />
      <Route path="./contact" element={Contact} />
    </div>
  );
}
