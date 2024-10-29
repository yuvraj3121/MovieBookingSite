import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users);
  const loggedUser = users.find((u) => u.loggedIn === true);

  const handleLogoutClick = (e) => {
    if (loggedUser) {
      const updatedUsers = users.map((user) =>
        user.email === loggedUser.email ? { ...user, loggedIn: false } : user
      );
      dispatch(setUser(updatedUsers));
      navigate("/Login");
    }
  };

  return (
    <div
      style={{
        background: "rgb(82, 82, 83)",
        color: "white",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: '"Times New Roman", "Times, serif"',
        width: "100%",
      }}
    >
      <h2>MovieBookingSite</h2>
      <span style={{ position: "fixed", right: "10px" }}>
        {loggedUser && (
          <span style={{ margin: "0px 10px" }}>{loggedUser.name}</span>
        )}
        <button
          style={{
            border: "1px solid black",
            borderRadius: "4px",
            background: "rgb(211, 211, 202)",
            fontFamily: '"Times New Roman", "Times, serif"',
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      </span>
    </div>
  );
};

export default Navbar;
