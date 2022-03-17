import * as types from "../constants";

const initialState = {
    sort: {
        title: "Sort By : on sale",
        by: "type",
        value: "onSale",
    },
    filter: {
        author: null,
        category: null,
        rating: null,
    },
    size: 5,
    page: 1,
    data: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_BOOK_LIST_REQUEST:
            return { ...state, loading: true };
        case types.GET_BOOK_LIST_SUCCESS:
            const data = action.payLoad.data;
            return { ...state, data: data, loading: false };
        case types.GET_BOOK_LIST_FAILED:
            return { ...state, loading: false };
        case types.SET_SORT:
            const { title, by, value } = action.payLoad.sort;
            return {
                ...state,
                sort: {
                    title: title,
                    by: by,
                    value: value,
                },
            };
        case types.SET_SIZE:
            const size = action.payLoad.size;
            return { ...state, size: size };
        case types.SET_PAGE:
            const page = action.payLoad.page;
            return { ...state, page: page };
        case types.SET_FILTER: {
            const { title, by, value } = action.payLoad.filter;

            let filterExist = state.filter[title];

            if (filterExist && (filterExist.value == value)) {
                return {
                    ...state,
                    filter: { ...state.filter, [title]: null },
                };
            } else {
                return {
                    ...state,
                    filter: { ...state.filter, [title]: { by, value } },
                };
            }
        }
        default:
            return state;
    }
};

export default reducer;
