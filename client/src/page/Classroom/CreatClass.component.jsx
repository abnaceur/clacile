import React from 'react';
import 'antd/dist/antd.css';
import { Button, Radio } from 'antd';
import { Link } from "react-router-dom";
import './assets/css/main.css';
import './assets/css/util.css';
import './assets/css/_button.scss';
import LaddaButton, { SLIDE_UP } from 'react-ladda';

export default class CreateClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    render() {
        return (
            <div class="container-contact100" style={{ zIndex: '111', backgroundImage: "url('https://images.pexels.com/photos/1181233/pexels-photo-1181233.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')" }}>
                <div class="wrap-contact100">
                    <form class="contact100-form validate-form">
                        <span class="contact100-form-title">
                            Cree une classe
				</span>

                        <div class="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Name is required">
                            <input class="input100" type="text" name="name" placeholder="Entrez le nom de la classe" />
                        </div>

                        <div class="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                            <input class="input100" type="text" name="email" placeholder="Entrez le code d'acces du proffesseur" />
                        </div>
                    </form>

                    <LaddaButton
                            className="a-button a-button-big a-button-purple"
                            loading={this.state.loading}
                            onClick={this.toggle}
                            data-color="#eee"
                            // data-size={L}
                            data-style={SLIDE_UP}
                            data-spinner-size={30}
                            data-spinner-color="#fff"
                            data-spinner-lines={12}
                        >
                            Confirmer
                            </LaddaButton>
                </div>
            </div>
        );
    }
}