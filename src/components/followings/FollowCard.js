import React from "react";
import './Following.css'

const FollowCard = props => {
  const username = props.user.username;
  // const userId = props.user.id;
  const email = props.user.email;
  const picUrl = props.user.picUrl;

  return (
    <div className="follow-card">
      <div className="follow-card-content, follow-container">
        <img src={picUrl} alt="Avatar" />
        <p><i className="user outline icon"/> {username}</p>
        <p><i className="envelope outline icon"/> {email}</p>
        <div className="trash-container" data-tooltip="UNFOLLOW">
          <i 
            className="trash" 
            class="trash alternate icon"
            onClick={props.handleDelete} 
          />
        </div>
      </div>
    </div>
  )
}

export default FollowCard 