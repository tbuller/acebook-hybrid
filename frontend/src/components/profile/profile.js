import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import UploadAndDisplayImage from "./UploadPhoto";

const Profile = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUserInfo] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [password, setPassword] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [isChanging, setIsChanging] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);


  useEffect(() => {
    if (token) {
      getUserDoc();
      getUserPosts();
    }
  }, [isChanging]); //add dependency into the blank array here to get page refreshing automatically

  const getUserDoc = () => {
    fetch("/profiles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setUserInfo(data.userInfo);
      });
  };

  const getUserPosts = () => {
    fetch("/myPosts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (data2) => {
        window.localStorage.setItem("token", data2.token);
        setToken(window.localStorage.getItem("token"));
        setUserPosts(data2.posts);
        setIsChanging(false);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsChanging(true);
    let fieldUpdate;
    if (fullname.length > 0) {
      fieldUpdate = { fullname: fullname };
    } else if (email.length > 0) {
      fieldUpdate = { email: email };
    } else if (password.length > 0) {
      fieldUpdate = { password: password };
    } else if (aboutMe.length > 0) {
      fieldUpdate = { aboutMe: aboutMe };
    }
    fetch("/profiles", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fieldUpdate), //add more fields here
    }).then(async (response) => {
      if (response.status === 201) {
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        navigate("/profile");
      } else {
        navigate("/login");
      }
    });
  };

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAboutMeChange = (event) => {
    setAboutMe(event.target.value);
  };

  const feed = () => {
    navigate("/posts");
  };

/////1 switch what's presented to be selectedImage, which starts off being user.photo until changed
  ////2 

  if (token) {
    return (
      <>
        <div>
          <h1>Profile Page</h1>
          <button onClick={feed}>Go to Feed</button>
        </div>
        <img src={user.photo} width={300} height={300} alt="default" />
        {/* {setSelectedImage(user.photo)} */}
        {/* <img
          src={URL.createObjectURL(selectedImage)}
          width={300}
          height={300}
          alt="default"
        /> */}
        {/* {URL.createObjectURL(selectedImage)} */}
        <h2>Hello, {user.fullname}!</h2>
        {/* <UploadAndDisplayImage key="something" /> */}
        <p>Upload a new profile photo</p>
        {selectedImage && (
          <div>
            <img
              alt="not found"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);
            //somehow update what I need on the User document in Mongo with a fetch POST request with photo: event.target.files[0] as a string
            setSelectedImage(event.target.files[0]);
          }}
        />
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter new name..."
            id="fullname"
            type="text"
            value={fullname}
            onChange={handleFullnameChange}
          />
          <input id="submit" type="submit" value="Update your profile name" />
        </form>
        <div>
          <p>You are logged in on: {user.email}</p>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Enter new email..."
              id="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              id="submit"
              type="submit"
              value="Update your email address"
            />
          </form>
          <p>
            Shhh, don't tell anyone, but your current password is:{" "}
            {user.password}
          </p>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Enter new password..."
              id="password"
              type="text"
              value={password}
              onChange={handlePasswordChange}
            />
            <input id="submit" type="submit" value="Update your password" />
          </form>
          <p>
            What you're currently telling other people about yourself:{" "}
            {user.aboutMe}
          </p>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Enter new bio..."
              id="aboutMe"
              type="text"
              value={aboutMe}
              onChange={handleAboutMeChange}
            />
            <input
              id="submit"
              type="submit"
              value="Update your About Me info"
            />
          </form>
        </div>
        <div id="myPostFeed" role="myFeed">
          <p></p>
          BELOW ARE ALL MY POSTS
          <p></p>
          {userPosts.map((post) => (
            <div>
              <Post post={post} key={post._id} />
              <p></p>
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default Profile;
