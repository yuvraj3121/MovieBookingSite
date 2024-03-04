import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggeduser = users.find(u => u.loggedIn == true)

    const handleclick = e => {
        loggeduser.loggedIn = false;
        localStorage.setItem("users", JSON.stringify(users));
        navigate("/Login")
    }

    return (
        <div style={{ background: "rgb(82, 82, 83)", color: "white", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: '"Times New Roman", "Times, serif"', width: "100%" }}>
            <h2>MovieBookingSite</h2>
            <span style={{ position: "fixed", right: "10px" }}>
                <span style={{ margin: "0px 10px" }}>{loggeduser.name}</span>
                <button style={{ border: "1px solid black", borderRadius: "4px", background: "rgb(211, 211, 202)", fontFamily: '"Times New Roman", "Times, serif"', fontSize: "15px", cursor: "pointer" }} onClick={handleclick}>Logout</button>
            </span >
        </div >
    )
}

export default Navbar