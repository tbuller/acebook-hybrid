import React, { useEffect, useState } from "react";

const Post = ({ post }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUserInfo] = useState("");
  const [commenter, setCommenterInfo] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [commenterPhoto, setCommenterPhoto] = useState("");

  let defaultJsonObj = {
    id: "bogusID",
    email: "default@g.com",
    password: "1234",
    fullname: "OOPS, OLD DATA ISSUE",
  };



  useEffect(() => {
    console.log("use Effect is triggering in post.js react component");
    fetch("/posterLookup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userLookup: post.posterUserId }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));

        if (data.userInfo === null) {
          setUserInfo(defaultJsonObj);
          setUserPhoto("./default.jpeg");
        } else if (data.userInfo) {
          setUserInfo(data.userInfo);
          if (!data.userInfo.photo) {
            setUserPhoto("./default.jpeg");
          } else {
            setUserPhoto(data.userInfo.photo);
          }
        }
      });

    
      // let noCommentId = "638ddffee9f4f6177b89eeee"; //THIS LINE IS A PROBLEM

    if (post.comments.length > 0) {
      let commenterId = post.comments[post.comments.length - 1].user;
      
    
    
    
      fetch("/posterLookup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userLookup: commenterId,
        }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          if (data.userInfo === null) {
            setCommenterInfo(defaultJsonObj);
          } else if (data.userInfo) {
            setCommenterInfo(data.userInfo);
            if (!data.userInfo.photo) {
              setCommenterPhoto("./default.jpeg");
            } else {
              setCommenterPhoto(data.userInfo.photo);
            }
          }
        });
    
    }
    
    
    
    
    
    
  }, []);

  const renderRecentComment = (post) => {
    if (post.comments.length > 0)
      return (
        <article data-cy="post" key={post._id}>
          Latest:
          {/* {post.comments[post.comments.length - 1].user} says:{" "} */}
          <img
            alt="not found"
            width={"30px"}
            height={"30px"}
            src={commenterPhoto}
          />
          {commenter.fullname} says:
          {post.comments[post.comments.length - 1].comment}{" "}
          {new Date(post.comments[post.comments.length - 1].time)
            .toString()
            .slice(0, 28)}
        </article>
      );
    return null;
  };

  return (
    <div>
      <article data-cy="post" key={post._id}>
        {/* {getUserInfo(post.posterUserId)};{post.posterUserId} */}
        <img alt="not found" width={"40px"} height={"40px"} src={userPhoto} />
        {user.fullname}
      </article>
      <article data-cy="post" key={post._id}>
        {post.message}
      </article>
      <article data-cy="post" key={post._id}>
        {new Date(post.time).toString().slice(0, 28)}
      </article>
      <article>{`${post.likes.length} likes!`}</article>
      {renderRecentComment(post)}
    </div>
  );
};

export default Post;
