import React from 'react';
import './assets/css/mainClass.css';
import './assets/css/_button.scss';
import LaddaButton, { SLIDE_UP } from 'react-ladda';

export default class StreamingClass extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div class="wrap-streaming">
                <LaddaButton
                    className="a-button-str a-button-str-big a-button-str-purple"
                    // loading={this.state.loading}
                    // onClick={(e) => this.handlChangeForm(e, "student")}
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
                    </LaddaButton>
            </div>
        )
    }


}