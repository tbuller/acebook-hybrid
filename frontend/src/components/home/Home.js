import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const Home = ({ navigate }) => {
  return (
    <>
      <div>
        <h1>Hello there!</h1>
      </div>
      <div>
        <body>
          <p>Select below where you'd like to go</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
        </body>
      </div>
    </>
  );
};

export default Home;
