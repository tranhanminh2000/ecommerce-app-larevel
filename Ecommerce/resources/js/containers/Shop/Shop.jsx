import React from "react";
import Layout from "../../component/Layout/Layout.jsx";

const Shop = () => {

    return (
        <div className="shop">
            <Layout>
                <div className="section-main">
                    <div className="container">
                        <div className="wrapper">
                            <h4 className="title">
                                Product
                                </h4>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-2 filterQuery filter-section">
                                <h4 className="filter-heading">Filter By</h4>
                            </div>
                            <div className="col-12 col-sm-10 books-section">
                                <div className="utilities-bar">
                                    <p className="showing-title">
                                        {/* Showing {shopProduct.data?.from}-
                                        {shopProduct.data?.to} Of{" "}
                                        {shopProduct.data?.total} Books */}
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
