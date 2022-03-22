import * as types from "../constants";

const initialState = {
    id: null,
    name: "",
    desc: "",
    brand: null,
    category: "",
    price: "",
    discount: null,
    photos: [],
    activePhoto: null,
    quantity: 1,
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PRODUCT_DETAIL_REQUEST:
            return { ...state, loading: true };
        case types.GET_PRODUCT_DETAIL_SUCCESS:
            const {
                id,
                product_name,
                product_desc,
                product_price,
                brand,
                category,
                discount,
                cover_photo,
            } = action.payLoad.detail;
            const productDetail = {
                id: id,
                name: product_name,
                desc: product_desc,
                brand: brand.brand_name,
                category: category.category_name,
                price: product_price,
                discount: discount ? discount.discount_price : null,
                photos: cover_photo,
                activePhoto: cover_photo[0].cover_photo_item,
            };
            return { ...state, ...productDetail, loading: false };
        case types.GET_PRODUCT_DETAIL_FAILED:
            return { ...state, loading: false };
        case types.CHANGE_ACTIVE_PHOTO:
            const { activePhoto } = action.payLoad;
            return { ...state, activePhoto: activePhoto, loading: false };
        case types.INCREASE_QUANTITY:
            return { ...state, quantity: state.quantity + 1 };

        case types.DECREASE_QUANTITY:
            return { ...state, quantity: state.quantity - 1 };
        default:
            return state;
    }
};

export default reducer;
