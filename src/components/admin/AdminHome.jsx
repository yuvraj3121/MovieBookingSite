import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminHome.css";
import Navbar from "../navbar";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movie.movies);

  return (
    <div className="ad-con">
      <Navbar />
      <div className="ad-btns">
        <button
          onClick={() => navigate("/Addmovie")}
          className="btn btn-outline-primary"
        >
          Add Movie
        </button>
        <button
          onClick={() => navigate("/Removemovie")}
          className="btn btn-outline-primary"
        >
          Remove Movie
        </button>
      </div>
      <div className="addhome-con">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <td width="33%">Movie</td>
              <td>Date</td>
              <td>Time</td>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={index}>
                <td>{movie.name}</td>
                <td>{movie.date}</td>
                <td>{movie.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
