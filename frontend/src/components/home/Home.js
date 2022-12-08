import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = ({ navigate }) => {
  return (
    <div className="Auth-form-container">
      <div className="Auth-form-content">
        <h1>Welcome to the Mineshaft!</h1>
      </div>
      <div>
        <body class="container">
          <p>Select below where you'd like to go</p>
          <a href="/login">
            <button>Login</button>
          </a>
          <a href="/signup">
            <button>Sign up</button>
          </a>
        </body>
      </div>
    </div>
  );
};

export default Home;
