import React from "react";
import "./skeletonCard.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonCard() {
    return (
        <div className="card bwm-card" style={{ width: "100%" }}>
            <div className="wrapper-img">
                <Skeleton height={"100%"}/>
            </div>
            <div className="card-body">
                <div className="card-body-head">
                    <h5 className="card-title">
                        <Skeleton />
                    </h5>
                    <p className="card-text">
                        <Skeleton />
                    </p>
                </div>
                <div className="card-body-foot">
                    <Skeleton />
                </div>
            </div>
        </div>
    );
}

export default SkeletonCard;
