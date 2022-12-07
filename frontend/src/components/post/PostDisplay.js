import React, { useEffect, useState } from "react";
import Post from "../post/Post";

const PostDisplay = ({ navigate }) => {
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
          console.log(data);
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  if (token) {
    return (
      <>
        <h2>Post Display</h2>

        <div id="feed" role="feed">
          {posts.map((post) => (
            <div>
              <Post post={post} key={post._id} />
              <button onClick={logout}>Logout</button>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default PostDisplay;
