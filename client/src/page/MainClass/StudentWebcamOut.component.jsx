import React from 'react';
import io from 'socket.io-client';

class WebcamStreamStudent extends React.Component {
  constructor(props) {
    super(props);
  }

  async getMedia(constraints) {
    let { stream } = this.props;

    try {
      var video = document.querySelector('video');
      video.srcObject = stream;
      video.onloadedmetadata = function (e) {
        video.play();
      }
    } catch (err) {
      /* handle the error */
      console.log("Error :", err);
    }
  }
  componentDidMount() {
    this.getMedia()
  }

  render() {

    return (
      <div>
        <video autoPlay controls="controls" />
      </div>
    )

  }
};

export default WebcamStreamStudent;