import { createSlice } from "@reduxjs/toolkit";
import { getEventByCategoriesAndDate } from "../Features/AllEventFeature";
import { deleteEvent } from "../Features/EventFeature";

const initialState = {
  filteredEvent: [],
  isLoading: false,
  isError: null,
};

const filterEventsSlice = createSlice({
  name: "filteredEvents",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getEventByCategoriesAndDate.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getEventByCategoriesAndDate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.filteredEvent = action.payload;
      state.isError = null;
    });

    builder.addCase(getEventByCategoriesAndDate.rejected, (state, action) => {
      //   console.log(action.payload);
      state.isLoading = false;
      state.isError = action.payload;
    });

    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      // console.log(action.payload.deletedEvent, "action.payload");
      state.filteredEvent = state.filteredEvent.filter((event) => {
        return event._id !== action.payload.deletedEvent._id;
      });
      // localStorage.setItem("events", JSON.stringify(state.events));
    });
  },
});

export default filterEventsSlice.reducer;
