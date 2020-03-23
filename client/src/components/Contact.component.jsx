import React from 'react';

class Contact extends React.Component {


    render() {
        return (
            <section id="contact" class="contact-area">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-6 col-md-10">
                            <div class="section-title text-center pb-30">
                                <h3 class="title">Contact</h3>
                            </div>
                        </div>
                    </div>
                    <div class="contact-info pt-30">
                        <div class="row">

                            <div class="col-lg-4 col-md-6">
                                <div class="single-contact-info contact-color-2 mt-30 d-flex ">
                                    <div class="contact-info-icon">
                                        <i class="lni lni-envelope"></i>
                                    </div>
                                    <div class="contact-info-content media-body">
                                        <p class="text">contact@clacile.com</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="single-contact-info contact-color-3 mt-30 d-flex ">
                                    <div class="contact-info-icon">
                                        <i class="lni lni-phone"></i>
                                    </div>
                                    <div class="contact-info-content media-body">
                                        <p class="text">+33 766 882 423</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        )
    }
}

export default Contact;