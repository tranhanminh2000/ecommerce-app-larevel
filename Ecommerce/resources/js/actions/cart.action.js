import * as actions from "../actions";
import * as types from "../constants";
import DialogSuccess from "../component/DialogSuccess/DialogSuccess";
import AxiosService from "../services/AxiosService";
import DialogFailed from "./../component/DialogFailed/DialogFailed";

export const actPostOrders = (orderDetail, navigate) => {
    return async (dispatch) => {
        try {
            await AxiosService.post("/orders", orderDetail);
            dispatch(actions.showModal());
            dispatch(actions.changeModalTitle("Status Order"));
            dispatch(
                actions.changeModalContent(
                    <DialogSuccess
                        message="Successfully"
                        action={() => {
                            navigate("/home");
                            dispatch(actions.hideModal());
                            clearTimeout(navigateTimeout);
                        }}
                    />
                )
            );
            dispatch({ type: types.RESET_CART });
            let navigateTimeout = setTimeout(() => {
                navigate("/home");
                dispatch(actions.hideModal());
            }, 10000);
        } catch (error) {
            const listItemNotAvailable = error.response.data.data;
            listItemNotAvailable.forEach((itemId) => {
                dispatch({
                    type: types.REMOVE_CART_ITEM,
                    payLoad: { id: itemId },
                });
            });

            dispatch(actions.showModal());
            dispatch(actions.changeModalTitle("Status Order"));
            dispatch(
                actions.changeModalContent(
                    <DialogFailed
                        message={`Failed: ${listItemNotAvailable.toString()} are not available`}
                        action={() => {
                            dispatch(actions.hideModal());
                        }}
                    />
                )
            );
        }
    };
};
