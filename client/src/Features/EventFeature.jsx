import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9000/api/event";

export const createEvent = createAsyncThunk(
  "create/event",
  async (eventData) => {
    try {
      const response = await axios.post(`${API_URL}/create`, eventData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          accept: "application/json",
        },
      });
      // console.log(response.data, "response from feature ");
      return response.data;
    } catch (error) {
      console.log(error, "error from feature ");
    }
  }
);

// export const editEvent = createAsyncThunk("edit/event", async);

export const editEvent = createAsyncThunk(
  "edit/event",
  async ({ id, updatedEventData }) => {
    // console.log(id, updatedEventData, "id and updatedEventData");
    try {
      const response = await axios.put(
        `${API_URL}/edit/${id}`,
        updatedEventData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            accept: "application/json",
          },
        }
      );
      // console.log(response.data, "response from feature ");
      return response.data;
    } catch (error) {
      // console.log(error, "error from feature ");
      return error.response.data;
    }
  }
);

/// A SINGLE ASYNC THUNK FUNCTION FOR HANDLING DELETE EVENT NOT ONLY THAT WHEREEVER YOU USED IN SLICE FILE THAT WILL AFFECT DELETE EVENT AND WHAT YOU'RE TRIED EVENT DIFFERENT COMPONENTS AS WELL AS DELETE EVENT

export const deleteEvent = createAsyncThunk("delete/event", async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        accept: "application/json",
      },
    });
    // console.log(response.data, "response from feature ");
    return response.data;
  } catch (error) {
    // console.log(error, "error from feature ");
    return error.response.data;
  }
});
