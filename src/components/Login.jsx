import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Login.css'

const Register = () => {
    const navigate = useNavigate();
    const [input, setinput] = useState({ email: "", password: "" });

    const handlesubmit = e => {
        e.preventDefault();
        if (input.email == "") {
            alert("Enter your email")
            return
        }
        else if (input.password == "") {
            alert("Enter your password")
            return
        }
        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (input.email == "admin@gmail.com" && input.password == "12345") {
            const foundadmin = users.find(u => u.email == "admin@gmail.com" && u.password == "12345");
            foundadmin.loggedIn = true;
            localStorage.setItem("users", JSON.stringify(users));
            navigate("/AdminHome")
        } else {

            const founduser = users.find(u => u.email == input.email && u.password == input.password);
            if (founduser) {
                founduser.loggedIn = true;
                localStorage.setItem("users", JSON.stringify(users));
                navigate("/")
            } else {
                alert("Invalid email and password!")
            }
        }
    }

    const handleclick = e => {
        navigate("/Register")
    }

    return (
        <div className='log-con'>
            <form onSubmit={handlesubmit}>
                <p>Email</p>
                <input name='email' value={input.email} onChange={e => { setinput({ ...input, [e.target.name]: e.target.value }) }} placeholder='Enter Your Email' type="text" />
                <p>Password</p>
                <input name='password' value={input.password} onChange={e => { setinput({ ...input, [e.target.name]: e.target.value }) }} placeholder='Enter Your Password' type="text" />
                <p></p>
                <button className='log-btn'>Login</button>
                <p>New member. <span onClick={handleclick} >Register</span></p>
            </form>
        </div>
    )
}

export default Register