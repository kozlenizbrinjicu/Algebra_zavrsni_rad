import React from 'react';
import './App.css';
import Messages from './components/Messages';
import Input from './components/input';


function randomColor() {
	return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

function randomName() {
	const firstName = [
		'Jim',
		'Kurt',
		'Jimi',
		'Janis',
		'Jim',
		'Amy',
		'Brian',
		'Robert',
		'Ron',
		'Kristen',
		'Dave',
		'Chris',
        'Tupac',
	];
	const lastName = [
        'Morrison',
        'Cobain',
        'Hendrix',
        'Joplin',
        'Morrison',
        'Winehouse',
        'Jones',
        'Johnson',
        'McKernan',
        'Pfaff',
        'Alexander',
        'Bell',
        'Shakur',
	];

	const firstNames = firstName[Math.floor(Math.random() * firstName.length)];
	const lastNames = lastName[Math.floor(Math.random() * lastName.length)];
	return firstNames + ' ' + lastNames;
}


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			messages: [],
			member: {
				username: randomName(),
				color: randomColor(),
			},
		};

		this.drone = new window.Scaledrone('jaSh4b1dwHztvSOA', {
			data: this.state.member,
		});
	}

	componentDidMount() {
		this.drone.on('open', (error) => {
			if (error) {
				return console.error(error);
			}
			const member = { ...this.state.member };
			member.id = this.drone.clientId;
			this.setState({ member });
		});
		const room = this.drone.subscribe('observable-room');
		room.on('data', (data, member) => {
			const messages = this.state.messages;
			messages.push({ member, text: data });
			this.setState({ messages });
		});
	}

	onSendMessage = (message) => {
		if (message === '') {
			alert('Write something!');
		} else {
			this.drone.publish({
				room: 'observable-room',
				message,
			});
		}
	};

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h1 className="h1">Chat App</h1>
				</div>
				<div></div>
				<Messages
					messages={this.state.messages}
					currentMember={this.state.member}
				/>
				<Input onSendMessage={this.onSendMessage} />
			</div>
		);
	}
}

export default App;
