import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  USER_FAVORITE,
  Delete_FAVORITE,
} from "./types";
import { USER_SERVER } from "../components/Config.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  REGISTER_USER,
  async (dataToSubmit) => {
    try {
      const response = await axios.post(
        `${USER_SERVER}/register`,
        dataToSubmit
      );
      return response.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  }
);

export const loginUser = createAsyncThunk(LOGIN_USER, async (dataToSubmit) => {
  try {
    const response = await axios.post(`${USER_SERVER}/login`, dataToSubmit);
    return response.data;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
});

export const auth = createAsyncThunk(AUTH_USER, async () => {
  try {
    const response = await axios.get(`${USER_SERVER}/auth`);
    return response.data;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
});

export const logoutUser = createAsyncThunk(LOGOUT_USER, async () => {
  try {
    const response = await axios.get(`${USER_SERVER}/logout`);
    return response.data;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
});

export const addFavorite = createAsyncThunk(USER_FAVORITE, async (favorite) => {
  try {
    const response = await axios.post(`${USER_SERVER}/favorite`, favorite);
    return response.data;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
});

export const deleteFavorite = createAsyncThunk(
  Delete_FAVORITE,
  async (favorite) => {
    try {
      const response = await axios.post(`${USER_SERVER}/delete`, favorite);
      return response.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  }
);
