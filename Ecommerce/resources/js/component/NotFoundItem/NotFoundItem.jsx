import React from "react";
import "./notFoundItem.scss";

const NotFoundItem = ({ img, width, height }) => {
    return (
        <div className="notFoundItem">
            <div
                className="wrapperImg"
                style={{ width: width, height: height }}
            >
                <img src={img} />
            </div>
        </div>
    );
};

export default NotFoundItem;
