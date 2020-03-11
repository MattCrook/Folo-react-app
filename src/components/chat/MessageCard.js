import React from "react";
import "./Messages.css"

const MessageCard = props => {
  const username = props.message.user.username;
  const userId = props.message.userId;
  const text = props.message.message;
  const timestamp = props.message.timestamp;
  const picUrl = props.message.user.picUrl;
  const activeUser = JSON.parse(sessionStorage.getItem('credentials'))

  return (
    <div className="card">
      <div className="card-content, message-container">
        <img src={picUrl} alt="Avatar" />
        <p>
          <strong>{username}</strong>: {text} 
        </p>
        {/* 
          If the active user id === the message's user id
          then output the edit button
        */}
        { parseInt(activeUser.id) === userId 
          ? (
            <div className="chat-edit-outline-icon" data-tooltip="EDIT">
              <i className="edit outline icon"
                onClick={() => props.setMessageToEdit(props.message)}
              />
            </div>
          )
          : ( null )
        }
        {/* 
          If a user is already following,
          or the user is the active user,
          display nothing.

          Otherwise, display the add friend button.
        */}
        {
          props.amFollowing || activeUser.id === userId
          ? ""
          : (
            <div className="chat-user-plus-icon" data-tooltip="FOLLOW">
              <i className="user plus icon" 
                onClick={() => props.handleFollow(userId)}
              />
            </div>
            ) 
        }
        <span className="message-time-right">{timestamp}</span>
      </div>
    </div>
  )
}

/*
<div class="ui icon button" data-content="Add users to your feed">
  <i class="add icon"></i>
</div>
*/

export default MessageCard