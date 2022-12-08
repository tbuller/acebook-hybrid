import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = ({ navigate }) => {
  const signup = () => {
    navigate("/signup");
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h1>Welcome to the Mineshaft!</h1>
        </div>
        <div>
          <p>Select below where you'd like to go</p>
          <button onClick={login}>Login</button>
          <button onClick={signup}>Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Home;
