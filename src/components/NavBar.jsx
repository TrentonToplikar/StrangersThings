import React from "react";
import { Link } from "react-router-dom";
import { Logout } from "./Login";
import "./styles/NavBar.css";

////////// this is the nav bar with all my funky functions that determine what shows up  \\\\\\\\\\
export const Navbar = ({ setToken, user }) => {
  const LoginLogout = () => {
    if (localStorage.getItem("token")) {
      return (
        <Link
          to="/"
          id="logout"
          onClick={() => {
            Logout(setToken);
          }}
        >
          Logout
        </Link>
      );
    } else {
      return (
        <Link to="Login" id="login">
          {" "}
          Login{" "}
        </Link>
      );
    }
  };
  const Form = () => {
    if (localStorage.getItem("token")) {
      return (
        <Link to="/PostForm" id="postForm">
          {" "}
          PostForm{" "}
        </Link>
      );
    }
  };

  const RegisterOrProfile = () => {
    if (localStorage.getItem("token")) {
      return (
        <Link to="Profile" id="profile">
          {" "}
          {localStorage.getItem("user")}{" "}
        </Link>
      );
    } else {
      return (
        <Link to="Register" id="register">
          {" "}
          Register{" "}
        </Link>
      );
    }
  };

  return (
    <div id="navbar">
      <nav>
        <Link to="/" id="home">
          {" "}
          Home{" "}
        </Link>

        <Form />
      </nav>
      <img id="logo" src="Stranger_Things_logo.png" />
      <nav>
        <RegisterOrProfile />
        <LoginLogout />
      </nav>
    </div>
  );
};
