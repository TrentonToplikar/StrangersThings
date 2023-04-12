import React, { useState } from "react";
import { LoginAPI } from "../api/LoginAPI";
import { fetchMe } from "../api/auth";
import './styles/LoginRegister.css'

////////// this is the login form that lets you put your username and password. very secure \\\\\\\\\\
export const LoginForm = ({ setToken, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-register-container">
      <h1> Sign in</h1>
        <form
        className="form-container"
          onSubmit={async (e) => {
            e.preventDefault();
            const token = await LoginAPI(username, password);
            const user = await fetchMe(token);
            // setUser(user.username);
            setToken(token);
            localStorage.setItem("token", token);
            localStorage.setItem("user", user.username);
            setUsername("")
            setPassword("")
          }}
          >
          <div className="form-items-container">
            <input
            className="form-item"
              value={username}
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
              ></input>
            <input
            className="form-item"
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              ></input>
            <button className="form-item" type="submit">Login</button>
          </div>
        </form>
      </div>
  );
};

////////// this logs you out and makes sure your token wont be on the storage anymore \\\\\\\\\\
export const Logout = (setToken) => {
  localStorage.clear();
  setToken();
};
