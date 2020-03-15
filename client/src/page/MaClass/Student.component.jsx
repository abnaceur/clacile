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

class StudentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    handlCreateClass() {
        const { studentName, title, token } = this.state;
        this.setState({
            loading: true,
            btnText: ""
        })

        if (studentName !== "" ) {
           let data = {
               data: {
                classTitle: title,
                classRoomToken: token,
                studentName,
               },
               success: true,
               status: "student",
           }
           localStorage.setItem('userInfo', JSON.stringify(data));
           window.location.href = "/mainclass/" + data.data.classTitle + "/" + data.data.classRoomToken
        } else {
            toast.warning("Le nom est obligatoire !", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }



    render() {
        const { btnText, title } = this.state;

        return (
            <div class="container-contact100" style={{ zIndex: '111', backgroundImage: "url('https://images.pexels.com/photos/1181233/pexels-photo-1181233.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')" }}>
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