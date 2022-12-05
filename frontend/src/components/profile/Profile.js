import React, { useEffect, useState } from "react";
//import Feed from "../feed/Feed";

const Profile = ({ navigate }) => {

  const feed = () => {
    navigate("/posts");
  };

  return (
    <>
      <div>
        <h1>Profile Page</h1>
      </div>
      <div>
        <body>Hi</body>
        <button onClick={feed}>Go to Feed</button>
      </div>
    </>
  );
};

export default Profile;
