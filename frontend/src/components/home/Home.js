import React, { useEffect, useState } from "react";
import styles from "./Home.css"

const Home = ({navigate}) => {    
  return (
    <>
    <head>
    </head>
    <div>
      <h1>Hello there!</h1>
    </div>
    <div>
        <body>
            <p>Select below where you'd like to go</p>
            <a href="/login"><button>Login</button></a>
            <a href="/signup"><button>Sign up</button></a>
        </body>
    </div>
    </>
  );
}



export default Home;
