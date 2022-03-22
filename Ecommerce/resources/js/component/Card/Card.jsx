import React from "react";
import { Link } from "react-router-dom";
import "./card.scss";

function Card({ item }) {
    return (
        <Link
            to="/"
            class="card rounded-0"
            style={{ height: "400px", overflow: "hidden" }}
        >
            <div className="wrapper-img" style={{ height: "230px" }}>
                <img
                    src={`/asset/${item.cover_photo[0].cover_photo_item}.png`}
                    class="card-img-top rounded-0"
                    alt="..."
                    style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                    }}
                />
            </div>
            <div class="card-body d-flex flex-column justify-content-between">
                <p class="card-text mb-2" style={{ height: "40px" }}>
                    {item.product_name}
                </p>
                <div class="card-price">
                    {item.discount_price ? (
                        <>
                            <div className="font-primary-color fw-bold">
                                {item.discount_price}$
                            </div>
                            <div
                                className="font-grey-color text-decoration-line-through"
                                style={{ fontSize: "0.9rem" }}
                            >
                                {item.product_price}$
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="font-primary-color fw-bold">
                                {item.product_price}$
                            </div>
                            <div style={{ height: "1.4rem" }}></div>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default Card;
