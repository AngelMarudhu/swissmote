import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import CreationForm from "../Components/CreationForm";
import "../Css/Home.css";
import UpcomingEvents from "../Components/UpcomingEvents";
import { logout } from "../Redux/AuthSlice";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.login);

  const { events } = useSelector((state) => state.event);
  // console.log(events);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div style={{ height: "100vh" }}>
      <ToastContainer />
      <div
        className="event-actions"
        style={{ marginTop: "1rem", padding: "10px 20px " }}
      >
        <button onClick={handleLogout} style={{ textTransform: "capitalize" }}>
          Logout
        </button>
        <button
          onClick={() => {
            navigate("/dashboard");
          }}
          style={{ textTransform: "capitalize" }}
        >
          Go To Dashboard
        </button>
      </div>
      <div className="home-container">
        <div className="left-section">
          <CreationForm />
        </div>

        <div className="right-section">
          <h2 style={{ marginBottom: "1rem" }}>
            {events.length >= 3
              ? "Don't worry we got you covered"
              : `Upcoming Events ${events.length}`}
          </h2>
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
};

export default Home;
