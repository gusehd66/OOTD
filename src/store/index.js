import { createStore } from "redux";

const initialstate = {
  top: "",
  bottom: "",
  shoes: "",
  outer: "",
};

const counterReducer = (state = initialstate, action) => {
  if (action.type === "init") {
    console.log("init");
    return {
      top: state.top,
      bottom: state.bottom,
      shoes: state.shoes,
      outer: state.outer,
    };
  }
  if (action.type === "select") {
    console.log(action);
    return state;
  }
  return state;
};

const store = createStore(counterReducer);

export default store;
