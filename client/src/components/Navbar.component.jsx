import React from 'react';
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return (
            <section className="navbar-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <nav className="navbar navbar-expand-lg">

                                <a className="navbar-brand" href="#">
                                    <img src="assets/images/logo.svg" alt="Logo" />

                                </a>

                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTwo"
                                    aria-controls="navbarTwo" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse sub-menu-bar" id="navbarTwo">
                                    <ul className="navbar-nav m-auto">
                                        <li className="nav-item active"><a className="page-scroll" href="#home">Accueil</a></li>
                                        <li className="nav-item"><a className="page-scroll" href="#services">Notre vision</a></li>
                                        <li className="nav-item"><a className="page-scroll" href="#pricing">Nos Plans</a></li>
                                        <li className="nav-item"><a className="page-scroll" href="#contact">Contact</a></li>
                                    </ul>
                                </div>

                                <div className="navbar-btn d-none d-sm-inline-block">
                                    <ul>
                                        <li><Link to="/createClass" className="solid">COMMENCEZ</Link></li>

                                    </ul>
                                </div>
                            </nav> </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Navbar;
