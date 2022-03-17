import * as types from "../constants";

let initialState = {
    user: null,
    isLoggedIn: false,
    authenticating: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_LOGIN: {
            let authenticating = !state.authenticating;
            return { ...state, authenticating: authenticating };
        }
        case types.USER_LOGGED_IN: {
            let { id, fullName } = action.payLoad;
            return {
                ...state,
                user: { id: id, fullName: fullName },
                isLoggedIn: true,
            };
        }
        case types.USER_LOGOUT: {
            let authenticating = !state.authenticating;
            return {
                ...state,
                user: null,
                isLoggedIn: false,
                authenticating: authenticating,
            };
        }

        default:
            return state;
    }
};

export default reducer;
