import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Register.css'

const Register = () => {
    const navigate = useNavigate();
    const [input, setinput] = useState({ name: "", email: "", password: "", loggedIn: false, bookedmovie: [] });

    const handlesubmit = e => {
        e.preventDefault();
        if (input.name == "") {
            alert("Enter your name")
            return
        }
        else if (input.email == "") {
            alert("Enter your email")
            return
        }
        else if (input.password == "") {
            alert("Enter your password")
            return
        }
        const existingusers = JSON.parse(localStorage.getItem("users")) || [];
        if (existingusers.find(u => u.email == input.email)) {
            alert("User Already Exist");
        } else {
            const updatedusers = [...existingusers, input];
            localStorage.setItem("users", JSON.stringify(updatedusers));
            navigate("/Login")
        }
    }

    const handleclick = e => {
        navigate("/Login")
    }

    return (
        <div className='reg-con'>
            <form onSubmit={handlesubmit}>
                <p>Username</p>
                <input name='name' value={input.name} onChange={e => { setinput({ ...input, [e.target.name]: e.target.value }) }} placeholder='Enter Your Name' type="text" />
                <p>Email</p>
                <input name='email' value={input.email} onChange={e => { setinput({ ...input, [e.target.name]: e.target.value }) }} placeholder='Enter Your Email' type="text" />
                <p>Password</p>
                <input name='password' type='password' value={input.password} onChange={e => { setinput({ ...input, [e.target.name]: e.target.value }) }} placeholder='Enter Your Password' />
                <p></p>
                <button className='reg-btn'>Register</button>
                <p>Exixting member. <span onClick={handleclick} >Login</span></p>
            </form>
        </div>
    )
}

export default Register