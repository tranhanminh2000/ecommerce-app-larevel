import * as types from "../constants";

export const showModal = () => {
    return async (dispatch) => {
        dispatch({ type: types.SHOW_MODAL });
    };
};

export const hideModal = () => {
    return async (dispatch) => {
        dispatch({ type: types.HIDE_MODAL });
    };
};

export const changeModalTitle = (title) => {
    return async (dispatch) => {
        dispatch({ type: types.CHANGE_MODAL_TITLE, payLoad: { title: title } });
    };
};

export const changeModalContent = (content) => {
    return async (dispatch) => {
        dispatch({
            type: types.CHANGE_MODAL_CONTENT,
            payLoad: { content: content },
        });
    };
};
