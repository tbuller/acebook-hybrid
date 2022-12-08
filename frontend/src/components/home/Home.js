import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = ({ navigate }) => {
  return (
    <>
      <head></head>
      <div class="container">
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
    </>
  );
};

export default Home;
