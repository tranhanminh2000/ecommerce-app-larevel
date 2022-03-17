import React from "react";
import "./cartList.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";

const CardList = ({
    list,
    handleRemoveItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
}) => {
    const renderListItem = (list) => {
        let xhtml = [];

        xhtml = list.map((listItem, index) => {
            return (
                <tr>
                    <td>
                        <Link
                            to={`/detail/${listItem.id}`}
                            className="wrapper-img"
                            title={listItem.title}
                        >
                            <img
                                src={"/bookcover/" + listItem.photo + ".jpg"}
                                alt=""
                            />
                        </Link>
                    </td>
                    <td>
                        <Link
                            to={`/detail/${listItem.id}`}
                            className="product-info"
                            title={listItem.title}
                        >
                            <div className="title">{listItem.title}</div>
                            <div className="author">{listItem.author}</div>
                        </Link>
                    </td>
                    <td>
                        {listItem.price && listItem.discountPrice ? (
                            <>
                                <div className="discount">
                                    {listItem.discountPrice}$
                                </div>
                                <div className="price bwm-line-through">
                                    {listItem.price}$
                                </div>
                            </>
                        ) : (
                            <div>{listItem.price}$</div>
                        )}
                    </td>
                    <td>
                        <div className="control-quantity">
                            <span
                                className="minus"
                                onClick={() => handleDecreaseQuantity(index)}
                            >
                                -
                            </span>
                            <span className="number">{listItem.quantity}</span>
                            <span
                                className={classNames("plus", {
                                    disabled: listItem.quantity === 8,
                                })}
                                onClick={() => handleIncreaseQuantity(index)}
                            >
                                +
                            </span>
                        </div>
                    </td>
                    <td>
                        <div>
                            {listItem.discountPrice
                                ? (
                                      listItem.quantity *
                                      parseFloat(listItem.discountPrice)
                                  ).toFixed(2)
                                : (
                                      listItem.quantity *
                                      parseFloat(listItem.price)
                                  ).toFixed(2)}
                            $
                        </div>
                    </td>
                    <td>
                        <div
                            className={"remove"}
                            onClick={() => handleRemoveItem(listItem.id)}
                        >
                            X
                        </div>
                    </td>
                </tr>
            );
        });

        return xhtml;
    };

    return (
        <table class="table">
            <thead>
                <tr>
                    <th scope="col ">Product</th>
                    <th scope="col "></th>
                    <th scope="col ">Price</th>
                    <th scope="col ">Quantity</th>
                    <th scope="col ">Total</th>
                    <th scope="col "></th>
                </tr>
            </thead>
            <tbody>{renderListItem(list)}</tbody>
        </table>
    );
};

export default CardList;
