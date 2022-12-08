import React, { useState } from "react";
import "./LoginForm.css";

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status !== 201) {
      console.log("yay");
      navigate("/login");
    } else {
      console.log("oop");
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      // Nasty solution fix later
      setTimeout(() => {
        window.location.reload(false);
      }, 500);
      console.log("page to reload");

      navigate("/posts");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="Auth-form-container">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Log In</h3>
        <div className="form-group mt-3">
          <form onSubmit={handleSubmit} className="Auth-form">
            <div className="form-group mt-2">
              <label>Email Address</label>
              <input
                placeholder="Email"
                id="email"
                type="text"
                value={email}
                onChange={handleEmailChange}
                className="form-control mt-1"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                placeholder="Password"
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="form-control mt-1"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <input
                role="submit-button"
                id="submit"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
