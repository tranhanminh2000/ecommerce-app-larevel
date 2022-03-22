import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import "./header.scss";
import { NAV_LINK_LIST } from "../../constants/navLink.constant";
import classNames from "classnames";
import { Link, useMatch } from "react-router-dom";

const Header = () => {
    function MenuItemLink({ label, to, activeOnlyWhenExact }) {
        let match = useMatch({
            path: to,
            exact: activeOnlyWhenExact,
        });

        return (
            <li>
                <Link
                    className={classNames("font-grey-color", {
                        "font-primary-color": match,
                        "fw-bold": match,
                    })}
                    to={to}
                >
                    {label}
                </Link>
            </li>
        );
    }

    const renderMenuLink = (list) => {
        let xhtml = [];
        xhtml = list.map((listItem) => {
            return (
                <MenuItemLink
                    label={listItem.label}
                    to={listItem.path}
                    activeOnlyWhenExact={true}
                />
            );
        });
        return xhtml;
    };
    return (
        <>
            <div class="d-flex justify-content-center bd-darkLight bg-primary-color">
                <div class="p-2 bd-highlight text-light">
                    Contact: 1900-6099
                </div>
                <div class="p-2 bd-highlight text-light">Fax: 18899888</div>
                <div class="p-2 bd-highlight text-light">News</div>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <div to="/home" className="navbar-brand logo" href="#">
                            <div className="image-wrapper">
                                <img
                                    src={"/logo.png"}
                                    alt=""
                                    className="d-inline-block align-text-top"
                                />
                            </div>
                        </div>
                        <form class="d-flex">
                            <input
                                class="form-control me-2 search-input"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button
                                class="btn bg-primary-color text-light"
                                type="submit"
                            >
                                <BiSearchAlt />
                            </button>
                        </form>
                        <ul className="navbar-nav mb-2 mb-lg-0  navigation">
                            {renderMenuLink(NAV_LINK_LIST)}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
