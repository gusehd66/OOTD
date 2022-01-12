import { SELECT_PRODUCT, INIT_PRODUCT, RANDOM_SELECT } from "../_actions/types";

export const selectInit = () => {
  return {
    type: INIT_PRODUCT,
  };
};

export const selectProduct = (payload) => {
  return {
    type: SELECT_PRODUCT,
    payload,
  };
};

export const randomSelect = (payload) => {
  return {
    type: RANDOM_SELECT,
    payload,
  };
};
