import React from 'react';
import {
    withRouter,
} from "react-router-dom";
import 'antd/dist/antd.css';
import './assets/css/main.css';
import './assets/css/util.css';
import './assets/css/_button.scss';
import LaddaButton, { SLIDE_UP } from 'react-ladda';
import axios from 'axios';
import { toast } from 'react-toastify'

class TeacherForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.match.params.title || null,
            token: this.props.match.params.token || null,
            btnText: "Commencez",
            teacherName: "",
            teacherCode: "",
        }

        this.handlChange = this.handlChange.bind(this);
        this.handlVerifyTeacher = this.handlVerifyTeacher.bind(this);
    }

    handlChange(e) {
        let value = e.target.value;
        let name = e.target.name;

        this.setState({
            [name]: value
        });
    }

    handlVerifyTeacher() {
        const { teacherName, token, title, teacherCode } = this.state;
        this.setState({
            loading: true,
            btnText: ""
        })

        if (teacherName !== "" && teacherCode !== "") {
            let data = {
                teacherName,
                teacherCode,
                classTitle: title,
                classRoomToken: token,
            }

            axios.post(process.env.REACT_APP_API_URL + "/api/v1/class/teacher", { data })
                .then(res => {
                    console.log("Response :", res)
                    if (res.data.success === true) {
                        localStorage.setItem('userInfo', JSON.stringify(res.data));
                        // Redirect to mainClass
                        window.location.href = "/mainclass/" + res.data.data.classTitle + "/" + res.data.data.classRoomToken
                    } else {
                        toast.error("Votre code d'accés est incorrect !", {
                            position: toast.POSITION.TOP_RIGHT,
                        }); 
                    }
                    this.setState({
                        loading: false,
                        btnText: "Confirmer",
                    })
                })
                .catch(err => {
                    console.log("Error :", err)
                    toast.error("Désolé, une erreur est survenu, veuillez contactez le service client !", {
                        position: toast.POSITION.TOP_RIGHT,
                    }); 
                    this.setState({
                        loading: false,
                        btnText: "Confirmer"
                    })
                });
        }
    }



    render() {
        const { btnText, teacherName, title } = this.state;

        return (
            <div class="container-contact100" style={{ zIndex: '111', backgroundImage: "url('https://images.pexels.com/photos/1181233/pexels-photo-1181233.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')" }}>
                <div class="wrap-contact100">
                    <form class="contact100-form validate-form">
                        <span class="contact100-form-title">
                            Joindre ta classe {title || ""}
				</span>

                        <div class="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Name is required">
                            <input class="input100" type="text" name="teacherName" onChange={this.handlChange} placeholder="Entrez votre nom complet" required />
                        </div>

                        <div class="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                            <input class="input100" type="text" name="teacherCode" onChange={this.handlChange} placeholder="Entrez le code d'acces du proffesseur" required />
                        </div>
                    </form>

                    <LaddaButton
                        className="a-button a-button-big a-button-purple"
                        loading={this.state.loading}
                        onClick={this.handlVerifyTeacher}
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
            </div>
        );
    }
}

export default withRouter(TeacherForm);