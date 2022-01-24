import { createSlice } from "@reduxjs/toolkit";

import {
  initialState,
  randomSelect,
  selectInit,
  selectProduct,
} from "../_actions/select_actions";

const ClothSlice = createSlice({
  name: "clothes",
  initialState,
  reducers: {
    selectInit,
    selectProduct,
    randomSelect,
  },
});

export default ClothSlice;

export const clothActions = ClothSlice.actions;
