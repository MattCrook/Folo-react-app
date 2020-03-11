import React, { useState, useEffect} from 'react';
import ApiManager from "../../modules/ApiManager";
import FriendsEventCard from './FriendsEventCard';
import "./FriendsEvents.css";

const FriendsEventsList = props => {
    const [friendsEvents, setFriendsEvents] = useState([])
    // const [friends, setFriends] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('credentials'))

    useEffect( ()=> {
        const arr= []
         ApiManager.getAllWithUserId('followings', user.id).then(friends=> {
            const friendArray = friends
            friendArray.forEach(friend=> {
                ApiManager.eventExpandUser('events', friend.followedId).then(events=> {
                    
                    arr.push(events.flat())
                    setFriendsEvents(arr.flat())
                })
            })
        })

    }, [user.id])

    if(friendsEvents.length>0){
    return (
        <>
        <div className="friends-event-cards">
            <h1>Events From People You Follow</h1>
            <div className="friends-events-card-container">
                { friendsEvents.map(friendEvent=> 
                    <FriendsEventCard key={friendEvent.id} friendEvent={friendEvent}/>)
              
            }
            </div>
        </div>
        </>
    )} else {
        return(
            <div></div>
        )
    }
}
export default FriendsEventsList