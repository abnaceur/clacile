import React from 'react';
import './assets/css/mainClass.css';
import './assets/css/_button.scss';
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

        return (
            <div class="wrap-streaming">
                {startStream ? <WebcamCapture currentUserInfo={this.props.currentUserInfo} /> 
                : 
                <LaddaButton
                    className="a-button-str a-button-str-big a-button-str-purple"
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

                
                {/* <br></br> */}
                {/* <LaddaButton
                    className="a-button-str a-button-str-big a-button-str-purple"
                    // loading={this.state.loading}
                    // onClick={(e) => this.handlChangeForm(e, "teacher")}
                    data-color="#eee"
                    // data-size={L}
                    data-style={SLIDE_UP}
                    data-spinner-size={30}
                    data-spinner-color="#fff"
                    data-spinner-lines={12}
                >
                    Je suis proffesseur
                    </LaddaButton> */}
            </div>
        )
    }


}