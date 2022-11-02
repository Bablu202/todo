import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo";
import Signin from "./pages/Signin";
import AccountPage from "./pages/AccountPage";
import Home from "./pages/Home";
import NavHeading from "./components/NavHeading";
import { AuthContextProvider } from "./context/AuthContext";
import { Protected } from "./components/Protected";
export default function App() {
  //list of to-dos data
  /* return (
    <div>
      <Todo />
    </div>
  );*/
  return (
    <div>
      <AuthContextProvider>
        <NavHeading />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signin" element={<Signin />} />
          <Route
            path="/AccountPage"
            element={
              <Protected>
                <AccountPage />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}
