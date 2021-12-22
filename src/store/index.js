import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  top: "",
  bottom: "",
  shoes: "",
  outer: "",
};

const ClothSlice = createSlice({
  name: "clothes",
  initialState,
  reducers: {
    init: (state) => {
      console.log("init");
      return void ((state.top = ""),
      (state.bottom = ""),
      (state.shoes = ""),
      (state.outer = ""));
    },
    select: (state, action) => {
      state[action.payload.step] === action.payload.value
        ? (state[action.payload.step] = "")
        : (state[action.payload.step] = action.payload.value);
    },
  },
});

const store = configureStore({ reducer: ClothSlice.reducer });

export const clothActions = ClothSlice.actions;

export default store;
