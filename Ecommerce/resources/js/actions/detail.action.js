import * as types from "../constants";
import AxiosService from "../services/AxiosService";

export const actionGetProductDetail = (productId) => {
    return async (dispatch) => {
        dispatch({ type: types.GET_PRODUCT_DETAIL_REQUEST });
        const res = await AxiosService.get("/product/" + productId);
        if (res.status === 200) {
            dispatch({
                type: types.GET_PRODUCT_DETAIL_SUCCESS,
                payLoad: { detail: res.data },
            });
        } else {
            dispatch({ types: types.GET_PRODUCT_DETAIL_FAILED });
        }
    };
};
