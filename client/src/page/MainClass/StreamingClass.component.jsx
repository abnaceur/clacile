import React from 'react';
import './assets/css/mainClass.css';
import './assets/css/startbtn.scss';
import LaddaButton, { SLIDE_UP } from 'react-ladda';
import WebcamCapture from './WebcamStream.component';

export default class StreamingClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startStream: false
        }

        this.handlstreaming = this.handlstreaming.bind(this);
    }

    handlstreaming(e) {
        e.preventDefault();
        this.setState({ startStream: true })
    }

    render() {
        const { startStream } = this.state;
        const { socket, currentUserInfo } = this.props;

        return (
            <div class="wrap-streaming">
                {startStream ? <WebcamCapture socket={socket} currentUserInfo={currentUserInfo} /> 
                : 
                <LaddaButton
                    className="a-button-start a-button-start-big a-button-start-purple"
                    // loading={this.state.loading}
                    onClick={(e) => this.handlstreaming(e)}
                    data-color="#eee"
                    // data-size={L}
                    data-style={SLIDE_UP}
                    data-spinner-size={30}
                    data-spinner-color="#fff"
                    data-spinner-lines={12}
                >
                    commencez le streaming
                    </LaddaButton>}
            </div>
        )
    }


}