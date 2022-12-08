
import "./App.css";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
import NewPostForm from "../post/NewPostForm";
import Profile from "../profile/profile";
import Home from "../home/Home";
import React, { useState } from "react";
import Feed from "../feed/Feed";
import { useNavigate, Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/profile" element={<Profile />}></Route>
      <Route exact path="posts/" element={<Feed />}></Route>
      <Route exact path="/login" element={<LoginForm />}></Route>
      <Route exact path="/signup" element={<SignUpForm />}></Route>
      <Route exact path="/new_post" element={<NewPostForm />}></Route>

    </Routes>
  );
};


export default App;

      // <Route path="/profile" element={<Profile navigate={useNavigate()} />} />
      // <Route path="/posts" element={<Feed navigate={useNavigate()} />} />
      // <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
      // <Route path="/signup" element={<SignUpForm navigate={useNavigate()} />} />
      // <Route
      //   path="/new_post"
      //   element={<NewPostForm navigate={useNavigate()} />}
      // />
