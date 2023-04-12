import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { fetchMe } from "../api/auth";
import './styles/LoginRegister.css'

////////// this is how you sign up for our amazing website \\\\\\\\\\
const Register = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login-register-container">
      <h1> Register</h1>
      <form
        className="form-container"
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            console.log(password, username);
            // console.log("username & password:");
            const token = await registerUser(username, password);
            const user = await fetchMe(token);
            setToken(token);
            localStorage.setItem("token", token);
            localStorage.setItem("user", user.username);
            console.log("localStorage:", localStorage.getItem("token"));
            setUsername("")
            setPassword("")
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <div className="form-items-coontainer">
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
          <button className="form-item" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
