import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editEvent } from "../Features/EventFeature";
import { deleteEvent } from "../Features/EventFeature";

const UpcomingEvents = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);

  // console.log(events, "events");

  const [editingEvent, setEditingEvent] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const handleEditClick = (event) => {
    console.log(event._id);
    setEditingEvent(event._id);
    setUpdatedData({
      title: event.title,
      description: event.description,
      dateTime: event.dateTime,
      location: event.location,
      cetegory: event.cetegory,
    });
  };

  const handleUpdateChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = (id) => {
    dispatch(editEvent({ id, updatedEventData: updatedData }));
    setEditingEvent(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  return (
    <div className="upcoming-events-container">
      {events.length === 0 && <h3>Please Add Events</h3>}
      {events.map((event) => (
        <div key={event._id} className="event-cards">
          {editingEvent === event._id ? (
            <div className="form-content">
              <input
                type="text"
                name="title"
                value={updatedData.title}
                onChange={handleUpdateChange}
              />
              <textarea
                name="description"
                value={updatedData.description}
                onChange={handleUpdateChange}
              />
              <input
                type="datetime-local"
                name="dateTime"
                value={updatedData.dateTime}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                name="location"
                value={updatedData.location}
                onChange={handleUpdateChange}
              />
              <select
                name="cetegory"
                value={updatedData.cetegory}
                onChange={handleUpdateChange}
              >
                <option value="sports">Sports</option>
                <option value="music">Music</option>
                <option value="arts">Arts</option>
                <option value="technology">Technology</option>
                <option value="food">Food</option>
                <option value="other">Other</option>
              </select>
              <button
                onClick={() => handleSaveEdit(event._id)}
                style={{ marginBottom: "5px" }}
              >
                Save
              </button>
              <button onClick={() => setEditingEvent(null)}>Cancel</button>
            </div>
          ) : (
            <>
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">
                Description: {event.description}
              </p>
              <div className="event-details">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.dateTime).toLocaleString()}
                </p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                <p>
                  <strong>Category:</strong> {event.cetegory}
                </p>
              </div>
              <div className="event-actions">
                <button onClick={() => handleEditClick(event)}>Edit</button>
                <button onClick={() => handleDelete(event._id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default UpcomingEvents;
