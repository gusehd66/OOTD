import { createSlice } from "@reduxjs/toolkit";
import {
  auth,
  loginUser,
  logoutUser,
  registerUser,
  userFavorite,
} from "../_actions/user_actions";

const UserSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {
    userFavorite,
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.fulfilled, (state, action) => {
        return { ...state, userData: action.payload };
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        return { ...state, register: action.payload };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return { ...state, loginSucces: action.payload };
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        return { ...state };
      });
  },
});

export default UserSlice;
