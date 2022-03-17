import React from "react";
import Card from "../Card/Card";
import NotFoundItem from "../NotFoundItem/NotFoundItem";
import SkeletonCard from "./../../skeletons/SkeletonCard/SkeletonCard";
import "./ShopProductList.scss";

function ShopProductList({ productList }) {
    const renderListItem = (list) => {
        let xhtml = [];

        xhtml = list?.map((listItem) => {
            return (
                <div className="col-6 col-sm-3">
                    <Card item={listItem} />
                </div>
            );
        });
        return xhtml;
    };

    // const renderSkeleton = (quantity) => {
    //     let abstractList = Array(quantity);
    //     abstractList.fill(0);

    //     let xhtml = abstractList.map(() => {
    //         return (
    //             <div className="col-6 col-sm-3">
    //                 <SkeletonCard />
    //             </div>
    //         );
    //     });
    //     return xhtml;
    // };

    return (
        <div className="row product-list">
            {productList?.length > 0 ? (
                renderListItem(productList)
            ) : (
                <NotFoundItem
                    img="/noProductFound.png"
                    width={"300px"}
                    height={"300px"}
                />
            )}
        </div>
    );
}

export default ShopProductList;
