import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Bookingpage.css'

const Bookingpage = () => {
    const navigate = useNavigate();
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    const selectedmovie = JSON.parse(localStorage.getItem("selectedmovie"))

    const movie = movies.find(m => m.name == selectedmovie)
    const theatre = movie.theatre;

    let selectedseats = [];
    let userseats = [];

    const handleclick = (rowindex, sindex) => {
        const eleid = `${rowindex}-${sindex}`;
        const selectedseat = document.getElementById(eleid);
        if (selectedseat.style.background === "green") {
            selectedseat.style.background = "yellow";
            selectedseats.push([rowindex, sindex]);
            console.log(selectedseats)
        } else {
            selectedseat.style.background = "green";
            selectedseats = selectedseats.filter(seat => seat[0] !== rowindex || seat[1] !== sindex);
        }
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    let loggeduser = users.find(u => u.loggedIn == true);

    const handlebook = e => {
        selectedseats = selectedseats.sort((a, b) => a[1] - b[1])
        let str = "";
        selectedseats.forEach(seat => {
            const selectedseat = document.getElementById(`${seat[0]}-${seat[1]}`);
            selectedseat.style.background = "red";
            movie.theatre[seat[0]][seat[1]] = movie.theatre[seat[0]][seat[1]].split('-')[0] + "-red";
            str = str + movie.theatre[seat[0]][seat[1]].split('-')[0] + " ";
            userseats.push(movie.theatre[seat[0]][seat[1]].split('-')[0]);
        })
        localStorage.setItem("movies", JSON.stringify(movies));
        document.getElementById("show").innerHTML = `Seat ${str} booked successfully.`;

        loggeduser.bookedmovie = [...loggeduser.bookedmovie, { name: selectedmovie, bookedseats: [...userseats] }]

        localStorage.setItem("users", JSON.stringify(users));

        selectedseats = [];
        userseats = [];
    }

    return (
        <div className='bp-con'>
            <div className="bookpagenavbar">
                <ul>
                    <li onClick={() => {
                        navigate("/")
                    }}>Home</li>
                </ul>
            </div>
            <div className='th-con'>
                <div className='the'>
                    <span className="screen">Screen</span>
                    <div className='th'>
                        {theatre.map((seatrow, rowindex) => (
                            <span className='seats'>
                                {seatrow.map((snumber, sindex) => {
                                    return <span onClick={() =>
                                        handleclick(rowindex, sindex)
                                    } id={`${rowindex}-${sindex}`} className='seat' key={sindex} style={{ background: snumber.split('-')[1] }}>{snumber.split('-')[0]}</span>
                                })}
                            </span>
                        ))}
                    </div>
                </div>
                <div className='seat-info'>
                    <span style={{ background: "green", border: "1px solid Black" }}>Available Seats</span>
                    <span style={{ background: "yellow", border: "1px solid Black" }}>Selected Seats</span>
                    <span style={{ background: "red", border: "1px solid Black" }}>Sold Seats</span>
                </div>
                <button className='book-btn' onClick={handlebook}>Book</button>
                <div>
                    <h2 id='show'></h2>
                </div>
            </div>
        </div>

    )
}

export default Bookingpage