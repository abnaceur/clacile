import React from 'react';
import 'antd/dist/antd.css';
import { Button, Radio } from 'antd';
import { Link } from "react-router-dom";
import './assets/css/main.css';
import './assets/css/util.css';
import './assets/css/_button.scss';
import LaddaButton, { SLIDE_UP } from 'react-ladda';
import axios from 'axios';

export default class ClassroomUrl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            btnText: "Visiter ma class"
        }

    }

    render() {
        const { btnText } = this.state;

        return (
            <div class="wrap-contact100">
                <form class="contact100-form validate-form">
                    <span class="contact100-form-title">
                        Classe {this.props.classtitle} est cree
				</span>

                    <div class="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Name is required">
                        <label>Partagez ce lien avec vos etudiants</label>
                        <input class="input100" type="text" name="classTitle" value={this.props.classroomUrl} required />
                    </div>
                </form>

                <a href={this.props.classroomUrl}>

                    <LaddaButton
                        className="a-button a-button-big a-button-purple"
                        loading={this.state.loading}
                        onClick={this.handlCreateClass}
                        data-color="#eee"
                        // data-size={L}
                        data-style={SLIDE_UP}
                        data-spinner-size={30}
                        data-spinner-color="#fff"
                        data-spinner-lines={12}
                    >
                        {btnText}
                    </LaddaButton>
                </a>
            </div>
        );
    }
}