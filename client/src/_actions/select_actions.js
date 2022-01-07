import { SELECT_PRODUCT, INIT_PRODUCT } from "../_actions/types";

export const selectInit = () => {
  return {
    type: INIT_PRODUCT,
  };
};

export const selectProduct = (payload) => {
  return {
    type: SELECT_PRODUCT,
    payload: payload,
  };
};
