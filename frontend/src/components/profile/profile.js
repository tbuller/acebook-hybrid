import React, { useState } from "react";

const Profile = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [fullname, setFullname] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("/profiles", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fullname: fullname }),
    }).then(async (response) => {
      if (response.status === 201) {
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        navigate("/profile");
        console.log("We did it!");
      } else {
        navigate("/login");
        console.log("Back to the drawing board");
      }
    });
  };

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };

  const feed = () => {
    navigate("/posts");
  };

  return (
    <>
      <div>
        <h1>Profile Page</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Fullname"
          id="fullname"
          type="text"
          value={fullname}
          onChange={handleFullnameChange}
        />
        <input id="submit" type="submit" value="Submit" />
      </form>
      <div>
        <button onClick={feed}>Go to Feed</button>
      </div>
    </>
  );
};

export default Profile;
