import * as types from "../constants";

let initialState = {
    cartNumber: 0,
    cartList: [],
};

if (localStorage.getItem("cart")) {
    initialState = JSON.parse(localStorage.getItem("cart"));
} else {
    localStorage.setItem("cart", JSON.stringify(initialState));
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_CART_ITEM_SUCCESS:
            let cartItem = {
                id: action.payLoad.cartItem.id,
                title: action.payLoad.cartItem.title,
                author: action.payLoad.cartItem.author,
                price: !action.payLoad.cartItem.price
                    ? null
                    : action.payLoad.cartItem.price,
                discountPrice: action.payLoad.cartItem.discountPrice,
                photo: action.payLoad.cartItem.photo,
                quantity: action.payLoad.cartItem.quantity,
            };

            if (state.cartNumber === 0) {
                state.cartList.push(cartItem);
            } else {
                let isItemExisted = state.cartList.some((ele) => {
                    return ele.id == cartItem.id;
                });

                if (!isItemExisted) {
                    state.cartList.push(cartItem);
                } else {
                    state.cartList = state.cartList.map((item) => {
                        if (item.id == cartItem.id) {
                            return {
                                ...item,
                                quantity: item.quantity + cartItem.quantity,
                            };
                        }
                        return item;
                    });
                }
            }

            localStorage.setItem(
                "cart",
                JSON.stringify({
                    ...state,
                    cartNumber: state.cartNumber + cartItem.quantity,
                })
            );

            return {
                ...state,
                cartNumber: state.cartNumber + cartItem.quantity,
            };

        case types.INCREASE_ITEM_QUANTITY: {
            const index = action.payLoad.index;
            let quantity = state.cartList[index].quantity;

            if (quantity < 8) {
                state.cartNumber++;
                state.cartList[index].quantity++;
            }

            localStorage.setItem(
                "cart",
                JSON.stringify({
                    ...state,
                })
            );

            return {
                ...state,
            };
        }
        case types.DECREASE_ITEM_QUANTITY: {
            const index = action.payLoad.index;

            let quantity = state.cartList[index].quantity;
            if (quantity > 1) {
                state.cartNumber--;
                state.cartList[index].quantity--;
            } else {
                state.cartNumber--;
                state.cartList.splice(action.payLoad.index, 1);
            }

            localStorage.setItem(
                "cart",
                JSON.stringify({
                    ...state,
                })
            );

            return {
                ...state,
            };
        }
        case types.REMOVE_CART_ITEM:
            const id = action.payLoad.id;
            const itemFound = state.cartList.find((item) => item.id === id);

            if (itemFound) {
                const cartFiltered = state.cartList.filter((item) => {
                    return item.id != itemFound.id;
                });

                localStorage.setItem(
                    "cart",
                    JSON.stringify({
                        ...state,
                        cartNumber: state.cartNumber - itemFound.quantity,
                        cartList: cartFiltered,
                    })
                );

                return {
                    ...state,
                    cartNumber: state.cartNumber - itemFound.quantity,
                    cartList: cartFiltered,
                };
            } else {
                return { ...state };
            }

        case types.RESET_CART:
            localStorage.setItem(
                "cart",
                JSON.stringify({ cartNumber: 0, cartList: [] })
            );
            return { cartNumber: 0, cartList: [] };
        default:
            return state;
    }
};

export default reducer;
