// todo make buttons have unique keys (like buttons)

import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import NewCommentForm from "../post/NewComment";
import NewPostForm from "../post/NewPostForm";


const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  

  useEffect(() => {
    if (token) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
  }, []); //how to change this from a referenced other component? eg in NewCommentForm

  // const logout = () => {
  //   window.localStorage.removeItem("token");
  //   navigate("/login");
  // };

  const like = (post) => {
    console.log(`liked ${post._id}`);

    fetch("/likes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post_id: post._id }),
    });

    fetch("/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setPosts(data.posts);
      });
  };

  if (token) {
    return (
      <>
        <h1>Post your thoughts here</h1>
        <NewPostForm key="someKey" />
        <h2>Your feed</h2>
        {/* <button onClick={logout}>Logout</button> */}
        <div id="feed" role="feed">
          {posts.map((post) => (
            <div>
              <Post post={post} key={post._id} />
              <NewCommentForm post={post} key={post._id} />
              <button
                key={`like button ${post._id}`}
                onClick={() => {
                  like(post);
                }}
              >
                Like
              </button>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default Feed;
