import React from "react"

const FriendsEventCard = (friendEvent) => {

    return (
        <div className="friend-event-card-content">
            <div className='friend-event-header'>
            <picture>
                <img src={friendEvent.friendEvent.eventImage} alt="friend-event" className="friend-event-photo"/>
            </picture>
            <h2>{friendEvent.friendEvent.name}</h2>
            </div>
            <h5 className="light-text">{friendEvent.friendEvent.date}</h5>
            <h5 className="light-text">{friendEvent.friendEvent.location}</h5>
            <h5 className="light-text">by: {friendEvent.friendEvent.user.username}</h5>
            
            <button id="eventBtn" className="ui blue basic button " onClick={()=> window.location=`/friendsevents/${friendEvent.friendEvent.id}`}>More</button>
        </div>
    )

}
export default FriendsEventCard;