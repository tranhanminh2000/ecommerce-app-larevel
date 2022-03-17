import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div class="container-fluid">
        <div class="row">
          <Sidebar />

          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">{children}</main>
        </div>
      </div>
    </>
  );
}

export default Layout;
