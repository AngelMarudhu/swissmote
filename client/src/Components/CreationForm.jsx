import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../Features/EventFeature";
import "../Css/Home.css";
import { keepUpcomingEventsThree } from "../Redux/EventSlice";
import { useNavigate } from "react-router";

const cetegories = ["sports", "music", "arts", "technology", "food", "other"];

const CreationForm = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    dateTime: "",
    location: "",
    cetegory: "technology",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, isLoading } = useSelector((state) => state.event);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEvent(eventData));

    if (events.length >= 3) {
      dispatch(keepUpcomingEventsThree());
    }

    setEventData({
      title: "",
      description: "",
      dateTime: "",
      location: "",
      cetegory: "technology",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h2>Create Event</h2>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={eventData.title}
            onChange={handleChange}
            required
          />{" "}
          <textarea
            name="description"
            placeholder="Event Description"
            value={eventData.description}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="dateTime"
            value={eventData.dateTime}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={eventData.location}
            onChange={handleChange}
            required
          />
          <select
            name="cetegory"
            value={eventData.category}
            onChange={handleChange}
          >
            <option value="">All</option>
            {cetegories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button type="submit">
            {isLoading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreationForm;
