import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types";
import { USER_SERVER } from "../components/Config.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  REGISTER_USER,
  async (dataToSubmit) => {
    const request = await axios.post(`${USER_SERVER}/register`, dataToSubmit);
    return request.data;
  }
);

export const loginUser = createAsyncThunk(LOGIN_USER, async (dataToSubmit) => {
  const request = await axios.post(`${USER_SERVER}/login`, dataToSubmit);
  return request.data;
});

export const auth = createAsyncThunk(AUTH_USER, async () => {
  const request = await axios.get(`${USER_SERVER}/auth`);
  return request.data;
});

export const logoutUser = createAsyncThunk(LOGOUT_USER, async () => {
  const request = await axios.get(`${USER_SERVER}/logout`);
  return request.data;
});
