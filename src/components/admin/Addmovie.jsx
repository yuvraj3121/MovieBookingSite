import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Addmovie.css'

const Addmovie = () => {
    let theatre = [];
    let c = 1;
    let a = 'A';
    for (let i = 0; i < 12; i++) {
        theatre[i] = [];
        for (let j = 0; j < 5; j++) {
            theatre[i][j] = a + c + "-green";
            c++;
        }
        if (c === 11) {
            c = 1;
            a = String.fromCharCode(a.charCodeAt(0) + 1);
        }

    }

    const navigate = useNavigate();
    const [input, setinput] = useState({ name: "", date: "", time: "", theatre: theatre })
    const handlesubmit = e => {
        if (input.name == "") {
            alert("Enter movie name")
            return
        }
        else if (input.date == "") {
            alert("Enter date")
            return
        }
        else if (input.time == "") {
            alert("Enter time")
            return
        }
        e.preventDefault();
        const existingmovies = JSON.parse(localStorage.getItem("movies")) || [];
        if (existingmovies.find(m => m.name == input.name && m.date == input.date && m.time == input.time)) {
            alert("Movie with the given data is already exist.")
        }
        else {
            const updatedmovies = [...existingmovies, input];
            localStorage.setItem("movies", JSON.stringify(updatedmovies));
            alert("Movie added successfully!")
            navigate("/AdminHome");
        }
    }
    return (
        <div className='admov-con'>
            <form onSubmit={handlesubmit}>
                <p>Movie Name</p>
                <input name="name" value={input.name} onChange={e => { setinput({ ...input, [e.target.name]: e.target.value }) }} placeholder='Enter Movie Name' type="text" />
                <p>Movie Date</p>
                <input name="date" value={input.date} onChange={e => { setinput({ ...input, [e.target.name]: e.target.value }) }} type="date" />
                <p>Movie Time</p>
                <input name="time" value={input.time} onChange={e => { setinput({ ...input, [e.target.name]: e.target.value }) }} type="time" />
                <p></p>
                <button>Add</button>
            </form>
        </div>
    )
}

export default Addmovie