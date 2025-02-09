import { createSlice } from "@reduxjs/toolkit";
import { getAllEvent } from "../Features/AllEventFeature";
import { deleteEvent } from "../Features/EventFeature";

const initialState = {
  allEvents: [],
  isLoading: false,
  error: null,
};

const allEventSlice = createSlice({
  name: "allEvent",
  initialState,

  reducers: {
    updateAttendees: (state, action) => {
      const { eventId, attendees } = action.payload;
      const index = state.allEvents.findIndex((event) => event._id === eventId);
      if (index !== -1) {
        state.allEvents[index].attendees = attendees;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllEvent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
      state.error = null;
    });
    builder.addCase(getAllEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.allEvents = state.allEvents.filter(
        (event) => event._id !== action.payload.deletedEvent._id
      );
      // localStorage.setItem("events", JSON.stringify(state.allEvents));
    });
  },
});

export const { updateAttendees } = allEventSlice.actions;

export default allEventSlice.reducer;
