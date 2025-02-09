import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://swissmote-sns7.onrender.com/api/user";

export const userRegister = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      // console.log(response.data, "response from userRegister success");
      return response.data;
    } catch (error) {
      //   console.log(error.response.data, "error from userRegister");
      return rejectWithValue(error.response.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      //   console.log(response.data, "response from userLogin success");
      return response.data;
    } catch (error) {
      //   console.log(error.response.data, "error from userLogin");
      return rejectWithValue(error.response.data);
    }
  }
);
