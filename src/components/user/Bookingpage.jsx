import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Bookingpage.css";
import { useSelector, useDispatch } from "react-redux";
import { setMovie } from "../../features/movieSlice";
import { setUser } from "../../features/userSlice";

const Bookingpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users);
  const movies = useSelector((state) => state.movie.movies);
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);

  let loggeduser = users.find((u) => u.loggedIn === true);

  const movie = movies.find((m) => m.name === selectedMovie);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userSeats, setUserSeats] = useState([]);

  const handleClick = (rowindex, sindex) => {
    const eleid = `${rowindex}-${sindex}`;
    const selectedSeat = document.getElementById(eleid);

    if (selectedSeat.style.background === "green") {
      selectedSeat.style.background = "yellow";
      setSelectedSeats((prev) => [...prev, [rowindex, sindex]]);
    } else if (selectedSeat.style.background === "red") {
      return;
    } else {
      selectedSeat.style.background = "green";
      setSelectedSeats((prev) =>
        prev.filter((seat) => seat[0] !== rowindex || seat[1] !== sindex)
      );
    }
  };

  const handlebook = () => {
    const theatre = movie.theatre.map((row) => [...row]);

    const bookedSeats = selectedSeats.map((seat) => {
      const selectedseat = document.getElementById(`${seat[0]}-${seat[1]}`);
      selectedseat.style.background = "red";
      const seatLabel = theatre[seat[0]][seat[1]].split("-")[0];
      theatre[seat[0]][seat[1]] = `${seatLabel}-red`;
      return seatLabel;
    });

    setUserSeats((prevUserSeats) => [...prevUserSeats, ...bookedSeats]);

    dispatch(
      setMovie(
        movies.map((m) =>
          m.name === selectedMovie ? { ...m, theatre: theatre } : m
        )
      )
    );

    document.getElementById("show").innerHTML = `Seat ${bookedSeats.join(
      ", "
    )} booked successfully.`;

    const updatedUser = {
      ...loggeduser,
      bookedmovie: [
        ...loggeduser.bookedmovie,
        { name: selectedMovie, bookedseats: bookedSeats },
      ],
    };

    const updatedUsers = users.map((u) => (u.loggedIn ? updatedUser : u));

    dispatch(setUser(updatedUsers));

    setSelectedSeats([]);
  };

  return (
    <div className="bp-con">
      <div className="bookpagenavbar">
        <ul>
          <li
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </li>
        </ul>
      </div>
      <div className="th-con">
        <div className="the">
          <span className="screen">Screen</span>
          <div className="th">
            {movie.theatre.map((seatrow, rowindex) => (
              <span className="seats">
                {seatrow.map((snumber, sindex) => {
                  return (
                    <span
                      onClick={() => handleClick(rowindex, sindex)}
                      id={`${rowindex}-${sindex}`}
                      className="seat"
                      key={`${rowindex}-${sindex}`}
                      style={{ background: snumber.split("-")[1] }}
                    >
                      {snumber.split("-")[0]}
                    </span>
                  );
                })}
              </span>
            ))}
          </div>
        </div>
        <div className="seat-info">
          <span style={{ background: "green", border: "1px solid Black" }}>
            Available Seats
          </span>
          <span style={{ background: "yellow", border: "1px solid Black" }}>
            Selected Seats
          </span>
          <span style={{ background: "red", border: "1px solid Black" }}>
            Sold Seats
          </span>
        </div>
        <button className="book-btn" onClick={handlebook}>
          Book
        </button>
        <div>
          <h2 id="show"></h2>
        </div>
      </div>
    </div>
  );
};

export default Bookingpage;
