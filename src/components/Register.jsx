import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Register.css";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice.js";
import { useSelector } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    loggedIn: false,
    bookedmovie: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.name === "") {
      alert("Enter your name");
      return;
    } else if (input.email === "") {
      alert("Enter your email");
      return;
    } else if (input.password === "") {
      alert("Enter your password");
      return;
    }

    if (users.find((u) => u.email === input.email)) {
      alert("User Already Exist");
    } else {
      const updatedusers = [...users, input];
      dispatch(setUser(updatedusers));
      setInput({
        name: "",
        email: "",
        password: "",
        loggedIn: false,
        bookedmovie: [],
      });
      navigate("/Login");
    }
  };

  const handleclick = (e) => {
    navigate("/Login");
  };

  return (
    <div className="reg-con">
      <form onSubmit={handleSubmit}>
        <p>Username</p>
        <input
          name="name"
          value={input.name}
          onChange={(e) => {
            setInput({ ...input, [e.target.name]: e.target.value });
          }}
          placeholder="Enter Your Name"
          type="text"
        />
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
          type="password"
          value={input.password}
          onChange={(e) => {
            setInput({ ...input, [e.target.name]: e.target.value });
          }}
          placeholder="Enter Your Password"
        />
        <p></p>
        <button type="submit" className="reg-btn">
          Register
        </button>
        <p>
          Existing member. <span onClick={handleclick}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
