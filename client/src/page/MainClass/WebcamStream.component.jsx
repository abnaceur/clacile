import React from 'react';
let Peer = require('simple-peer');

class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
    }
  }

  componentDidMount() {
    const { currentUserInfo, socket } = this.props;
    let constraints = { audio: true, video: true };

    socket.emit('start-stream', currentUserInfo);

    socket.on('student-offer', async (peerData) => {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        let peer = new Peer({ initiator: false, trickle: true, stream: stream });

        console.log("=== Teacher Peer acceoted student offer ===");
        peer.signal(peerData.data);

        peer.on('signal', (data) => {
          let info = {
            data,
            student: peerData.user.clientId
          }
          socket.emit('teacher-response', info);
        })

        /* use the stream */
        var video = document.querySelector('video');
        video.volume = 0;
        video.srcObject = stream;

        this.setState({ stream })
        video.onloadedmetadata = function (e) {
          video.play();
        }

      } catch (err) {
        /* handle the error */
        console.log("ssss :", err);
      }
    })
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