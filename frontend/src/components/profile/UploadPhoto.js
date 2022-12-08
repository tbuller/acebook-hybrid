import React, { useState } from "react";
import axios from "axios";

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const updatePic = (newURL) => {
    let fieldUpdate = { photo: `./${newURL}` };
    // need to save new image to folder here
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
      } else {
        console.log("error updating photo");
      }
    });
    setSelectedImage(null);
    window.location.reload(false);
  };

  return (
    <div>
      <p>Upload a new profile photo</p>
      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            height={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Revert</button>
          <button onClick={() => updatePic(selectedImage.name)}>
            Switch to this photo
          </button>
        </div>
      )}
      <input
        type="file"
        name="myImage"
        accept=".png, .jpg, .jpeg"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
          console.log(event.target.files[0].name);
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;

//
