import classNames from "classnames";
import React from "react";
import Layout from "../../component/Layout/Layout.jsx";
import NotFoundItem from "../../component/NotFoundItem/NotFoundItem";
import "./cart.scss";

const Cart = () => {
    return (
        <Layout>
            <div className="cart">
                <section className="container">
                    <h4 className="cart-title">Your cart: 0 items</h4>
                    <div className="row">
                        <div className="col-12 col-md-8">
                            {/* <CardList
                                list={cart.cartList}
                                handleRemoveItem={handleRemoveItem}
                                handleIncreaseQuantity={handleIncreaseQuantity}
                                handleDecreaseQuantity={handleDecreaseQuantity}
                            /> */}
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="total">
                                <div className="total-title">Cart Totals</div>
                                <div className="total-content">
                                    <div className="price">0$</div>
                                    <button>Place Order</button>
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
