import React from 'react';
import { Link } from "react-router-dom";

class HomeSection extends React.Component {


    render() {
        return (

            <section id="home" className="slider_area">
                <div id="carouselThree" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselThree" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselThree" data-slide-to="1"></li>
                        <li data-target="#carouselThree" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="slider-content">
                                            <h1 className="title">Education sans frontière</h1>
                                            <ul className="slider-btn rounded-buttons">
                                                <li><a className="main-btn rounded-one page-scroll" href="#contact">CONTACT</a></li>
                                                <li><Link to="/createClass" className="main-btn rounded-two">DEMO</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="slider-image-box d-none d-lg-flex align-items-end">
                                <div className="slider-image">
                                    <img src="assets/images/slider/1.png" alt="Hero" />
                                </div>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="slider-content">
                                            <h1 className="title">Apprendre n'importe quand</h1>
                                            <ul className="slider-btn rounded-buttons">
                                                <li><a className="main-btn rounded-one page-scroll" href="#contact">CONTACT</a></li>
                                                <li><Link to="/createClass" className="main-btn rounded-two">DEMO</Link></li>
                                              </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="slider-image-box d-none d-lg-flex align-items-end">
                                <div className="slider-image">
                                    <img src="assets/images/slider/2.png" alt="Hero" />
                                </div>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="slider-content">
                                            <h1 className="title">Apprendre n'importe où</h1>
                                            <ul className="slider-btn rounded-buttons">
                                                <li><a className="main-btn rounded-one page-scroll" href="#contact">CONTACT</a></li>
                                                <li><Link to="/createClass" className="main-btn rounded-two">DEMO</Link></li>
                                             </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="slider-image-box d-none d-lg-flex align-items-end">
                                <div className="slider-image">
                                    <img src="assets/images/slider/3.png" alt="Hero" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <a className="carousel-control-prev" href="#carouselThree" role="button" data-slide="prev">
                        <i className="lni lni-arrow-left"></i>
                    </a>
                    <a className="carousel-control-next" href="#carouselThree" role="button" data-slide="next">
                        <i className="lni lni-arrow-right"></i>
                    </a>
                </div>
            </section>

        )
    }
}

export default HomeSection;