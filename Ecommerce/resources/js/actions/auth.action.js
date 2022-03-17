import * as types from "../constants";
import AxiosService from "../services/AxiosService";

export const actUserLogin = (accessToken) => {
    return async (dispatch) => {
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        dispatch({ type: types.USER_LOGIN });
    };
};

export const actCheckCurrentUser = () => {
    return async (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            const res = await AxiosService.get("/user");

            if (res.status === 200) {
                let user = res.data;

                dispatch({
                    type: types.USER_LOGGED_IN,
                    payLoad: { id: user.id, fullName: user.full_name },
                });
            }
        }
    };
};

export const actUserLogout = () => {
    return async (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            const res = await AxiosService.post("/logout");

            if (res.status === 200) {
                localStorage.removeItem("accessToken");
                dispatch({
                    type: types.USER_LOGOUT,
                });
            }
        }
        return;
    };
};

