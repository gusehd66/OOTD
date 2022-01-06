import { combineReducers } from "redux";
import user from "./user_reducer";
import selectItem from "./select_item";

const rootReducer = combineReducers({
  user,
  selectItem,
});

export default rootReducer;
