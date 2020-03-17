import React from 'react';

class WebcamCapture extends React.Component {

  async getMedia(constraints) {
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      /* use the stream */
      console.log("src :", stream);
      var video = document.querySelector('video');
      video.srcObject = stream;
      console.log("Stream -------> ", stream);
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