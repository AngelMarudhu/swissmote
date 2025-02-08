import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister } from "../Features/AuthFeature";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isLoggedIn: false,
  error: null,
  isloading: false,
  isRegistered: localStorage.getItem("isRegistered") || false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.isloading = false;
      state.isRegistered = true;
      localStorage.setItem("isRegistered", true);
    });

    builder.addCase(userRegister.rejected, (state, action) => {
      state.error = action.payload.message;
    });

    // login reducers here

    builder.addCase(userLogin.pending, (state) => {
      state.isloading = true;
    });

    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isloading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    });

    builder.addCase(userLogin.rejected, (state, action) => {
      state.error = action.payload.message;
    });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
