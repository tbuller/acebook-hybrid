import React, { useEffect, useState } from "react";
//import Feed from "../feed/Feed";

const Profile = ({ navigate }) => {
  const [fullname, setFullname] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("/profiles", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({fullname: fullname})
    }).then((response) => {
      console.log(response)
      if (response.status === 201) {
        navigate("/login");
        console.log("We did it!")
      } else {
        navigate("/signup");
        console.log("Back to the drawing board")
      }
    });
  };


  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  }

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
