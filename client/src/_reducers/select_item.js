import { SELECT_PRODUCT, INIT_PRODUCT, RANDOM_SELECT } from "../_actions/types";

const initialState = {
  top: { src: "", id: "" },
  bottom: { src: "", id: "" },
  shoes: { src: "", id: "" },
  outer: { src: "", id: "" },
};

const selectItem = (state = initialState, action) => {
  const newState = state;
  const payload = action.payload;
  switch (action.type) {
    case SELECT_PRODUCT:
      newState[payload.step] =
        newState[payload.step].src === payload.value
          ? { src: "", id: "" }
          : { src: payload.value, id: payload.id };

      return { ...newState };
    case RANDOM_SELECT:
      newState[payload.step] = { src: payload.value, id: payload.id };
      return { ...newState };
    case INIT_PRODUCT:
      return {
        top: { src: "", id: "" },
        bottom: { src: "", id: "" },
        shoes: { src: "", id: "" },
        outer: { src: "", id: "" },
      };
    default:
      return state;
  }
};

export default selectItem;
