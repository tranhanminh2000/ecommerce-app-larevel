import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";

const composeEnhancer =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              shouldLHotReload: false,
          })
        : compose;

const configStore = () => {
    const middleWares = [thunk];
    const enhancers = [applyMiddleware(...middleWares)];
    const store = createStore(rootReducer, composeEnhancer(...enhancers));

    return store;
};

export default configStore;
