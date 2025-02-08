import { createSlice } from "@reduxjs/toolkit";
import { createEvent } from "../Features/EventFeature";
import { editEvent } from "../Features/EventFeature";
import { deleteEvent } from "../Features/EventFeature";

const initialState = {
  events: JSON.parse(localStorage.getItem("events")) || [],
  isLoading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    keepUpcomingEventsThree: (state) => {
      if (state.events.length >= 3) {
        state.events.shift();
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createEvent.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.events.push(action.payload.newEvent);
      localStorage.setItem("events", JSON.stringify(state.events));
    });

    builder.addCase(createEvent.rejected, (state, action) => {
      state.error = action.payload.message;
    });

    // EDIT EVENT REDUCER ASYNC REDUCER

    builder.addCase(editEvent.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(editEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log(action.payload.updatedEvent, "action.payload");
      const index = state.events.findIndex(
        (event) => event._id === action.payload.updatedEvent._id
      );

      if (index !== -1) {
        state.events[index] = action.payload.updatedEvent;
        localStorage.setItem("events", JSON.stringify(state.events));
      }
    });

    builder.addCase(editEvent.rejected, (state, action) => {
      state.error = action.payload.message;
    });

    // DELETE EVENT REDUCER ASYNC REDUCER
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      // console.log(action.payload.deletedEvent, "action.payload");
      state.events = state.events.filter((event) => {
        return event._id !== action.payload.deletedEvent._id;
      });
      localStorage.setItem("events", JSON.stringify(state.events));
    });
  },
});

export const { keepUpcomingEventsThree } = eventSlice.actions;

export default eventSlice.reducer;
