import React from "react";
import Todo from "../components/Todo";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AccountPage() {
  const { logOut, user } = UserAuth();
  const hanldeSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <h4>Welcome, {user?.displayName}</h4>
        <Todo />
        <button onClick={hanldeSignOut} className="btn red">
          log Out
        </button>
      </div>
    </div>
  );
}
