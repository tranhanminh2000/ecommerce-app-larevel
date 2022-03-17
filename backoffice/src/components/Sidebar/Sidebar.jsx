import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

function Sidebar() {
  let location = useLocation();
  return (
    <nav
      id="sidebarMenu"
      class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <Link
              to="/dashboard"
              class={classNames("nav-link", {
                active: location.pathname === "/dashboard",
              })}
              aria-current="page"
            >
              <span data-feather="home"></span>
              Dashboard
            </Link>
          </li>
          <li class="nav-item">
            <Link
              to="/order"
              class={classNames("nav-link", {
                active: location.pathname === "/order",
              })}
            >
              <span data-feather="file"></span>
              Orders
            </Link>
          </li>
          <li class="nav-item">
            <Link
              to="/product"
              class={classNames("nav-link", {
                active: location.pathname === "/product",
              })}
            >
              <span data-feather="shopping-cart"></span>
              Products
            </Link>
          </li>
          <li class="nav-item">
            <Link
              to="/customer"
              class={classNames("nav-link", {
                active: location.pathname === "/customer",
              })}
            >
              <span data-feather="users"></span>
              Customers
            </Link>
          </li>
          <li class="nav-item">
            <Link
              to="/admin"
              class={classNames("nav-link", {
                active: location.pathname === "/admin",
              })}
            >
              <span data-feather="bar-chart-2"></span>
              Admin
            </Link>
          </li>
          <li class="nav-item">
            <Link
              to="/account"
              class={classNames("nav-link", {
                active: location.pathname === "/account",
              })}
            >
              <span data-feather="bar-chart-2"></span>
              Account
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
