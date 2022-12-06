import React, { useEffect, useState } from "react";

const Profile = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUserInfo] = useState("");
  const [password, setPassword] = useState("");
  //add more consts here

  useEffect(() => {
    if (token) {
      fetch("/profiles", {
        //need a new get route or not? and what function will handle and return?
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setUserInfo(data.userInfo); //  .user might not be right, check response
        });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let fieldUpdate;
    if (fullname.length > 0) {
      fieldUpdate = { fullname: fullname };
    } else if (email.length > 0) {
      fieldUpdate = { email: email };
    } else if (password.length > 0) {
      fieldUpdate = { password: password };
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

  const feed = () => {
    navigate("/posts");
  };
  if (token) {
    return (
      <>
        <div>
          <h1>Profile Page</h1>
          <button onClick={feed}>Go to Feed</button>
        </div>
        <p>Hello, {user.fullname}!</p>
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
              id="fullname"
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
              id="fullname"
              type="text"
              value={email}
              onChange={handlePasswordChange}
            />
            <input id="submit" type="submit" value="Update your password" />
          </form>
          <p>
                    Below you will soon see: A field 'About me' providing a Bio (already in Schema)
                    - A list of the posts I have made
                    - A list of my friends
                    - And hopefully get this page autorefreshing content after update.
          </p>
        </div>
      </>
    );
  }
};

export default Profile;
