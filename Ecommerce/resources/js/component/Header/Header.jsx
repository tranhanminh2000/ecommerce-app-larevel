import React, { useEffect } from "react";
import "./header.scss";
import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import classNames from "classnames";
import { NAV_LINK_LIST } from "../../constants/navLink.constant";
import LoginForm from "../LoginForm/LoginForm";

const Header = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);

    const handleShowLogin = () => {
        dispatch(actions.showModal());
        dispatch(actions.changeModalTitle("Login"));
        dispatch(actions.changeModalContent(<LoginForm />));
    };

    const checkCurrentUser = () => {
        dispatch(actions.actCheckCurrentUser());
    };

    useEffect(() => {
        checkCurrentUser();
    }, [auth.authenticating]);

    const navListItem = ({ label, to, activeOnlyWhen, icon }) => {
        const match = useMatch({
            path: to,
            exact: activeOnlyWhen,
        });

        return (
            <li className="nav-item">
                <Link
                    to={to}
                    className={classNames("nav-link", { active: match })}
                    aria-current="page"
                >
                    {icon}
                    {label === "Cart" ? `${label}(${cart.cartNumber})` : label}
                </Link>
            </li>
        );
    };

    const renderNavListItem = (navLinks) => {
        let xhtml = [];
        xhtml = navLinks.map((link) => {
            const { label, path, exact, icon } = link;

            return navListItem({
                label: label,
                to: path,
                activeOnlyWhen: exact,
                icon: icon,
            });
        });

        return xhtml;
    };

    const handleLogout = () => {
        dispatch(actions.actUserLogout());
    };
    return (
        <div className="bwm-header">
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
                        <Link to="/home" className="navbar-brand logo" href="#">
                            <div className="image-wrapper">
                                <img
                                    src={"/bookcover/bookworm_icon.svg"}
                                    alt=""
                                    className="d-inline-block align-text-top"
                                />
                            </div>
                        </Link>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            {renderNavListItem(NAV_LINK_LIST)}
                        </ul>

                        {auth.user ? (
                            <div className="loggedIn">
                                Hello, {auth.user.fullName}{" "}
                                <div class="dropdown">
                                    <button
                                        class="btn btn-secondary dropdown-toggle"
                                        type="button"
                                        id="userConfig"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    ></button>
                                    <ul
                                        class="dropdown-menu"
                                        aria-labelledby="userConfig"
                                    >
                                        <li>
                                            <div
                                                class="dropdown-item"
                                                onClick={handleLogout}
                                            >
                                                Log Out
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : null}
                        {!auth.user ? (
                            <div className="logIn" onClick={handleShowLogin}>
                                Log In
                            </div>
                        ) : null}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
