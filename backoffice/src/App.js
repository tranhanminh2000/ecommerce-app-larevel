import "bootstrap"; // import bs script library (include: jquery, popper js)
import "bootstrap/dist/css/bootstrap.min.css"; // import bs style library
import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import configStore from "./store/config.js";
import "./app.scss";
import Dashboard from "./containers/Dashboard/Dashboard";
import Order from "./containers/Order/Order";
import Product from "./containers/Product/Product";
import Customer from "./containers/Customer/Customer";
import Account from "./containers/Account/Account";
import Admin from "./containers/Admin/Admin";
import Login from "./containers/Login/Login.jsx";

const store = configStore();

const ProtectedRoute = ({ user, redirectPath = "/landing" }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Navigate to={"/dashboard"} />}></Route>
              <Route
                element={<ProtectedRoute user={true} redirectPath="/login" />}
              >
                <Route path="dashboard" element={<Dashboard />}></Route>
                <Route path="order" element={<Order />}></Route>
                <Route path="product" element={<Product />}></Route>
                <Route path="customer" element={<Customer />}></Route>
                <Route path="account" element={<Account />}></Route>
                <Route path="admin" element={<Admin />}></Route>
              </Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="*" element={<h1>404: Page Not Found</h1>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
