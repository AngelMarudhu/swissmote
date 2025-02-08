import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9000/api/event";

export const getAllEvent = createAsyncThunk("/allEvent", async () => {
  try {
    const response = await axios.get(`${API_URL}/get-all-events`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        accept: "application/json",
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error);
    return error.response.data;
  }
});

export const getEventByCategoriesAndDate = createAsyncThunk(
  "/filterEvent",
  async ({ cetegory, fromDate, toDate }, { rejectWithValue }) => {
    // console.log(cetegory, fromDate, toDate);
    try {
      let query = "?";

      if (cetegory) {
        query += `cetegory=${cetegory}`;
      }

      if (fromDate && toDate) {
        query += `&fromDate=${fromDate}&toDate=${toDate}`;
      }

      let response = await axios.get(`${API_URL}/filter${query}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          accept: "application/json",
        },
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
      // return error.response.data;
    }
  }
);
