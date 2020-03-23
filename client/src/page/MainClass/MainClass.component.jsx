import React from 'react';
import {
	withRouter,
} from "react-router-dom";
import './assets/css/mainClass.css';
import io from 'socket.io-client';
import StreamingClass from './StreamingClass.component';
import WebcamStreamStudent from './StudentWebcamOut.component';

function detectURL(message) {
	var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
	return message.replace(urlRegex, function (urlMatch) {
		return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
	})
}

/* ========== */
/* Title component */
class Title extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className={"chatApp__convTitle"}>{this.props.nbrStudent === 1 ? this.props.nbrStudent + " personne en ligne" 
			: this.props.nbrStudent + " personnes en ligne"} </div>
		);
	}
}
/* end Title component */
/* ========== */

/* ========== */
/* InputMessage component - used to type the message */
class InputMessage extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleSendMessage = this.handleSendMessage.bind(this);
		this.handleTyping = this.handleTyping.bind(this);
	}

	handleSendMessage(event) {
		event.preventDefault();
		/* Disable sendMessage if the message is empty */
		if (this.messageInput.value.length > 0) {
			this.props.sendMessageLoading(this.ownerInput.value, this.ownerAvatarInput.value, this.messageInput.value);
			/* Reset input after send*/
			this.messageInput.value = '';
		}
	}

	handleTyping(event) {
		/* Tell users when another user has at least started to write */
		if (this.messageInput.value.length > 0) {
			this.props.typing(this.ownerInput.value);
		}
		else {
			/* When there is no more character, the user no longer writes */
			this.props.resetTyping(this.ownerInput.value);
		}
	}
	render() {
		/* If the chatbox state is loading, loading class for display */
		var loadingClass = this.props.isLoading ? 'chatApp__convButton--loading' : '';
		let sendButtonIcon = <i className={"material-icons"}>send</i>;
		return (
			<form onSubmit={this.handleSendMessage}>
				<input
					type="hidden"
					ref={owner => (this.ownerInput = owner)}
					value={this.props.owner}
				/>
				<input
					type="hidden"
					ref={ownerAvatar => (this.ownerAvatarInput = ownerAvatar)}
					value={this.props.ownerAvatar}
				/>
				<input
					type="text"
					ref={message => (this.messageInput = message)}
					className={"chatApp__convInput"}
					placeholder="Ecrire un texte..."
					onKeyDown={this.handleTyping}
					onKeyUp={this.handleTyping}
					tabIndex="0"
				/>
				<div className={'chatApp__convButton ' + loadingClass} onClick={this.handleSendMessage}>
					{sendButtonIcon}
				</div>
			</form>
		);
	}
}
/* end InputMessage component */
/* ========== */

/* ========== */
/* TypingIndicator component */
class TypingIndicator extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		let typersDisplay = '';
		let countTypers = 0;
		/* for each user writing messages in chatroom */
		for (var key in this.props.isTyping) {
			/* retrieve the name if it isn't the owner of the chatbox */
			if (key != this.props.owner && this.props.isTyping[key]) {
				typersDisplay += ', ' + key;
				countTypers++;
			}
		}
		/* formatting text */
		typersDisplay = typersDisplay.substr(1);
		typersDisplay += ((countTypers > 1) ? ' are ' : ' is ');
		/* if at least one other person writes */
		if (countTypers > 0) {
			return (
				<div className={"chatApp__convTyping"}>{typersDisplay} writing
				<span className={"chatApp__convTypingDot"}></span>
				</div>
			);
		}
		return (
			<div className={"chatApp__convTyping"}></div>
		);
	}
}
/* end TypingIndicator component */
/* ========== */

/* ========== */
/* MessageList component - contains all messages */
class MessageList extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className={"chatApp__convTimeline"}>
				{this.props.messages.slice(0).reverse().map(
					messageItem => (
						<MessageItem
							key={messageItem.id}
							owner={this.props.owner}
							ownerId={this.props.ownerId}
							sender={messageItem.sender}
							senderId={messageItem.senderId}
							senderAvatar={messageItem.senderAvatar}
							message={messageItem.message}
						/>
					)
				)}
			</div>
		);
	}
}
/* end MessageList component */
/* ========== */

/* ========== */
/* MessageItem component - composed of a message and the sender's avatar */
class MessageItem extends React.Component {
	render() {
		/* message position formatting - right if I'm the author */
		let messagePosition = ((this.props.owner == this.props.sender) ? 'chatApp__convMessageItem--left' : 'chatApp__convMessageItem--right');
		return (
			<div className={"chatApp__convMessageItem " + messagePosition + " clearfix"}>
				<small style={{ marginLeft: '10px' }}>{this.props.sender}</small>
				<hr style={{ marginBottom: '10px' }}></hr>
				<img src={this.props.senderAvatar} alt={this.props.sender} className="chatApp__convMessageAvatar" />
				<div className="chatApp__convMessageValue" dangerouslySetInnerHTML={{ __html: this.props.message }}></div>
			</div>
		);
	}
}
/* end MessageItem component */
/* ========== */

/* ========== */
/* ChatBox component - composed of Title, MessageList, TypingIndicator, InputMessage */
class ChatBox extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isLoading: false
		};
		this.sendMessageLoading = this.sendMessageLoading.bind(this);
		var timeout = null;
	}
	/* catch the sendMessage signal and update the loading state then continues the sending instruction */
	sendMessageLoading(sender, senderAvatar, message) {
		this.setState({ isLoading: true });
		this.props.sendMessage(sender, senderAvatar, message);
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 400);
	}
	render() {
		return (
			<div className={"chatApp__conv"}>
				<Title
					nbrStudent={this.props.countUsers}
				/>
				<MessageList
					owner={this.props.owner}
					ownerId={this.props.ownerId}
					messages={this.props.messages}
				/>
				<div className={"chatApp__convSendMessage clearfix"}>
					<TypingIndicator
						owner={this.props.owner}
						isTyping={this.props.isTyping}
					/>
					<InputMessage
						isLoading={this.state.isLoading}
						owner={this.props.owner}
						ownerAvatar={this.props.ownerAvatar}
						sendMessage={this.props.sendMessage}
						sendMessageLoading={this.sendMessageLoading}
						typing={this.props.typing}
						resetTyping={this.props.resetTyping}
					/>
				</div>
			</div>
		);
	}
}
/* end ChatBox component */
/* ========== */

/* ========== */
/* ChatRoom component - composed of multiple ChatBoxes */
class ChatRoom extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			messages: [],
			isTyping: [],
		};
		this.sendMessage = this.sendMessage.bind(this);
		this.typing = this.typing.bind(this);
		this.resetTyping = this.resetTyping.bind(this);
	}

	componentWillMount() {
		this.props.socket.on("broadcast-msg", (msgs) => {
			this.setState({ messages: msgs });
		});
	}

	/* adds a new message to the chatroom */
	sendMessage(sender, senderAvatar, message) {
		const { currentUserInfo } = this.props;

		setTimeout(() => {
			let messageFormat = detectURL(message);
			let newMessageItem = {
				id: currentUserInfo._id,
				senderId: currentUserInfo.userId,
				userId: currentUserInfo.userId,
				sender: currentUserInfo.studentName === undefined
					? currentUserInfo.teacherName : currentUserInfo.studentName,
				senderAvatar: senderAvatar,
				message: messageFormat
			};

			this.props.socket.emit("send-msg", newMessageItem);

			this.props.socket.on("broadcast-msg", (msgs) => {
				this.setState({ messages: msgs });
			});

			// this.setState({ messages: [...this.state.messages, newMessageItem] });
			this.resetTyping(sender);
		}, 400);
	}
	/* updates the writing indicator if not already displayed */
	typing(writer) {
		if (!this.state.isTyping[writer]) {
			let stateTyping = this.state.isTyping;
			stateTyping[writer] = true;
			this.setState({ isTyping: stateTyping });
		}
	}
	/* hide the writing indicator */
	resetTyping(writer) {
		let stateTyping = this.state.isTyping;
		stateTyping[writer] = false;
		this.setState({ isTyping: stateTyping });
	}
	render() {
		let users = {};
		let chatBoxes = [];
		let messages = this.state.messages;
		let isTyping = this.state.isTyping;
		let sendMessage = this.sendMessage;
		let typing = this.typing;
		let resetTyping = this.resetTyping;
		const currentUserInfo = this.props.currentUserInfo;

		/* user details - can add as many users as desired */
		users[0] = {
			id: currentUserInfo.userId, name: currentUserInfo.status == "student" ?
				currentUserInfo.studentName : currentUserInfo.teacherName, avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F08%2F08%2F09%2F17%2Favatar-1577909_960_720.png&f=1&nofb=1'
		};
		// users[1] = { name: 'Gabe', avatar: 'https://i.pravatar.cc/150?img=56' };
		/* test with two other users :)
		users[2] = { name: 'Kate', avatar: 'https://i.pravatar.cc/150?img=47' };
		users[3] = { name: 'Patrick', avatar: 'https://i.pravatar.cc/150?img=14' };
		*/

		/* creation of a chatbox for each user present in the chatroom */
		var user = users[0];
		chatBoxes.push(
			<ChatBox
				key={0}
				countUsers={this.props.countUsers}
				owner={user.name}
				ownerId={user.id}
				ownerAvatar={user.avatar}
				sendMessage={sendMessage}
				typing={typing}
				resetTyping={resetTyping}
				messages={messages}
				isTyping={isTyping}
			/>
		);
		return (
			<div className={"chatApp__room"}>
				{chatBoxes}
			</div>
		);
	}
}



class MainClassroom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isTeacher: false,
			teacherInfo: "",
			socket: io(process.env.REACT_APP_API_URL),
			userId: Math.floor(Math.random() * 99999999999999),
			users: [],
			isStreamOn: false,
			title: this.props.match.params.title || null,
			token: this.props.match.params.token || null,
			userInfo: {},
		}
	}

	isTeacherIn(users) {
		let check = 0;
		users.forEach(user => {
			if (user.status != "student") {
				this.setState({ teacherInfo: user.teacherName })
				check = 1;
			}

		});

		if (check === 1)
			this.setState({ isTeacher: true });
		else {
			this.setState({ isTeacher: false, teacherInfo: "" });
		}
	}

	componentDidMount() {
		const { userInfo, userId } = this.state;
		let data = userInfo.data;

		data.userId = userId;
		data.status = userInfo.status;

		this.state.socket.connect(true);
		this.state.socket.emit('join', data);

		this.state.socket.emit("get-student", data);

		this.state.socket.on('student-data', (data) => {
			let users = data;
			this.setState({ users });
			this.isTeacherIn(users);
		});

		window.addEventListener('beforeunload', function (e) {
			e.preventDefault();
			e.returnValue = this.state.socket.disconnect(true);;
		});
	}

	componentWillUnmount() {
		this.state.socket.disconnect(true);
	}

	componentWillMount() {
		// @TODO Check from server
		const { title, token } = this.state;

		if (title === null && token === null) {
			window.location.href = "/"
		} else {
			let data = JSON.parse(localStorage.getItem('userInfo'));

			if (data.data.classRoomToken != token || data.data.classTitle != title)
				window.location.href = "/";
			else {
				this.setState({
					userInfo: data,
				})
			}
		}
	}


	render() {
		const { users, socket, isStreamOn, userInfo, title, isTeacher, teacherInfo } = this.state;

		return (
			<div className="mainClass">
				<div className="side-main">
					<div style={{ position: 'absolute', top: '10px' }} className={"chatApp__convTitle"}>
						Bienvenu {userInfo.status == "student" ? userInfo.data.studentName : userInfo.data.teacherName} a votre classe de {title} 
						<p><b>Note :</b> CECI EST UN MVP, SI VOUS RENCONTREZ UN PROBLÈME, RAFRAICHISSEZ VOTRE PAGE WEB.</p>
						<p>NOTRE EQUIPE TRAVAIL CONSTAMMENT POUR RELEASE LA PREMIERE VERSION.</p> 
						</div>

					{isTeacher ?
						userInfo.status == "student" ?
							<WebcamStreamStudent teacherInfo={teacherInfo} socket={socket} currentUserInfo={userInfo.data} />
							: <StreamingClass socket={socket} currentUserInfo={userInfo.data} />
						:
						<div class="wrap-streaming">
							<span style={{ color: 'white' }}>Veuillez patienter, votre professeur n'est pas encore arrivé
						</span>
							<div class="lds-ellipsis">

								<div></div><div></div><div></div><div></div></div>

						</div>}

				</div>
				<div className="chatfeed-wrapper">
					<ChatRoom
						socket={socket}
						countUsers={users.length}
						currentUserInfo={userInfo.data}
					/>
				</div >
			</div>
		)
	}
}



export default withRouter(MainClassroom);