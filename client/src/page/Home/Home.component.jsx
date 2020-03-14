import React from 'react';
import 'antd/dist/antd.css';
import { Button, Radio } from 'antd';
import { Link } from "react-router-dom";
import './assets/css/style.css';
import '../Classroom/assets/css//main.css';
import '../Classroom/assets/css/util.css';
import '../Classroom/assets/css/_button.scss';
import LaddaButton, { SLIDE_UP } from 'react-ladda';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: "large",
        };
    }

    handleSizeChange = e => {
        this.setState({ size: e.target.value });
    };

    render() {
        const { size } = this.state;
        return (
            <div class="container-contact100" style={{ backgroundImage: "url('https://images.pexels.com/photos/1181233/pexels-photo-1181233.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')" }}>
                <div class="wrap-contact100">
                    <form class="contact100-form validate-form">
                        <span class="contact100-form-title">
                            Bienvenu
				</span>
                    </form>

                    <Link to="/createClass">
                    <LaddaButton
                            className="a-button a-button-big a-button-purple"
                            data-color="#eee"
                            data-style={SLIDE_UP}
                            data-spinner-size={30}
                            data-spinner-color="#fff"
                            data-spinner-lines={12}
                        >
                            EN classe
                            </LaddaButton>
                            </Link>
                </div>
            </div>
        );
    }
}