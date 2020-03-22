import React from 'react';
import {
    withRouter,
} from "react-router-dom";
import 'antd/dist/antd.css';
import './assets/css/main.css';
import './assets/css/util.css';
import './assets/css/_button.scss';
import LaddaButton, { SLIDE_UP } from 'react-ladda';
import { toast } from 'react-toastify'
import axios from 'axios';
import io from 'socket.io-client';


class StudentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: io(process.env.REACT_APP_API_URL),
            title: this.props.match.params.title || null,
            token: this.props.match.params.token || null,
            btnText: "Commencez",
            studentName: "",
            teacherCode: "",
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

    handlCreateClass(e) {
        e.preventDefault();

        const { studentName, title, token } = this.state;
        this.setState({
            loading: true,
            btnText: ""
        })

        if (studentName !== "") {
            let data = {
                classTitle: title,
                classRoomToken: token,
                studentName
            };
            axios.post(process.env.REACT_APP_API_URL + "/api/v1/class/student", { data })
                .then(res => {
                    if (res.data.success === true) {
                        let data = res.data.data;
                        data.status = res.data.status;
                        this.state.socket.emit('get-memebers', data)
                        this.state.socket.on('memeber-exist', (members) => {
                            if (members.length === 0) {
                                localStorage.setItem('userInfo', JSON.stringify(res.data));
                                // Redirect to mainClass
                                window.location.href = "/mainclass/" + res.data.data.classTitle + "/" + res.data.data.classRoomToken
                            } else {
                                let names = [];
                                if (data.status == "student") {
                                    members.map(member => {
                                        names.push(member.studentName);
                                    })
                                }

                                if (!names.includes(data.studentName)) {
                                    localStorage.setItem('userInfo', JSON.stringify(res.data));
                                    window.location.href = "/mainclass/" + res.data.data.classTitle + "/" + res.data.data.classRoomToken
                                } else
                                    toast.warning("Ce nom exist !", {
                                        position: toast.POSITION.TOP_RIGHT,
                                    });
                            }
                        })

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
        } else {
            toast.warning("Le nom est obligatoire !", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }



    render() {
        const { btnText, title } = this.state;

        return (
            <div class="container-contact100" style={{ zIndex: '111', backgroundColor: "#007bff" }}>
                <div class="wrap-contact100">
                    <form class="contact100-form validate-form">
                        <span class="contact100-form-title">
                            Joindre ta classe {title || ""}
                        </span>

                        <div class="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Name is required">
                            <input class="input100" type="text" name="studentName" onChange={this.handlChange} placeholder="Entrez votre nom complet" required />
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
            </div>
        );
    }
}

export default withRouter(StudentForm);