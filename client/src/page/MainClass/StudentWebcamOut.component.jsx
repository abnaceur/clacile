import React from 'react';
let Peer = require('simple-peer');

class WebcamStreamStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peer: ""
    }

    this.connectPeer = this.connectPeer.bind(this);
    this.requireConnect = this.requireConnect.bind(this);
  }

  async getMedia(stream) {
    try {
      var video = document.querySelector('video');
      video.volume = 0;
      video.srcObject = stream;
      video.onloadedmetadata = function (e) {
        video.play();
      }
    } catch (err) {
      /* handle the error */
      console.log("Error :", err);
    }
  }

  connectPeer() {
    const { socket, currentUserInfo } = this.props;

    // Connect to teacher streaming while teacher connected befor.
    socket.on('stream-started', (dataOn) => {
      let peer = new Peer({ initiator: true });

      peer.on('signal', data => {
        let info = {
          data,
          user: currentUserInfo
        }

        socket.emit('student-start-peer', info);
      })

      socket.on('teacher-peer-response', (data) => {
        console.log("=== Student Peer accpted teacher response ===");
        peer.signal(data);
      })

      peer.on('stream', stream => {
        console.log("stream:", stream);
        // got remote video stream, now let's show it in a video tag
        this.getMedia(stream);
      })

    })
  }


  requireConnect() {
    const { socket, currentUserInfo } = this.props;
    let peer = new Peer({ initiator: true });

    peer.on('signal', data => {
      let info = {
        data,
        user: currentUserInfo
      }

      socket.emit('student-start-peer', info);
    })

    socket.on('teacher-peer-response', (data) => {
      console.log("=== Student Peer accpted teacher response ===");
      peer.signal(data);
    })

    peer.on('stream', stream => {
      console.log("stream:", stream);
      // got remote video stream, now let's show it in a video tag
      this.getMedia(stream);
    })
  }

  componentDidMount() {
    this.connectPeer();
    this.requireConnect();
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