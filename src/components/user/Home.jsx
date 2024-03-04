import React, { useState } from 'react'
import Navbar from '../navbar'
import { useNavigate } from 'react-router-dom'
import "../styles/Home.css"

const Userhome = () => {
    const navigate = useNavigate();
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    const [selecteditems, setselecteditems] = useState(movies);

    const [item, setitem] = useState("");

    const handleclick = e => {
        setselecteditems(movies.filter(m => m.name == item))
    }

    return (
        <div className='home'>
            <Navbar />
            <button className='booking-btn' onClick={() => navigate('/Bookings')}>Bookings</button>
            <div className='home-con'>
                <div className='search'>
                    <input value={item} onChange={e => setitem(e.target.value)} type="text" />
                    <button onClick={handleclick}>search</button>
                </div>
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <td width="33%">Movie</td>
                            <td>Date</td>
                            <td>Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {selecteditems.map((movie, index) => (
                            <tr key={index}>
                                <td><span onClick={() => {
                                    localStorage.setItem("selectedmovie", JSON.stringify(movie.name));
                                    navigate("/Bookingpage")
                                }} style={{ cursor: "pointer" }}>{movie.name}</span></td>
                                <td>{movie.date}</td>
                                <td>{movie.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Userhome