import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const location = useLocation();

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };
  
  if (token) {
    return (
      <>
        <Nav>
          <Bars />

          <NavMenu>
            <NavLink to="/posts" activeStyle>
              My Feed
            </NavLink>
            <NavLink to="/new_post" activeStyle>
              New Post
            </NavLink>
            <NavLink to="/profile" activeStyle>
              My Profile
            </NavLink>
            <NavLink to="/signup" activeStyle>
              Sign Up
            </NavLink>
            {/* Second Nav */}
            {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
          </NavMenu>
          <NavBtn>
            <NavBtnLink to="/home" onClick={logout}>
              Log out
            </NavBtnLink>
          </NavBtn>
        </Nav>
      </>
    );
  }
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to="/signup" activeStyle>
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/login" >
           Log In
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
