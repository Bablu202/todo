import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  //list of to-dos data
  return (
    <div>
      <Todo />
    </div>
  );
}
