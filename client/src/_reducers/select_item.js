import { SELECT_PRODUCT, INIT_PRODUCT } from "../_actions/types";

const initialState = {
  top: { src: "", id: "" },
  bottom: { src: "", id: "" },
  shoes: { src: "", id: "" },
  outer: { src: "", id: "" },
};

const selectItem = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      const newState = state;
      const payload = action.payload;

      newState[payload.step] =
        newState[payload.step].src === payload.value
          ? { src: "", id: "" }
          : { src: payload.value, id: payload.id };

      return {
        ...newState,
      };

    case INIT_PRODUCT:
      return { ...initialState };
    default:
      return state;
  }
};

export default selectItem;
