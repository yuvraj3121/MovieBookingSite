import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Addmovie.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMovie } from "../../features/movieSlice";

const Addmovie = () => {
  let theatre = [];
  let c = 1;
  let a = "A";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movie.movies);
  const [input, setInput] = useState({
    name: "",
    date: "",
    time: "",
    theatre: theatre,
  });

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.name === "") {
      alert("Enter movie name");
      return;
    } else if (input.date === "") {
      alert("Enter date");
      return;
    } else if (input.time === "") {
      alert("Enter time");
      return;
    }

    if (
      movies.find(
        (m) =>
          m.name === input.name &&
          m.date === input.date &&
          m.time === input.time
      )
    ) {
      alert("Movie with the given data is already exist.");
    } else {
      const updatedmovies = [...movies, input];
      dispatch(setMovie(updatedmovies));
      alert("Movie added successfully!");
      navigate("/AdminHome");
    }
  };
  return (
    <div className="admov-con">
      <form onSubmit={handleSubmit}>
        <p>Movie Name</p>
        <input
          name="name"
          value={input.name}
          onChange={handleInputChange}
          placeholder="Enter Movie Name"
          type="text"
        />
        <p>Movie Date</p>
        <input
          name="date"
          value={input.date}
          onChange={handleInputChange}
          type="date"
        />
        <p>Movie Time</p>
        <input
          name="time"
          value={input.time}
          onChange={handleInputChange}
          type="time"
        />
        <p></p>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Addmovie;
