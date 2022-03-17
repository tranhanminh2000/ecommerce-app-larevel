import React, { useEffect, useState } from "react";
import Layout from "./../../component/Layout/Layout.jsx";
import { useParams } from "react-router-dom";
import * as actions from "../../actions";
import * as types from "../../constants";
import "./detail.scss";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import ReviewSection from "../../component/ReviewSection/ReviewSection.jsx";
import Skeleton from "react-loading-skeleton";
import delayAsync from "./../../common/delay";
import Loading from "../../component/Loading/Loading.jsx";

const Detail = () => {
    let { id } = useParams();

    const [alert, setAlert] = useState({
        type: "",
        message: "",
    });
    const dispatch = useDispatch();

    const detail = useSelector((state) => state.detail);
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(actions.actionGetBookDetail(id));
    }, []);

    const handleAddToCart = async () => {
        let item = {
            id: detail.id,
            title: detail.title,
            author: detail.author,
            price: detail.price,
            discountPrice: detail.discountPrice,
            photo: detail.photo,
            quantity: detail.quantity,
        };

        if (!item.title && !item.author) {
            return;
        }

        let itemExist = cart.cartList.find(
            (cartItem) => cartItem.id === item.id
        );

        if (itemExist) {
            if (itemExist.quantity + item.quantity > 8) {
                setAlert({
                    type: "error",
                    message:
                        "Total quantity of this book in cart is not allowed over 8 ",
                });
                await delayAsync(3000);
                setAlert({ type: "", message: "" });
            } else {
                dispatch({
                    type: types.ADD_CART_ITEM_SUCCESS,
                    payLoad: { cartItem: item },
                });
                setAlert({
                    type: "success",
                    message: "Add item to cart successfully",
                });
                await delayAsync(3000);
                setAlert({ type: "", message: "" });
            }
        } else {
            dispatch({
                type: types.ADD_CART_ITEM_SUCCESS,
                payLoad: { cartItem: item },
            });
            setAlert({
                type: "success",
                message: "Add item to cart successfully",
            });
            await delayAsync(3000);
            setAlert({ type: "", message: "" });
        }
    };

    const handleIncreaseQuantity = () => {
        if (detail.quantity === 8) {
            return;
        }
        dispatch({ type: types.INCREASE_QUANTITY });
    };

    const handleDecreaseQuantity = () => {
        if (detail.quantity === 1) {
            return;
        }
        dispatch({ type: types.DECREASE_QUANTITY });
    };

    return (
        <Layout>
            <div className="detail">
                <div className="container">
                    <h1 className="title">{detail.category}</h1>
                    <div className="section-book-detail">
                        {detail.loading ? <Loading /> : null}
                        <div className="row">
                            <div className="col-12 col-sm-8">
                                <div className="content-detail">
                                    <div className="row wrapper">
                                        <div className="col-4 col-xs-4 left">
                                            <div className="wrapper-img">
                                                {!detail.photo ? (
                                                    <Skeleton
                                                        height={"100%"}
                                                        width={"100%"}
                                                    />
                                                ) : null}
                                                {detail.photo ? (
                                                    <img
                                                        src={`http://127.0.0.1:8000/bookcover/${detail.photo}.jpg`}
                                                        alt=""
                                                    />
                                                ) : null}
                                            </div>
                                            <div className="author">
                                                {detail.author ? (
                                                    <span className="author-name">
                                                        'By ${detail.author}'
                                                    </span>
                                                ) : null}
                                                {!detail.author ? (
                                                    <Skeleton />
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="col-8 col-xs-8 right">
                                            <h3 className="book-name">
                                                {detail.title
                                                    ? detail.title
                                                    : null}
                                                {!detail.title ? (
                                                    <Skeleton />
                                                ) : null}
                                            </h3>
                                            <p className="book-description">
                                                {detail.summary
                                                    ? detail.summary
                                                    : null}
                                                {!detail.summary ? (
                                                    <Skeleton count={5} />
                                                ) : null}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-4">
                                <div className="price-detail">
                                    <div className="price">
                                        {detail.discountPrice ? (
                                            <>
                                                <span
                                                    className={classNames(
                                                        "current",
                                                        {
                                                            "bwm-line-through":
                                                                detail.discountPrice,
                                                        }
                                                    )}
                                                >
                                                    {detail.price}$
                                                </span>
                                                <span className="discount">
                                                    {detail.discountPrice}$
                                                </span>
                                            </>
                                        ) : (
                                            <span className="current">
                                                {detail.price}$
                                            </span>
                                        )}
                                    </div>

                                    <div className="quantity">
                                        <p>Quantity</p>
                                        <div className="control">
                                            <span
                                                className="minus"
                                                onClick={handleDecreaseQuantity}
                                            >
                                                -
                                            </span>
                                            <span className="number">
                                                {detail.quantity}
                                            </span>
                                            <span
                                                className="plus"
                                                onClick={handleIncreaseQuantity}
                                            >
                                                +
                                            </span>
                                        </div>
                                        {alert.type && alert.message ? (
                                            <div
                                                class={classNames("alert", {
                                                    "alert-danger":
                                                        alert.type === "error",
                                                    "alert-success":
                                                        alert.type ===
                                                        "success",
                                                })}
                                                role="alert"
                                                style={{ marginTop: "20px" }}
                                            >
                                                {alert.message}
                                            </div>
                                        ) : null}
                                        <button
                                            className="btn add-to-cart"
                                            onClick={handleAddToCart}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ReviewSection />
                </div>
            </div>
        </Layout>
    );
};

export default Detail;
