import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvent } from "../Features/AllEventFeature";
import "../Css/Events.css";
import FilterEvents from "./FilterEvents";
import { deleteEvent } from "../Features/EventFeature";
import { toast, ToastContainer } from "react-toastify";

const ShowAllEvents = () => {
  const dispatch = useDispatch();
  const hasFetchedEvents = useRef(false);

  const { allEvents, isLoading } = useSelector((state) => state.allEvent);

  const { filteredEvent, isError } = useSelector(
    (state) => state.filteredEvents
  );

  // console.log(filteredEvent);

  useEffect(() => {
    if (!hasFetchedEvents.current) {
      dispatch(getAllEvent());
      hasFetchedEvents.current = true;
    }
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  return (
    <div className="events-container">
      <FilterEvents />
      <div className="show-all-events">
        {isError && (
          <p style={{ color: "red", textAlign: "center" }}>{isError.error}</p>
        )}

        {allEvents.length === 0 ? (
          <h1>Sorry You Don't Have Any Event</h1>
        ) : (
          <h1>All Events</h1>
        )}
        {isLoading && <p>Loading events...</p>}
        {filteredEvent.length > 0
          ? filteredEvent.map((event) => (
              <div key={event._id} className="event-card">
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p style={{ color: "darkcyan" }}>
                  {new Date(event.dateTime).toLocaleString()}
                </p>
                <p>Location: {event.location}</p>
                <p>Category: {event.cetegory}</p>
                <p>
                  Created By: <strong>{event.createdBy.name}</strong>
                </p>
                <div className="event-actions">
                  <button>Join Event</button>
                  <button onClick={() => handleDelete(event._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          : allEvents?.map((event) => (
              <div key={event._id} className="event-card">
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p style={{ color: "darkcyan" }}>
                  {new Date(event.dateTime).toLocaleString()}
                </p>
                <p>Location: {event.location}</p>
                <p>Category: {event.cetegory}</p>
                <p>
                  Created By: <strong>{event.createdBy.name}</strong>
                </p>
                <div className="event-actions">
                  <button>Join Event</button>
                  <button onClick={() => handleDelete(event._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ShowAllEvents;
