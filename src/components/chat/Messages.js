import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import MessageCard from './MessageCard';
import MessageForm from './MessageForm'
import './Messages.css'

const MessageList = props => {
  const [messages, setMessages] = useState([]);
  const [messageToEdit, setMessageToEdit] = useState({text: "", userId: 0, timestamp: ""});
  const [followingList, setFollowingList] = useState([]);
  const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

  const getMessages = () => {
    return ApiManager.getAllWithExpand("messages", "user")
      .then(setMessages);
  }

  const getFollowingList = () => {
    // Gets the activeUser's followings and puts them in state
    ApiManager.getAllWithUserId("followings", parseInt(activeUser.id))
      .then(setFollowingList)
  }

  const amFollowing = (user) => {
    if (followingList.find(({followedId}) => followedId === user.id)) {
      return true;
    } else {
      return false;
    }
  }

  const handleFollow = (userIdToFollow) => {
    const followToSave = {
      userId: activeUser.id,
      followedId: userIdToFollow
    }
    ApiManager.post("followings", followToSave)
      .then(getFollowingList);
  }

  useEffect(() => {
    getMessages();
    getFollowingList();
  }, [])

  return (
    <>
      <div className="chat-wrapper">
        <div className="chat-fixed-height-container">
          <div id="chat-headerContainer">
            <h1>CḦÂṪ</h1>
          </div>
          <div className="chat-ScrollToBottom">
            <div className="message-container-cards">
              {/* Sorting by date via: 
              https://stackoverflow.com/questions/10123953/how-to-sort-an-array-by-a-date-property*/}
              {messages.sort(function(a,b){
                return new Date(a.timestamp) - new Date(b.timestamp)
              }).map(message => 
                <MessageCard 
                  key={message.id} 
                  message={message}
                  setMessageToEdit={setMessageToEdit}
                  handleFollow={handleFollow}
                  amFollowing={amFollowing(message.user)}
                />
              )}
            </div>
          </div>
            <div className="container-form">
                <MessageForm
                  getMessages={getMessages}
                  messageToEdit={messageToEdit}
                  setMessageToEdit={setMessageToEdit}
                  {...props}
                />
            </div>
        </div>
      </div>
    </>
  )

}

export default MessageList