import React, { useState, useEffect} from "react" 
import ApiManager from "../../modules/ApiManager";
import "../events/EventDetails.css";

const FriendsEventDetails = props => {

    const [oneEvent, setOneEvent] = useState({})
    

    useEffect(()=> {
        ApiManager.get('events', props.eventId).then(eventFromAPi=> {
            setOneEvent(eventFromAPi)
        })
    }, [props.eventId])

    return(
        <>
        <div className="details-container">
        <div className="event-details">
            <div className="details-icon-container">
            <div className="details-icon-container">
            <div data-tooltip="BACK">
              <i
                className="big arrow circle left icon"
                id="detailIcon"
                onClick={() => props.history.push("/")}
              ></i>
            </div>
            </div>
            </div>
            <h1>{oneEvent.name}</h1>    
            <picture>
                <img src={oneEvent.eventImage} alt="event" id="detail-photo" />
            </picture>
            <h4>{oneEvent.description}</h4>
            <div className="detail-event-info">
                <h6>{oneEvent.date}</h6>
                <h6>{oneEvent.location}</h6>
                <h6>{oneEvent.streetAddress}</h6>
                <h6>{oneEvent.city}, {oneEvent.state}, {oneEvent.zipcode}</h6>
            </div>
            
        </div>
        </div>
        </>
    )
}
export default FriendsEventDetails;