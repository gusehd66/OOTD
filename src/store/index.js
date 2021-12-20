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
      top: "",
      bottom: "",
      shoes: "",
      outer: "",
    };
  }
  if (action.type === "select") {
    state[action.step] = action.value;
    return {
      top: state.top,
      bottom: state.bottom,
      shoes: state.shoes,
      outer: state.outer,
    };
  }
  return state;
};

const store = createStore(counterReducer);

export default store;
