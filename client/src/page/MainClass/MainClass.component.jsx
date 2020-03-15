import React from 'react';
import {
    withRouter,
} from "react-router-dom";

class MainClassroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.match.params.title || null,
            token: this.props.match.params.token || null,
            teacherName: "",
        }
    }

    componentWillMount() {
        // @TODO Check from server
        const { title, token } = this.state;

        if (title === null && token === null) {
            window.location.href = "/"
        } else {
            let data = JSON.parse(localStorage.getItem('userInfo'));
            if (data.classRoomToken != token || data.classTitle != title)
                window.location.href = "/";
            else {
                this.setState({
                    teacherName: data.teacherName 
                })
            }
        }
    }


    render() {
        return (
            <h1>Main class</h1>
        )
    }
}

export default withRouter(MainClassroom);