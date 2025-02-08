import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../Redux/AuthSlice";
import eventSlice from "../Redux/EventSlice";
import allEventSlice from "../Redux/AllEventSlice";
import filterEventsSlice from "../Redux/FilteredEvents";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    event: eventSlice,
    allEvent: allEventSlice,
    filteredEvents: filterEventsSlice,
  },
});
