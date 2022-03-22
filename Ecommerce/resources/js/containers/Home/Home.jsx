import React, { useEffect } from "react";
import Layout from "../../component/Layout/Layout.jsx";
import "./home.scss";
import Card from "./../../component/Card/Card";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AxiosService from "../../services/AxiosService.js";
import * as types from "../../constants";

const Home = () => {
    const dispatch = useDispatch();

    const home = useSelector((state) => state.home);
    console.log(home);
    useEffect(() => {
        handleGetOnSaleList();
        handleGetRecommendList();
        handleGetPopularList();
    }, []);

    const handleGetOnSaleList = async () => {
        const res = await AxiosService.get("/product?sort=onSale&take=5");
        dispatch({
            type: types.GET_ON_SALE_LIST,
            payLoad: { onSaleList: res.data.resData },
        });
    };

    const handleGetRecommendList = async () => {
        const res = await AxiosService.get("/product?sort=recommend&take=5");
        dispatch({
            type: types.GET_RECOMMEND_LIST,
            payLoad: { recommendList: res.data.resData },
        });
    };

    const handleGetPopularList = async () => {
        const res = await AxiosService.get("/product?sort=popular&take=5");
        dispatch({
            type: types.GET_POPULAR_LIST,
            payLoad: { popularList: res.data.resData },
        });
    };

    return (
        <Layout>
            <div className="home bg-white-smoke-color">
                <div
                    id="carouselExampleFade"
                    class="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                >
                    <div class="carousel-inner" style={{ height: "500px" }}>
                        <div
                            class="carousel-item active"
                            style={{ height: "100%" }}
                        >
                            <img
                                src="/banner/banner4.jpg"
                                class="d-block w-100"
                                alt=""
                                style={{
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                        <div class="carousel-item" style={{ height: "100%" }}>
                            <img
                                src="/banner/banner2.jpg"
                                class="d-block w-100"
                                alt="..."
                                style={{
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                        <div class="carousel-item" style={{ height: "100%" }}>
                            <img
                                src="/banner/banner3.png"
                                class="d-block w-100"
                                alt="..."
                                style={{
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    </div>
                    <button
                        class="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleFade"
                        data-bs-slide="prev"
                    >
                        <span
                            class="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button
                        class="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleFade"
                        data-bs-slide="next"
                    >
                        <span
                            class="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

                <section className="pt-4 pb-4">
                    <div className="container">
                        <div className="onSale-section bg-white-color rounded overflow-hidden">
                            <div className="onSale-header p-3 d-flex justify-content-between align-items-center ">
                                <h3 className="onSale-title m-0">ON SALE</h3>
                                <a href="#" className="font-grey-color">
                                    View All
                                </a>
                            </div>
                            <div className="onSale-body ">
                                <div className="row g-0">
                                    {home.onSaleList.length
                                        ? home.onSaleList.map((listItem) => {
                                              return (
                                                  <div class="col-sm">
                                                      <Card item={listItem} />
                                                  </div>
                                              );
                                          })
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-primary-color pt-4 pb-4">
                    <div className="container">
                        <div className="recommend-section bg-white-color rounded overflow-hidden">
                            <div className="recommend-header p-3 d-flex justify-content-between align-items-center ">
                                <h3 className="recommend-title m-0">
                                    RECOMMEND
                                </h3>
                                <a href="#" className="font-grey-color">
                                    View All
                                </a>
                            </div>
                            <div className="recommend-body ">
                                <div className="row g-0">
                                    {home.recommendList.length
                                        ? home.recommendList.map((listItem) => {
                                              return (
                                                  <div class="col-sm">
                                                      <Card item={listItem} />
                                                  </div>
                                              );
                                          })
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="b pt-4 pb-4">
                    <div className="container">
                        <div className="popular-section bg-white-color rounded overflow-hidden">
                            <div className="popular-header p-3 d-flex justify-content-between align-items-center ">
                                <h3 className="popular-title m-0">POPULAR</h3>
                                <a href="#" className="font-grey-color">
                                    View All
                                </a>
                            </div>
                            <div className="popular-body ">
                                <div className="row g-0">
                                    {home.popularList.length
                                        ? home.popularList.map((listItem) => {
                                              return (
                                                  <div class="col-sm">
                                                      <Card item={listItem} />
                                                  </div>
                                              );
                                          })
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Home;
