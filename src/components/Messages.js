import React from "react";

class Messages extends React.Component {
  render() {
    const {messages} = this.props;
    return (
      <ul className="list">
        {messages.map((message, index) => this.renderMessage(message, index))}
      </ul>
    );
  }

  renderMessage(message, index) {
    const {member, text} = message;
    const {currentMember} = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ?
      "message tren" : "message";
    return (
      <li className={className} key={index}>
      <span
        className="avatar"
        style={{backgroundColor: member.clientData.color}}
      />
        <div className="content">
          <div className="username">
            {member.clientData.username}
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}

export default Messages;