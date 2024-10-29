import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Removemovie.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMovie } from "../../features/movieSlice";

const Removemovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movie.movies);
  const [input, setInput] = useState({ name: "", date: "", time: "" });

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.name === "") {
      alert("Enter the complete data.");
      return;
    } else if (input.date === "") {
      alert("Enter the complete data.");
      return;
    } else if (input.time === "") {
      alert("Enter the complete data.");
      return;
    }

    if (
      !movies.find(
        (m) =>
          m.name === input.name &&
          m.date === input.date &&
          m.time === input.time
      )
    ) {
      alert("Movie with the given data is not in the list.");
      setInput({ name: "", date: "", time: "" });
    } else {
      const updatedMovies = movies.filter(
        (m) =>
          !(
            m.name === input.name &&
            m.date === input.date &&
            m.time === input.time
          )
      );
      dispatch(setMovie(updatedMovies));
      alert("Movie removed successfully!");
      navigate("/AdminHome");
    }
  };
  return (
    <div className="remov-con">
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
        <button type="submit">Remove</button>
      </form>
    </div>
  );
};

export default Removemovie;
