import { combineReducers } from "redux";
import modal from "./modal.reducer";
import detail from "./detail.reducer";
import review from "./review.reducer";
import shopFilter from "./shopFilter.reducer";
import shopProduct from "./shopProduct.reducer";
import cart from "./cart.reducer";
import auth from "./auth.reducer";

const rootReducer = combineReducers({
    modal,
    detail,
    review,
    shopFilter,
    shopProduct,
    cart,
    auth,
});

export default rootReducer;
