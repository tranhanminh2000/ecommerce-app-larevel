import React from "react";
import Layout from "../../component/Layout/Layout.jsx";
import { Outlet } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="NotFound">
      <Layout>
        <div className="container">NOT FOUND: 404</div>
      </Layout>
    </div>
  );
};

export default NotFound;
