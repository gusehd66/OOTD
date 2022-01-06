// import { SELECT_PRODUCT, INIT_PRODUCT } from "../_actions/types";

const initialState = { top: "", bottom: "", shoes: "", outer: "" };

const selectItem = (state = initialState, action) => {
  switch (action.type) {
    case "select":
      state[action.step] === action.value
        ? (state[action.step] = "")
        : (state[action.step] = action.value);
      return {
        ...state,
        top: state.top,
        bottom: state.bottom,
        shoes: state.shoes,
        outer: state.outer,
      };
    case "init":
      return { top: "", bottom: "", shoes: "", outer: "" };
    default:
      return state;
  }
};

export default selectItem;
