import React from 'react';
import io from 'socket.io-client';

class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(process.env.REACT_APP_API_URL),
    }
  }

  async getMedia(constraints) {
    const { currentUserInfo } = this.props;
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      /* use the stream */
      var video = document.querySelector('video');
      video.srcObject = stream;
      console.log("currentUserInfo :", currentUserInfo);
      let data = {
        data: currentUserInfo,
        stream
      };
      this.state.socket.emit('stream-video', data)
      video.onloadedmetadata = function (e) {
        video.play();
      }
    } catch (err) {
      /* handle the error */
      console.log("ssss :", err);
    }
  }
  componentDidMount() {
    let constraints = { audio: true, video: true }
    this.getMedia(constraints)
  }

  render() {

    return (
      <div>
        <video autoPlay controls="controls" />
      </div>
    )

  }
};

export default WebcamCapture;