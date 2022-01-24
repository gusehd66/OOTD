export const initialState = {
  top: { src: "", id: "" },
  bottom: { src: "", id: "" },
  shoes: { src: "", id: "" },
  outer: { src: "", id: "" },
};

export const selectInit = () => initialState;

export const selectProduct = (state, action) => {
  const { payload } = action;
  state[payload.step] =
    state[payload.step].src.key === payload.value.key
      ? { src: "", id: "" }
      : { src: payload.value, id: payload.id };
};

export const randomSelect = (state, action) => {
  const { payload } = action;
  state[payload.step] = { src: payload.value, id: payload.id };
};
