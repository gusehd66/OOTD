import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createStore } from "redux";

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

// const counterReducer = (state = initialState, action) => {
//   if (action.type === "init") {
//     console.log("init");
//     return {
//       top: "",
//       bottom: "",
//       shoes: "",
//       outer: "",
//     };
//   }
//   if (action.type === "select") {
//     state[action.step] = action.value;
//     return {
//       top: state.top,
//       bottom: state.bottom,
//       shoes: state.shoes,
//       outer: state.outer,
//     };
//   }
//   return state;
// };

// const store = createStore(counterReducer);
const store = configureStore({ reducer: ClothSlice.reducer });

export const clothActions = ClothSlice.actions;

export default store;
