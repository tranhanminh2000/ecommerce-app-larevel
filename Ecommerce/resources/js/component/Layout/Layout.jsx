import React from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import "./layout.scss";

const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <div className="bwm-content">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
