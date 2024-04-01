import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/Removemovie.css"

const Addmovie = () => {
    const navigate = useNavigate();
    const [input, setinput] = useState({ name: "", date: "", time: "" })
    const handlesubmit = e => {
        e.preventDefault();
        if (input.name == "") {
            alert("Enter the complete data.")
            return
        }
        else if (input.date == "") {
            alert("Enter the complete data.")
            return
        }
        else if (input.time == "") {
            alert("Enter the complete data.")
            return
        }
        const existingmovies = JSON.parse(localStorage.getItem("movies")) || [];
        if (!existingmovies.find(m => m.name == input.name && m.date == input.date && m.time == input.time)) {
            alert("Movie with the given data is not in the list.")
            setinput({ name: "", date: "", time: "" });
        }
        else {
            const updatedmovies = existingmovies.filter(m => m.name != input.name && m.date != input.date && m.time != input.time)
            localStorage.setItem("movies", JSON.stringify(updatedmovies));
            alert("Movie removed successfully!");
            navigate("/AdminHome");
        }
    }
    return (
        <div className='remov-con'>
            <form onSubmit={handlesubmit}>
                <p>Movie Name</p>
                <input name="name" value={input.name} onChange={e => { setinput({ ...input, [e.target.name]: e.target.value }) }} placeholder='Enter Movie Name' type="text" />
                <p>Movie Date</p>
                <input name="date" value={input.date} onChange={e => { setinput({ ...input, [e.target.name]: e.target.value }) }} type="date" />
                <p>Movie Time</p>
                <input name="time" value={input.time} onChange={e => { setinput({ ...input, [e.target.name]: e.target.value }) }} type="time" />
                <p></p>
                <button>Remove</button>
            </form>
        </div>
    )
}

export default Addmovie