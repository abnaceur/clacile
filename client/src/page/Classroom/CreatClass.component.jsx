import React from 'react';
import 'antd/dist/antd.css';
import { Button, Radio } from 'antd';
import { Link } from "react-router-dom";
import './assets/css/main.css';
import './assets/css/util.css';
import './assets/css/_button.scss';
import LaddaButton, { SLIDE_UP } from 'react-ladda';
import axios from 'axios';
import ClassroomUrl from './ClassroomUrl.components';

export default class CreateClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            btnText: "Confirmer",
            classTitle: "",
            teacherCode: "",
            classRoomData: "",
        }

        this.handlChange = this.handlChange.bind(this);
        this.handlCreateClass = this.handlCreateClass.bind(this);
    }

    handlChange(e) {
        let value = e.target.value;
        let name = e.target.name;

        this.setState({
            [name]: value
        });
    }

    handlCreateClass() {
        console.log("this.state :", this.state);
        const { classTitle, teacherCode } = this.state;
        this.setState({
            loading: true,
            btnText: ""
        })

        if (classTitle !== "" && teacherCode !== "") {
            let data = {
                classTitle,
                teacherCode
            }

            axios.post(process.env.REACT_APP_API_URL + "/api/v1/class/new", { data }, {
                headers: {
                    "Content-type": 'application/json'
                },
            })
                .then(res => {
                    console.log("Response :", res)
                    this.setState({
                        loading: false,
                        btnText: "Confirmer",
                        classRoomData: res.data.url
                    })
                })
                .catch(err => {
                    console.log("Error :", err)
                    this.setState({
                        loading: false,
                        btnText: "Confirmer"
                    })
                });
        }
    }



    render() {
        const { btnText, classTitle, classRoomData } = this.state;

        return (
            <div class="container-contact100" style={{ zIndex: '111', backgroundImage: "url('https://images.pexels.com/photos/1181233/pexels-photo-1181233.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')" }}>
                {classRoomData !== "" ?
                    <ClassroomUrl
                        classroomUrl={classRoomData}
                        classtitle={classTitle}
                    />
                    :
                    <div class="wrap-contact100">
                        <form class="contact100-form validate-form">
                            <span class="contact100-form-title">
                            Créer une classe
				</span>

                            <div class="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Name is required">
                                <input class="input100" type="text" name="classTitle" onChange={this.handlChange} placeholder="Entrez le nom de votre classe" required />
                            </div>

                            <div class="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input class="input100" type="text" name="teacherCode" onChange={this.handlChange} placeholder="Entrez le code d'accès du professeur" required />
                            </div>
                        </form>

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
                    </div>
                }
            </div>
        );
    }
}