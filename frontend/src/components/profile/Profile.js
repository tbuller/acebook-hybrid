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
      <form>
        <input placeholder="Fullname" id="fullname" type="text" />
      </form>
      <div>
        <button onClick={feed}>Go to Feed</button>
      </div>
    </>
  );
};

export default Profile;
