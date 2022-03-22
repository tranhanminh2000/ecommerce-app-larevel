import { combineReducers } from "redux";
import home from "./home.reducer.js";
import detail from "./detail.reducer.js";
import review from "./review.reducer.js";

const rootReducer = combineReducers({
    review,
    detail,
    home,
});

export default rootReducer;
