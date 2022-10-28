import { async } from "@firebase/util";
import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function NavHeading() {
  const { user, logOut } = UserAuth();
  const hanldeSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="nav_heading">
      <span className="text_context_sub">Todo List with Firebase</span>
      {user?.displayName ? (
        <Link to="/">
          <button className="btn red" onClick={hanldeSignOut}>
            sign Out
          </button>
        </Link>
      ) : (
        <Link to="/Signin">
          <button className="btn blue">sign In</button>
        </Link>
      )}
    </div>
  );
}
