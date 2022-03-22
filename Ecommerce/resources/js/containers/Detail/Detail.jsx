import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../actions";
import Loading from "../../component/Loading/Loading.jsx";
import ReviewSection from "../../component/ReviewSection/ReviewSection.jsx";
import * as types from "../../constants";
import Layout from "./../../component/Layout/Layout.jsx";
import "./detail.scss";
import classNames from "classnames";

const Detail = () => {
    let { id } = useParams();

    const dispatch = useDispatch();

    const detail = useSelector((state) => state.detail);
    console.log(detail);
    // const cart = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(actions.actionGetProductDetail(id));
    }, []);

    // const handleAddToCart = async () => {
    //     let item = {
    //         id: detail.id,
    //         title: detail.title,
    //         author: detail.author,
    //         price: detail.price,
    //         discountPrice: detail.discountPrice,
    //         photo: detail.photo,
    //         quantity: detail.quantity,
    //     };

    //         dispatch({
    //             type: types.ADD_CART_ITEM_SUCCESS,
    //             payLoad: { cartItem: item },
    //         });
    //         setAlert({
    //             type: "success",
    //             message: "Add item to cart successfully",
    //         });

    // };

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

    const handleChangeActivePhoto = (img) => {
        dispatch({
            type: types.CHANGE_ACTIVE_PHOTO,
            payLoad: { activePhoto: img },
        });
    };

    return (
        <Layout>
            <div className="detail pt-5 pb-5">
                <div className="container">
                    <div className="section-product-detail">
                        {detail.loading ? <Loading /> : null}
                        <div className="row">
                            <div className="col-12 col-sm-12 ">
                                <div className="content-detail shadow">
                                    <div className="row wrapper">
                                        <div className="col-12 col-sm-6 left">
                                            <div className="wrapper-img">
                                                {detail.activePhoto ? (
                                                    <img
                                                        src={`/asset/${detail.activePhoto}.png`}
                                                        alt=""
                                                    />
                                                ) : null}
                                            </div>
                                            <div className="img-group mt-3 row">
                                                {detail.photos.length
                                                    ? detail.photos.map(
                                                          (photoItem) => (
                                                              <div className="col-4 col-md-3 ">
                                                                  <img
                                                                      src={`/asset/${photoItem.cover_photo_item}.png`}
                                                                      className={classNames(
                                                                          "border",
                                                                          {
                                                                              "opa-5":
                                                                                  photoItem.cover_photo_item !=
                                                                                  detail.activePhoto,
                                                                          }
                                                                      )}
                                                                      style={{
                                                                          width: "150px",
                                                                          height: "100px",
                                                                          cursor: "pointer",
                                                                      }}
                                                                      onClick={() =>
                                                                          handleChangeActivePhoto(
                                                                              photoItem.cover_photo_item
                                                                          )
                                                                      }
                                                                  ></img>
                                                              </div>
                                                          )
                                                      )
                                                    : null}
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 right">
                                            <h2 className="product-name">
                                                {detail.name
                                                    ? detail.name
                                                    : null}
                                                {!detail.name ? (
                                                    <Skeleton />
                                                ) : null}
                                            </h2>
                                            <p className="product-description">
                                                {detail.desc
                                                    ? detail.desc
                                                    : null}
                                                {!detail.desc ? (
                                                    <Skeleton count={5} />
                                                ) : null}
                                            </p>
                                            <ul>
                                                <li>
                                                    Category:{" "}
                                                    <span className="text">
                                                        {detail.category}
                                                    </span>
                                                </li>
                                                <li>Model: 3918X</li>
                                                <li>Brand: {detail.brand}</li>
                                                <li>
                                                    Price:{" "}
                                                    {detail.discount ? (
                                                        <>
                                                            <span className="mx-1 text-decoration-line-through">
                                                                {detail.price}$
                                                            </span>
                                                            <span className="mx-1 h5 fw-bold font-primary-color">
                                                                {
                                                                    detail.discount
                                                                }
                                                                $
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="mx-1">
                                                            {detail.price}$
                                                        </span>
                                                    )}
                                                </li>
                                            </ul>

                                            <div className="control over-flow-hidden rounded">
                                                <span
                                                    className="minus bg-secondary-color"
                                                    onClick={
                                                        handleDecreaseQuantity
                                                    }
                                                >
                                                    -
                                                </span>
                                                <span className="number">
                                                    {detail.quantity}
                                                </span>
                                                <span
                                                    className="plus bg-secondary-color"
                                                    onClick={
                                                        handleIncreaseQuantity
                                                    }
                                                >
                                                    +
                                                </span>
                                            </div>

                                            <button className="btn btn-warning mt-3 fw-bold text-light">
                                                ADD TO CART
                                            </button>
                                        </div>
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
