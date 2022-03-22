import React from "react";
import "./footer.scss";

const Footer = () => {
    return (
        <div class="footer bg-secondary-color">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <a href="#" className="logo">
                            <div className="text-wrapper">
                                <h2 className="logo-text text-light">ETECH</h2>
                                <p className="logo-text text-light">Electronics Tech</p>
                            </div>
                        </a>

                        <div className="payment">
                            <img src="/logo.png" alt="" />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <h5 className="list-title text-light">About Us</h5>
                        <ul className="list list-style-none mg-0 pd-0 text-light">
                            <li>Phone: (48) 025023203</li>
                            <li>Address: Ak47 Wasinton DC</li>
                            <li>Fax: 089-0980-0989</li>
                            <li>Email: bookwormstore@gmail.com</li>
                        </ul>
                    </div>

                    <div className="col-md-2">
                        <h5 className="list-title text-light">Contact</h5>
                        <ul className="list list-style-none mg-0 pd-0 text-light">
                            <li>Facebook</li>
                            <li>Email</li>
                            <li>Instagram</li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h5 className="list-title text-light">Links</h5>
                        <ul className="list list-style-none mg-0 pd-0 text-light">
                            <li>Home</li>
                            <li>Shop</li>
                            <li>About</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
