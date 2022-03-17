import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import delayAsync from "../../common/delay.js";
import Carousel from "../../component/Carousel/Carousel.jsx";
import Feature from "../../component/Feature/Feature.jsx";
import Layout from "../../component/Layout/Layout.jsx";
import AxiosService from "../../services/AxiosService.js";
import "./home.scss";
import * as types from "../../constants";

const Home = () => {
    const [listMostDiscount, setListMostDiscount] = useState([]);
    const [feature, setFeature] = useState({
        type: "",
        list: [],
    });

    const dispatch = useDispatch();

    useEffect(() => {
        getListMostDiscount();
        getListRecommended();
    }, []);

    const getListMostDiscount = async () => {
        const res = await AxiosService.get("/books/mostDiscount?size=10");
        await delayAsync(500);
        setListMostDiscount(res.data);
    };

    const getListRecommended = async () => {
        const res = await AxiosService.get("/books/recommended?size=8");
        setFeature({ type: "recommended", list: "" });
        await delayAsync(500);
        setFeature({ ...feature, type: "recommended", list: res.data });
    };

    const getListPopular = async () => {
        const res = await AxiosService.get("/books/popular?size=8");
        setFeature({ type: "popular", list: "" });
        await delayAsync(500);
        setFeature({ ...feature, type: "popular", list: res.data });
    };

    const linkToShop = (e) => {
        const sort = {
            title: "Sort By : on sale",
            by: "type",
            value: "onSale",
        };
        dispatch({ type: types.SET_SORT, payLoad: { sort: sort } });
        dispatch({ type: types.SET_PAGE, payLoad: { page: 1 } });
    };

    return (
        <Layout>
            <div className="home">
                <section className="container on-sale">
                    <div className="on-sale-header">
                        <h2 className="title">On Sale</h2>
                        <Link
                            to="/shop"
                            className="view-all btn"
                            onClick={() => linkToShop()}
                        >
                            View All
                        </Link>
                    </div>

                    <div className="on-sale-content">
                        <Carousel list={listMostDiscount} />
                    </div>
                </section>

                <section className="container feature">
                    <div className="feature-header">
                        <h2 className="title">Feature Books</h2>
                        <div className="options">
                            <button
                                className={classNames("btn recommend", {
                                    active: feature.type === "recommended",
                                })}
                                onClick={getListRecommended}
                            >
                                Recommended
                            </button>
                            <button
                                className={classNames("btn popular", {
                                    active: feature.type === "popular",
                                })}
                                onClick={getListPopular}
                            >
                                Popular
                            </button>
                        </div>
                    </div>

                    <div className="feature-content">
                        <Feature list={feature.list} />
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Home;
