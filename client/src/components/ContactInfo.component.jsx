import React from 'react';
import axios from 'axios';

class ContactInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            response: "",
            email: "",
        }

        this.handlchange = this.handlchange.bind(this);
        this.handlSubmit = this.handlSubmit.bind(this);
    }

    handlchange(e) {
        e.preventDefault();
        let elem = document.getElementById("notif");
        let email = e.target.value;
        this.setState({ email, response: "" });
        elem.classList.remove("error");
        elem.classList.remove("success");
    }

    handlSubmit(e) {
        e.preventDefault();
        const { email } = this.state;

        let validateEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);

        if (!validateEmail.test(email)) {
            let elem = document.getElementById("notif");
            if (elem) {
                elem.classList.remove("success");
                elem.classList.add("error");
            }
            this.setState({ response: "Votre email n'est pas valid" })
        }  else {
            let elem = document.getElementById("notif");
            
            axios.post(process.env.REACT_APP_API_URL + "/api/v1/class/visitor", { email })
                .then(res => {
                    if (elem) {
                        elem.classList.remove("error");
                        elem.classList.add("success");
                    }
                    this.setState({ response: "Merci pour votre inscription" })
                })
        }
    }

    render() {
        const { response, email } = this.state;

        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="contact-wrapper form-style-two pt-115 text-center">
                        <h4 className="contact-title pb-10"> Soyez parmi les premiers d'être informé<span></span></h4>

                        <div id="contact-form">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <div className="form-input mt-25">
                                        <label>Rejoignez notre newsletter</label>
                                        <div className="input-items default">
                                            <input type="email" name="email" onChange={this.handlchange} placeholder="Email" />
                                            <i className="lni lni-envelope"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 offset-md-3">
                                    <p id="notif" className="form-message text-center">
                                        {response}
                                    </p>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-input light-rounded-buttons mt-30">
                                        <input onClick={this.handlSubmit} className="main-btn light-rounded-two" value="S'inscrire" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactInfo;