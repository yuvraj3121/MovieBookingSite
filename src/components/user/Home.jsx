import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { useSelector, useDispatch } from "react-redux";
import { selectMovie } from "../../features/movieSlice.js";

const Userhome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movie.movies);
  const users = useSelector((state) => state.user.users);
  const [selectedItems, setSelectedItems] = useState(movies);

  const loggeduser = users.find((u) => u.loggedIn === true);

  const [item, setItem] = useState("");

  const handleSearchClick = (e) => {
    if (item) {
      const filteredMovies = movies.filter((m) =>
        m.name.toLowerCase().includes(item.toLowerCase())
      );
      setSelectedItems(filteredMovies);
    } else {
      setSelectedItems(movies);
    }
    setItem("");
  };

  useEffect(() => {
    if (!loggeduser) {
      navigate("/Login");
    }
  }, [loggeduser, navigate]);

  if (!loggeduser)
    return (
      <span>
        <h1>no logged user</h1>
      </span>
    );

  return (
    <div className="home">
      <Navbar />
      <button className="booking-btn" onClick={() => navigate("/Bookings")}>
        Bookings
      </button>
      <div className="home-con">
        <div className="search">
          <input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            type="text"
          />
          <button onClick={handleSearchClick}>search</button>
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
            {selectedItems.map((movie, index) => (
              <tr key={index}>
                <td>
                  <span
                    onClick={() => {
                      dispatch(selectMovie(movie.name));
                      navigate("/Bookingpage");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {movie.name}
                  </span>
                </td>
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

export default Userhome;
