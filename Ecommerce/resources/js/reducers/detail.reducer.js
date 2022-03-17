import * as types from "../constants";

const initialState = {
    id: null,
    title: "",
    summary: "",
    price: "",
    discountPrice: null,
    photo: "",
    author: null,
    category: null,
    quantity: 1,
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_BOOK_DETAIL_REQUEST:
            return { ...state, loading: true };
        case types.GET_BOOK_DETAIL_SUCCESS:
            const {
                id,
                book_title,
                book_summary,
                book_price,
                book_cover_photo,
                discount,
                author,
                category,
            } = action.payLoad.detail;
            const bookDetail = {
                id: id,
                title: book_title,
                summary: book_summary,
                price: book_price,
                discountPrice: discount === null ? null : discount.discount_price,
                photo:
                    book_cover_photo !== null
                        ? book_cover_photo
                        : "bookDefault",
                author: author.author_name,
                category: category.category_name,
            };
            return { ...state, ...bookDetail, loading: false };
        case types.GET_BOOK_DETAIL_FAILED:
            return { ...state, loading: false };

        case types.INCREASE_QUANTITY:
            return { ...state, quantity: state.quantity + 1 };

        case types.DECREASE_QUANTITY:
            return { ...state, quantity: state.quantity - 1 };
        default:
            return state;
    }
};

export default reducer;
