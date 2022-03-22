import * as types from "../constants";

const initialState = {
    onSaleList: [],
    recommendList: [],
    popularList: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ON_SALE_LIST: {
            const { onSaleList } = action.payLoad;
            return { ...state, onSaleList };
        }
        case types.GET_RECOMMEND_LIST: {
            const { recommendList } = action.payLoad;
            return { ...state, recommendList };
        }
        case types.GET_POPULAR_LIST: {
            const { popularList } = action.payLoad;
            return { ...state, popularList };
        }
        default:
            return state;
    }
};

export default reducer;
