import React from "react";
import all from "./loading.scss";
import * as actions from "../../actions";
import { useDispatch } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import classNames from "classnames";
import { NAV_LINK_LIST } from "../../constants/navLink.constant";
import { BarWave } from "react-cssfx-loading";

const Loading = () => {
    return (
        <div className="loading">
            <BarWave className="loading-icon"/>;
            <div className="overlay"></div>
        </div>
    );
};

export default Loading;
