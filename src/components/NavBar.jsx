import React from "react";
import { Link } from "react-router-dom";
import { Logout } from "./Login";

export const Navbar = ({ setToken, user }) => {
  const LoginLogout = () => {
    if (localStorage.getItem("token")) {
      return (
        <Link
          to="/"
          id="Logout"
          onClick={() => {
            Logout(setToken);
          }}
        >
          Logout
        </Link>
      );
    } else {
      return (
        <Link to="Login" id="Login">
          {" "}
          Login{" "}
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
        <Link to="Register" id="Register">
          {" "}
          Register{" "}
        </Link>
      );
    }
  };

  return (
    <nav>
      <Link to="/" id="Home">
        {" "}
        Home{" "}
      </Link>
      <Link to="/PostForm" id="PostForm">
        {" "}
        PostForm{" "}
      </Link>

      <RegisterOrProfile />
      <LoginLogout />
    </nav>
  );
};
