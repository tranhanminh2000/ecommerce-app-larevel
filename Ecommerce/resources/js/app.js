import React from "react";
import reactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/utilityStyle.scss";
import About from "./containers/About/About";
import Shop from "./containers/Shop/Shop";
import Cart from "./containers/Cart/Cart";
import configStore from "./store/config";
import { Provider } from "react-redux";
import Detail from "./containers/Detail/Detail";

const store = configStore();

function App() {
    return (
        <>
            <Provider store={store}>
                <div className="app">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/">
                                <Route
                                    index
                                    element={<Navigate to="/home" />}
                                ></Route>
                                <Route path="home" element={<Home />}></Route>
                                <Route path="about" element={<About />}></Route>
                                <Route
                                    path="detail/:id"
                                    element={<Detail />}
                                ></Route>
                                {/* <Route path="shop" element={<Shop />}></Route> */}
                                <Route path="cart" element={<Cart />}></Route>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </Provider>
        </>
    );
}

reactDOM.render(<App />, document.getElementById("root"));
