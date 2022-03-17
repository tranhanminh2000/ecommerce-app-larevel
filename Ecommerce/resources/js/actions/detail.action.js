import * as types from "../constants";
import AxiosService from "../services/AxiosService";

export const actionGetBookDetail = (bookId) => {
    return async (dispatch) => {
        dispatch({ type: types.GET_BOOK_DETAIL_REQUEST });
        const res = await AxiosService.get("/books/" + bookId);
        if (res.status === 200) {
            dispatch({
                type: types.GET_BOOK_DETAIL_SUCCESS,
                payLoad: { detail: res.data },
            });
        } else {
            dispatch({ types: types.GET_BOOK_DETAIL_FAILED });
        }
    };
};
