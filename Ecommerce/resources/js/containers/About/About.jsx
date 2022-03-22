import React from "react";
import Layout from "./../../component/Layout/Layout.jsx";
import "./about.scss";

const About = () => {
    return (
        <Layout>
            <div className="about">
                <div className="container pt-5 pb-5">
                    <h4 className="title">About Us</h4>
                    <hr className="cross-line" />
                    <div className="content">
                        <div className="section-1">
                            <h1 className="section-1-title">
                                Welcom to{" "}
                                <span className="font-primary-color">ETECH</span>
                            </h1>
                            <p className="section-1-content">
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Nesciunt quam, aliquid quasi
                                architecto eaque exercitationem mollitia
                                voluptatem delectus blanditiis in aspernatur,
                                ipsum similique illo recusandae modi iure sit
                                placeat ullam!
                            </p>
                        </div>

                        <div className="section-2">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2 className="section-2-title">
                                        Our Story
                                    </h2>
                                    <p className="section-2-content">
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Quasi necessitatibus
                                        maxime enim porro vero pariatur
                                        blanditiis molestiae impedit nemo
                                        eligendi, optio, magni modi commodi? Eum
                                        quod asperiores cum obcaecati accusamus?
                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <h2 className="section-2-title">
                                        Our Story
                                    </h2>
                                    <p className="section-2-content">
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Quasi necessitatibus
                                        maxime enim porro vero pariatur
                                        blanditiis molestiae impedit nemo
                                        eligendi, optio, magni modi commodi? Eum
                                        quod asperiores cum obcaecati accusamus?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default About;
