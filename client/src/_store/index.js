import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./user_reducer";
import ClothSlice from "./select_item";

const store = configureStore({
  reducer: {
    cloth: ClothSlice.reducer,
    user: UserSlice.reducer,
  },
});
export default store;
