import * as types from "../constants";

const initialState = {
    avgStar: 0,
    listStarClassify: [],
    totalReview: 0,
    reviewData: null,
    loading: false,
};

const generateListStar = (list = []) => {
    let listStar = [];

    for (let i = 1; i <= 5; i++) {
        let listItem = list.find((ele) => {
            return ele.rating_star === i;
        });

        if (listItem) {
            listStar.push(listItem);
        } else {
            listStar.push({ rating_star: i, count: 0 });
        }
    }

    return listStar;
};

const generateTotal = (list = []) => {
    let total = 0;

    total = list.reduce((accumulator, current)=>{
        return accumulator + current.count
    }, total)

    return total;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_BOOK_REVIEWS_REQUEST:
            return { ...state, loading: true };
        case types.GET_BOOK_REVIEWS_SUCCESS:
            const { avg_star, listStarClassify, reviewsData } =
            action.payLoad.review;
            const review = {
                avgStar: avg_star ? parseFloat(avg_star).toFixed(1) : 0,
                listStarClassify: generateListStar(listStarClassify),
                totalReview: generateTotal(listStarClassify),
                reviewData: reviewsData,
            };

            return { ...state, ...review, loading: false };
        case types.GET_BOOK_REVIEWS_FAILED:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default reducer;
