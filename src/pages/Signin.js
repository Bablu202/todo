import React, { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (user != null) {
      navigate("/AccountPage");
    }
  }, [user]);

  return (
    <div>
      <h2 className="sign_in">Sign in </h2>
      <div className="google_btn default">
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default Signin;
