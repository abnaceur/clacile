import React from 'react';
import Preloader from '../../components/Prelodaer.component';
import Navbar from '../../components/Navbar.component';
import HomeSection from '../../components/HomeSection.component';
import Feature from '../../components/Features.component';
import Pricing from '../../components/Pricing.component';
import Contact from '../../components/Contact.component';
import Footer from '../../components/Footer.compoenent';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Preloader />
                <Navbar />
                <HomeSection />
                <Feature />
                < Pricing />
                < Contact />
                <Footer />
            </>
        );
    }
}