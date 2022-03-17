import React from "react";
import "./carousel.scss";
import { chunk } from "lodash";
import Card from "./../Card/Card";
import classNames from "classnames";
import SkeletonCard from "./../../skeletons/SkeletonCard/SkeletonCard";

function Carousel({ list }) {
    const listCarousel = chunk(list, 4); // [[1,2,3,4],[5,6,7,8],[9,10]]

    const renderBookItem = (listBook) => {
        let xhtml = [];

        xhtml = listBook?.map((book) => {
            return (
                <div className="col-6 col-sm-3 product-list-item">
                    <Card item={book} />
                </div>
            );
        });

        return xhtml;
    };

    const renderCarouselItem = (listCarousel) => {
        let xhtml = [];

        xhtml = listCarousel.map((carouselItem, index) => {
            return (
                <div
                    className={classNames("carousel-item", {
                        active: index === 0,
                    })}
                >
                    <div className="row">{renderBookItem(carouselItem)}</div>
                </div>
            );
        });

        return xhtml;
    };

    const renderCarouselSkeleton = () => {
        return (
            <div className={classNames("carousel-item active")}>
                <div className="row">
                    <div className="col-6 col-sm-3 product-list-item">
                        <SkeletonCard />
                    </div>
                    <div className="col-6 col-sm-3 product-list-item">
                        <SkeletonCard />
                    </div>
                    <div className="col-6 col-sm-3 product-list-item">
                        <SkeletonCard />
                    </div>
                    <div className="col-6 col-sm-3 product-list-item">
                        <SkeletonCard />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="slider">
            <div
                id="carouselExampleControlsNoTouching"
                class="carousel slide"
                data-bs-touch="false"
                data-bs-interval="false"
            >
                <div class="carousel-inner">
                    {list.length ? renderCarouselItem(listCarousel) : null}
                    {list.length === 0 ? renderCarouselSkeleton() : null}
                </div>
                <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControlsNoTouching"
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
                    data-bs-target="#carouselExampleControlsNoTouching"
                    data-bs-slide="next"
                >
                    <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Carousel;
