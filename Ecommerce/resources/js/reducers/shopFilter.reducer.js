import * as types from "../constants";

const initialState = {
    categoryList: [],
    authorList: [],
    ratingList: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_FILTER_LIST_REQUEST:
            return { ...state, loading: true };
        case types.GET_FILTER_LIST_SUCCESS:
            const { categoryList, authorList, ratingList } =
                action.payLoad.filterList;
            return {
                ...state,
                categoryList: categoryList,
                authorList: authorList,
                ratingList: ratingList,
                loading: false,
            };
        case types.GET_FILTER_LIST_FAILED:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export default reducer;
