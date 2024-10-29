import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users);
  const [input, setInput] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.email === "") {
      alert("Enter your email");
      return;
    } else if (input.password === "") {
      alert("Enter your password");
      return;
    }

    if (input.email === "admin@gmail.com" && input.password === "12345") {
      const foundAdmin = users.find(
        (u) => u.email === "admin@gmail.com" && u.password === "12345"
      );
      if (foundAdmin) {
        const updatedAdmin = { ...foundAdmin, loggedIn: true };
        dispatch(
          setUser(
            users.map((u) => (u.email === "admin@gmail.com" ? updatedAdmin : u))
          )
        );
        navigate("/AdminHome");
      } else {
        alert("Admin user not found.");
      }
    } else {
      const foundUser = users.find(
        (u) => u.email === input.email && u.password === input.password
      );
      if (foundUser) {
        const updatedUser = { ...foundUser, loggedIn: true };
        dispatch(
          setUser(users.map((u) => (u.email === input.email ? updatedUser : u)))
        );
        navigate("/");
      } else {
        alert("Invalid email and password!");
      }
    }
  };

  const handleRegisterClick = (e) => {
    navigate("/Register");
  };

  return (
    <div className="log-con">
      <form onSubmit={handleSubmit}>
        <p>Email</p>
        <input
          name="email"
          value={input.email}
          onChange={(e) => {
            setInput({ ...input, [e.target.name]: e.target.value });
          }}
          placeholder="Enter Your Email"
          type="text"
        />
        <p>Password</p>
        <input
          name="password"
          value={input.password}
          onChange={(e) => {
            setInput({ ...input, [e.target.name]: e.target.value });
          }}
          placeholder="Enter Your Password"
          type="password"
        />
        <p></p>
        <button type="submit" className="log-btn">
          Login
        </button>
        <p>
          New member. <span onClick={handleRegisterClick}>Register</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
