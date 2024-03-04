import React, { useState } from 'react'
import '../styles/Booking.css'
import { useNavigate } from 'react-router-dom'

const Bookings = () => {
    const navigate = useNavigate();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggeduser = users.find(u => u.loggedIn == true);
    const [bookedmovie, setbookedmovie] = useState(loggeduser.bookedmovie);
    const movies = JSON.parse(localStorage.getItem("movies")) || [];

    const handleclick = (name, bookedseats) => {
        console.log(bookedseats)
        const movie = movies.find(m => m.name == name);
        const theatre = movie.theatre;
        for (let m = 0; m < bookedseats.length; m++) {
            for (let i = 0; i < theatre.length; i++) {
                for (let j = 0; j < theatre[i].length; j++) {
                    if (movie.theatre[i][j].split('-')[0] == bookedseats[m]) {
                        theatre[i][j] = theatre[i][j].split('-')[0] + "-green";
                    }
                }
            }
        }
        console.log(theatre)
        console.log(movie.theatre)
        localStorage.setItem("movies", JSON.stringify(movies));
        loggeduser.bookedmovie = loggeduser.bookedmovie.filter(m => m.name != name || m.bookedseats != bookedseats)
        localStorage.setItem("users", JSON.stringify(users));
        setbookedmovie(bookedmovie.filter(m => m.name != name || m.bookedseats != bookedseats));
    }

    return (
        <div className='b-con'>
            <div className="bookingsnavbar">
                <ul>
                    <li onClick={() => navigate("/")}>Home</li>
                </ul>
            </div>
            <div className='tickets'>
                {bookedmovie.map((movie, index) => (
                    <div className='booking'>
                        <div className='bookedmovie' key={index}>
                            <h3>{movie.name}</h3>
                            <span>Booked seats : {movie.bookedseats.map((seat, no) => (
                                <span key={no}>{seat + " "}</span>
                            ))}</span>
                        </div>
                        <button onClick={() => handleclick(movie.name, movie.bookedseats)}>Cancel booking</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Bookings