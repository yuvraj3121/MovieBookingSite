import React, { useEffect, useState } from "react";
import "../styles/Booking.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovie } from "../../features/movieSlice";
import { setUser } from "../../features/userSlice";

const Bookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users);
  const movies = useSelector((state) => state.movie.movies);

  const loggeduser = users.find((u) => u.loggedIn == true);
  const [bookedmovie, setBookedmovie] = useState(loggeduser?.bookedmovie || []);

  useEffect(() => {
    if (loggeduser) {
      setBookedmovie(loggeduser.bookedmovie || []);
    }
  }, [loggeduser]);

  const handleclick = (name, bookedseats) => {
    const movie = movies.find((m) => m.name === name);
    const theatre = movie.theatre.map((row) => row.slice());

    for (let m = 0; m < bookedseats.length; m++) {
      for (let i = 0; i < theatre.length; i++) {
        for (let j = 0; j < theatre[i].length; j++) {
          if (theatre[i][j].split("-")[0] == bookedseats[m]) {
            theatre[i][j] = theatre[i][j].split("-")[0] + "-green";
          }
        }
      }
    }

    dispatch(
      setMovie(
        movies.map((m) => (m.name === name ? { ...m, theatre: theatre } : m))
      )
    );

    const updatedBookedMovies = loggeduser.bookedmovie.filter(
      (m) => m.name !== name || m.bookedseats !== bookedseats
    );

    dispatch(
      setUser(
        users.map((u) =>
          u.loggedIn ? { ...u, bookedmovie: updatedBookedMovies } : u
        )
      )
    );

    setBookedmovie(updatedBookedMovies);
  };

  return (
    <div className="b-con">
      <div className="bookingsnavbar">
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
        </ul>
      </div>
      <div className="tickets">
        {bookedmovie.map((movie, index) => (
          <div className="booking">
            <div className="bookedmovie" key={index}>
              <h3>{movie.name}</h3>
              <span>
                Booked seats :{" "}
                {movie.bookedseats.map((seat, no) => (
                  <span key={no}>{seat + " "}</span>
                ))}
              </span>
            </div>
            <button onClick={() => handleclick(movie.name, movie.bookedseats)}>
              Cancel booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
