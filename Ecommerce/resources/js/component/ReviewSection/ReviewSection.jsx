import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../actions";
import formatDate from "../../common/formatDate";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination.jsx";
import DropdownMenu from "./../DropdownMenu/DropdownMenu";
import ReviewForm from "./../ReviewForm/ReviewForm";
import "./reviewSection.scss";

const sortList = [
    { title: "Sort by: newest to oldest", by: "review_date", value: "desc" },
    { title: "Sort by: oldest to newest", by: "review_date", value: "asc" },
];

const sizeList = [5, 15, 20, 25];

function ReviewSection() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const review = useSelector((state) => state.review);

    const [condition, setCondition] = useState({
        size: 5,
        id: id,
        sort: {
            title: "Sort by: newest to oldest",
            by: "review_date",
            value: "desc",
        },
        filter: null,
        page: 1,
    });

    useEffect(() => {
        dispatch(actions.actionGetProductReviews(condition));
    }, [condition]);

    const handlePaginate = (target) => {
        if (target.url === null) {
            return;
        }
        if (target.label.includes("Previous")) {
            setCondition({ ...condition, page: --condition.page });
            return;
        }
        if (target.label.includes("Next")) {
            setCondition({ ...condition, page: ++condition.page });
            return;
        }
        setCondition({ ...condition, page: target.label });
    };

    const handleFilter = (filterBy = null, filterValue = null) => {
        if (filterBy === null && filterValue === null) {
            setCondition({
                ...condition,
                filter: null,
                page: 1,
            });
        } else {
            setCondition({
                ...condition,
                filter: { by: filterBy, value: filterValue },
                page: 1,
            });
        }
    };

    const handleSort = (sortTitle, sortBy, sortValue) => {
        setCondition({
            ...condition,
            sort: { title: sortTitle, by: sortBy, value: sortValue },
            page: 1,
        });
    };

    const handleSize = (size) => {
        setCondition({
            ...condition,
            size: size,
            page: 1,
        });
    };

    const renderListStarItem = (list) => {
        let xhtml = [];
        xhtml = list.map((listItem) => {
            return (
                <span
                    className={classNames("star", {
                        active:
                            condition.filter?.value === listItem.rating_star,
                    })}
                    onClick={() =>
                        handleFilter("rating_star", listItem.rating_star)
                    }
                >
                    {listItem.rating_star} star({listItem.count}) |
                </span>
            );
        });
        return xhtml;
    };

    const renderListReviewItem = (list = []) => {
        let xhtml = [];
        xhtml = list.map((listItem) => {
            return (
                <li className="comment-review-item border-bottom">
                    <h4 className="comment-review-title">
                        {listItem.review_title} !!! |{" "}
                        <span>{listItem.rating_star} star</span>
                    </h4>
                    <p className="comment-review-content">
                        {listItem.review_details}
                    </p>
                    <div className="comment-review-time d-flex justify-content-between">
                        <div>
                            <i>
                                By:{" "}
                                <b>
                                    {listItem.user.last_name +
                                        listItem.user.first_name}
                                </b>
                            </i>
                        </div>
                        {formatDate(listItem.review_date)}
                    </div>
                </li>
            );
        });
        return xhtml;
    };

    const returnDefaultState = useCallback(() => {
        setCondition({
            id: id,
            size: 5,
            sort: {
                title: "Sort by: newest to oldest",
                by: "review_date",
                value: "desc",
            },
            filter: null,
            page: 1,
        });
    });

    return (
        <div className="section-product-review">
            <div className="row">
                <div className="col-12 col-sm-8 ">
                    <div className="customer-review shadow">
                        <h3 className="title">
                            Customer reviews
                            {condition.filter === null ? null : (
                                <span className="sub-title filterBy">
                                    (Filtered by {condition.filter.value} star)
                                </span>
                            )}
                        </h3>
                        <div className="data-star">
                            <span className="star-average">
                                {review.avgStar} <AiFillStar />
                            </span>
                            <div className="all-star">
                                {renderListStarItem(review.listStarClassify)}
                                <span
                                    style={{ width: 40, textAlign: "center" }}
                                    className={classNames("star", {
                                        active: condition.filter === null,
                                    })}
                                    onClick={() => handleFilter()}
                                >
                                    ({review.totalReview})
                                </span>
                            </div>
                        </div>
                        <div className="utilities mt-4">
                            <p className="showing-review">
                                Showing {review.reviewData?.from}-
                                {review.reviewData?.to} of{" "}
                                {review.reviewData?.total} reviews
                            </p>
                            <div className="button-group d-flex">
                                <DropdownMenu
                                    id="sort"
                                    title={condition.sort.title}
                                    list={sortList}
                                    click={handleSort}
                                />

                                <button
                                    class="btn bg-primary-color mx-3 text-light dropdown-toggle show-btn"
                                    type="button"
                                    id="show"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Show {condition.size}
                                </button>
                                <ul
                                    class="dropdown-menu"
                                    aria-labelledby="show"
                                >
                                    {sizeList.map((ele) => {
                                        return (
                                            <li onClick={() => handleSize(ele)}>
                                                <div class="dropdown-item">
                                                    Show {ele}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <ul className="comment-review">
                            {renderListReviewItem(review.reviewData?.data)}
                        </ul>
                        <Pagination
                            paginateList={review.reviewData?.links}
                            handlePaginate={handlePaginate}
                        />
                        {review.loading ? <Loading /> : null}
                    </div>
                </div>
                <div className="col-12 col-sm-4 ">
                    <ReviewForm returnDefaultState={returnDefaultState} />
                </div>
            </div>
        </div>
    );
}

export default ReviewSection;
