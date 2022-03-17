import delayAsync from "../common/delay";
import * as types from "../constants";
import AxiosService from "../services/AxiosService";

const generateUriFromCondition = (condition) => {
    const size = `size=${condition.size}`;
    const sort = `sort[${condition.sort.by}]=${condition.sort.value}`;
    const id = `bookId=${condition.id}`;
    const filter =
        condition.filter === null
            ? ""
            : `&filter[${condition.filter.by}]=${condition.filter.value}`;
    const page = `page=${condition.page}`;

    const uri = `/reviews?${size}&${sort}${filter}&${id}&${page}`;

    return uri;
};

export const actionGetBookReviews = (condition) => {
    return async (dispatch) => {
        dispatch({ type: types.GET_BOOK_REVIEWS_REQUEST });
        try {
            const uri = generateUriFromCondition(condition);
            const res = await AxiosService.get(uri);
            if (res.status === 200) {
                await delayAsync(300);
                dispatch({
                    type: types.GET_BOOK_REVIEWS_SUCCESS,
                    payLoad: { review: res.data.data },
                });
            }
        } catch (error) {
            delayAsync(300);
            dispatch({ type: types.GET_BOOK_REVIEWS_FAILED });
        }
    };
};
