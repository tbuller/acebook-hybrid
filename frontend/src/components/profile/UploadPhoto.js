import React, { useState } from "react";

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const updatePic = (newImageFile) => {
    let fieldUpdate = { photo: `./${newImageFile.name}` };

    if (newImageFile.size > 307200) {
      alert("That file is TOO LARGE: max size is a measly 300Kb");
      setSelectedImage(null);
      return;
    }

    fetch("/profiles", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fieldUpdate),
    }).then(async (response) => {
      if (response.status === 201) {
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
      } else {
        console.log("error saving photo ref");
      }
    });

    // add the file to the FormData object
    const fd = new FormData();
    fd.append("photo", newImageFile);

    fetch("/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fd,
    }).then(async (response) => {
      if (response.status === 201) {
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
      } else {
        console.log("error saving photo ref");
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
          <button onClick={() => updatePic(selectedImage)}>
            Switch to this photo
          </button>
        </div>
      )}
      <input
        type="file"
        name="myImage"
        accept="image/*"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;

//
