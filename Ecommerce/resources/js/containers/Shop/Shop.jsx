import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import Accordion from "../../component/Accordian/Accordion";
import Layout from "../../component/Layout/Layout.jsx";
import ShopProductList from "../../component/ShopProductList/ShopProductList.jsx";
import * as types from "../../constants";
import delayAsync from "./../../common/delay";
import DropdownMenu from "./../../component/DropdownMenu/DropdownMenu";
import Pagination from "./../../component/Pagination/Pagination.jsx";
import "./shop.scss";

const sortList = [
    { title: "Sort By : on sale", by: "type", value: "onSale" },
    { title: "Sort By : popularity", by: "type", value: "popular" },
    { title: "Sort By : price high to low", by: "type", value: "desc" },
    { title: "Sort By : price low to high", by: "type", value: "asc" },
];

const sizeList = [5, 15, 20, 25];

const Shop = () => {
    const dispatch = useDispatch();
    const shopFilter = useSelector((state) => state.shopFilter);
    const shopProduct = useSelector((state) => state.shopProduct);

    useEffect(() => {
        dispatch(actions.actionGetFilterList());
    }, []);

    useEffect(() => {
        getBookLIst();
    }, [
        shopProduct.sort.by,
        shopProduct.sort.value,
        shopProduct.size,
        shopProduct.page,
        shopProduct.filter.author,
        shopProduct.filter.category,
        shopProduct.filter.rating,
    ]);

    const getBookLIst = () => {
        const condition = {
            size: shopProduct.size,
            sort: shopProduct.sort,
            filter: shopProduct.filter,
            page: shopProduct.page,
        };
        dispatch(actions.actionGetBookList(condition));
    };

    const handleSort = async (sortTile, sortBy, sortValue) => {
        const sort = { title: sortTile, by: sortBy, value: sortValue };

        await delayAsync(500);

        dispatch({ type: types.SET_SORT, payLoad: { sort: sort } });
        dispatch({ type: types.SET_PAGE, payLoad: { page: 1 } });
    };

    const handleSize = (size) => {
        dispatch({ type: types.SET_SIZE, payLoad: { size: size } });
        dispatch({ type: types.SET_PAGE, payLoad: { page: 1 } });
    };

    const handlePaginate = (target) => {
        if (target.url === null) {
            return;
        }
        if (target.label.includes("Previous")) {
            dispatch({
                type: types.SET_PAGE,
                payLoad: { page: shopProduct.page - 1 },
            });
            return;
        }
        if (target.label.includes("Next")) {
            dispatch({
                type: types.SET_PAGE,
                payLoad: { page: shopProduct.page + 1 },
            });
            return;
        }
        dispatch({
            type: types.SET_PAGE,
            payLoad: { page: parseInt(target.label) },
        });
    };

    const handleFilter = (title, filterBy, filterValue) => {
        const filter = { title: title, by: filterBy, value: filterValue };
        dispatch({ type: types.SET_FILTER, payLoad: { filter: filter } });
    };

    return (
        <div className="shop">
            <Layout>
                <div className="section-main">
                    <div className="container">
                        <div className="wrapper">
                            <h4 className="title">
                                Books
                                {shopProduct.filter.author ||
                                shopProduct.filter.category ||
                                shopProduct.filter.rating ? (
                                    <span className="filter-title">
                                        ( Filter by:{" "}
                                        {shopProduct.filter.author
                                            ? `Author: ${shopProduct.filter.author.value}`
                                            : null}{" "}
                                        {shopProduct.filter.category
                                            ? `Category: ${shopProduct.filter.category.value}`
                                            : null}{" "}
                                        {shopProduct.filter.rating
                                            ? `Rating: ${shopProduct.filter.rating.value}`
                                            : null}{" "}
                                        )
                                    </span>
                                ) : null}
                            </h4>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-2 filterQuery filter-section">
                                <h4 className="filter-heading">Filter By</h4>
                                <Accordion
                                    handleFilter={handleFilter}
                                    content={{
                                        title: "author",
                                        field: "authorName",
                                        list: shopFilter.authorList,
                                    }}
                                />
                                <Accordion
                                    handleFilter={handleFilter}
                                    content={{
                                        title: "category",
                                        field: "categoryName",
                                        list: shopFilter.categoryList,
                                    }}
                                />
                                <Accordion
                                    handleFilter={handleFilter}
                                    content={{
                                        title: "rating",
                                        field: "ratingStar",
                                        list: shopFilter.ratingList,
                                    }}
                                />
                            </div>
                            <div className="col-12 col-sm-10 books-section">
                                <div className="utilities-bar">
                                    <p className="showing-title">
                                        Showing {shopProduct.data?.from}-
                                        {shopProduct.data?.to} Of{" "}
                                        {shopProduct.data?.total} Books
                                    </p>
                                    <div className="button-group">
                                        <div class="dropdown sort">
                                            <DropdownMenu
                                                title={shopProduct.sort.title}
                                                id="sort"
                                                list={sortList}
                                                click={handleSort}
                                            />
                                        </div>

                                        <div class="dropdown show-quantity">
                                            <button
                                                class="btn btn-secondary dropdown-toggle"
                                                type="button"
                                                id="show"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Show: {shopProduct.size}
                                            </button>
                                            <ul
                                                class="dropdown-menu"
                                                aria-labelledby="show"
                                            >
                                                {sizeList.map((item) => {
                                                    return (
                                                        <li>
                                                            <span
                                                                class="dropdown-item"
                                                                onClick={() =>
                                                                    handleSize(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                Show: {item}
                                                            </span>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <ShopProductList
                                    productList={shopProduct.data?.data}
                                />
                                {shopProduct.data?.data.length > 0 ? (
                                    <div className="row pagination">
                                        <Pagination
                                            paginateList={
                                                shopProduct.data?.links
                                            }
                                            handlePaginate={handlePaginate}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Shop;
