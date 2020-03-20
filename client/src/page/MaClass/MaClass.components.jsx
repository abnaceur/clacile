import React from 'react';
import {
    withRouter,
} from "react-router-dom";
import { render } from 'react-dom';
import './assets/css/main.css';
import './assets/css/util.css';
import './assets/css/_button.scss';
import LaddaButton, { SLIDE_UP } from 'react-ladda';
import TeacherForm from './Teacher.component';
import StudentForm from './Student.component';

class MaClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentForm: false,
            teacherForm: false,
            loading: false,
            title: this.props.match.params.title || null,
            token: this.props.match.params.token || null,
        }

        this.handlChangeForm = this.handlChangeForm.bind(this);
    }

    handlChangeForm(e, str) {
        e.preventDefault();

        if (str === "student")
            this.setState({ studentForm: true })
        if (str === "teacher")
            this.setState({teacherForm : true})
    }

    componentWillMount() {
        const { title, token } = this.state;
        if (title === null || token === null)
            window.location.href = window.location.href;
        else {
            console.log(" ===> :", title, token);
        }
    }

    render() {
        const { title, teacherForm, studentForm } = this.state;

        return (
            <div class="container-contact100" style={{ zIndex: '111', backgroundImage: "url('https://images.pexels.com/photos/1181233/pexels-photo-1181233.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')" }}>
                {teacherForm || studentForm ?
                    teacherForm ? <TeacherForm/> :

                        studentForm ? <StudentForm /> :
                            ""
                    :
                    <div class="wrap-contact100">
                        <form class="contact100-form validate-form">
                            <span class="contact100-form-title">
                                Rejoindre ma classe {title || ""}
                            </span>
                        </form>

                        <LaddaButton
                            className="a-button a-button-big a-button-purple"
                            loading={this.state.loading}
                            onClick={(e) => this.handlChangeForm(e, "student")}
                            data-color="#eee"
                            // data-size={L}
                            data-style={SLIDE_UP}
                            data-spinner-size={30}
                            data-spinner-color="#fff"
                            data-spinner-lines={12}
                        >
                            Je suis etudiant
                    </LaddaButton>
                        <br></br>
                        <LaddaButton
                            className="a-button a-button-big a-button-purple"
                            loading={this.state.loading}
                            onClick={(e) => this.handlChangeForm(e, "teacher")}
                            data-color="#eee"
                            // data-size={L}
                            data-style={SLIDE_UP}
                            data-spinner-size={30}
                            data-spinner-color="#fff"
                            data-spinner-lines={12}
                        >
                            Je suis professeur
                    </LaddaButton>
                    </div>}
            </div>
        )
    }
}

export default withRouter(MaClass);