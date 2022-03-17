import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../actions";
import Layout from "../../component/Layout/Layout.jsx";
import LoginForm from "../../component/LoginForm/LoginForm";
import NotFoundItem from "../../component/NotFoundItem/NotFoundItem";
import * as types from "../../constants";
import CardList from "./../../component/CartList/CartList.jsx";
import Dialog from "./../../component/Dialog/Dialog.jsx";
import "./cart.scss";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const calculateTotals = (list) => {
        let total = list.reduce((accumulator, current) => {
            if (current.discountPrice) {
                return (
                    accumulator +
                    parseFloat(current.discountPrice) * current.quantity
                );
            } else {
                return (
                    accumulator + parseFloat(current.price) * current.quantity
                );
            }
        }, 0);
        return total;
    };

    let total = calculateTotals(cart.cartList).toFixed(2);

    const handleRemoveItem = (id) => {
        dispatch({ type: types.REMOVE_CART_ITEM, payLoad: { id: id } });
    };

    const handleDecreaseQuantity = (index) => {
        dispatch({
            type: types.DECREASE_ITEM_QUANTITY,
            payLoad: { index: index },
        });
    };

    const handleIncreaseQuantity = (index) => {
        dispatch({
            type: types.INCREASE_ITEM_QUANTITY,
            payLoad: { index: index },
        });
    };

    const handlePlaceOrder = () => {
        if (auth.user) {
            let orderDetail = {
                userId: auth.user.id,
                orderAmount: total,
            };

            orderDetail.cart = cart.cartList.map((cartItem) => {
                return {
                    bookId: cartItem.id,
                    quantity: cartItem.quantity,
                    price: cartItem.discountPrice
                        ? parseFloat(cartItem.discountPrice) * cartItem.quantity
                        : parseFloat(cartItem.price) * cartItem.quantity,
                };
            });

            dispatch(actions.actPostOrders(orderDetail, navigate));
        } else {
            dispatch(actions.showModal());
            dispatch(actions.changeModalTitle("Login"));
            dispatch(actions.changeModalContent(<LoginForm />));
        }
    };

    const handleShowDialog = () => {
        if (cart.cartList.length === 0) {
            return;
        }
        dispatch(actions.showModal());
        dispatch(actions.changeModalTitle("Confirm Ordering"));
        dispatch(
            actions.changeModalContent(
                <Dialog
                    message={`Totals: ${total}$. Do you want to place order ?`}
                    action={handlePlaceOrder}
                />
            )
        );
    };

    return (
        <Layout>
            <div className="cart">
                <section className="container">
                    <h4 className="cart-title">
                        Your cart: {cart.cartNumber} items
                    </h4>
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <CardList
                                list={cart.cartList}
                                handleRemoveItem={handleRemoveItem}
                                handleIncreaseQuantity={handleIncreaseQuantity}
                                handleDecreaseQuantity={handleDecreaseQuantity}
                            />
                            {cart.cartList.length === 0 ? <NotFoundItem img={"/emptyCart.png"} width="400px"/> : null}
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="total">
                                <div className="total-title">Cart Totals</div>
                                <div className="total-content">
                                    <div className="price">{total}$</div>
                                    <button
                                        className={classNames("btn order", {
                                            disabled:
                                                cart.cartList.length === 0,
                                        })}
                                        onClick={handleShowDialog}
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Cart;
