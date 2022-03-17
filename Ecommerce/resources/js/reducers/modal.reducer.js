import * as types from "../constants";

const initialState = {
  showModal: false,
  title: "",
  content: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_MODAL:
      return { ...state, showModal: true };
    case types.HIDE_MODAL:
      return { ...state, showModal: false };
    case types.CHANGE_MODAL_TITLE:
      const { title } = action.payLoad;
      return { ...state, title: title };
    case types.CHANGE_MODAL_CONTENT:
      const { content } = action.payLoad;
      return { ...state, content: content };
    default:
      return state;
  }
};

export default reducer;
