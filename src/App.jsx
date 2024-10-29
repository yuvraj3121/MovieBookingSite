import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/user/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminHome from "./components/admin/AdminHome";
import Addmovie from "./components/admin/Addmovie";
import Removemovie from "./components/admin/Removemovie";
import Bookingpage from "./components/user/Bookingpage";
import Bookings from "./components/user/Bookings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/AdminHome" element={<AdminHome />}></Route>
          <Route path="/AddMovie" element={<Addmovie />}></Route>
          <Route path="/RemoveMovie" element={<Removemovie />}></Route>
          <Route path="/Bookingpage" element={<Bookingpage />}></Route>
          <Route path="/Bookings" element={<Bookings />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
