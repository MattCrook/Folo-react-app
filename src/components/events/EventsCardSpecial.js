import React from 'react'

const EventsCardsSpecial = props => {
    return(
        <>
        <div className="event-card special">
            <picture>
                <img src={props.userEvent.eventImage} alt="event-photo" className="event-photo"  onClick={()=> props.history.push(`/events/${props.userEvent.id}`)}/>
            </picture>
           
            <div className="event-info">
                <h4>{props.userEvent.name}</h4>
                <h5>{props.userEvent.date} </h5>
                <h5 className="light-text">{props.userEvent.city}</h5>
            </div>
            <div className="event-button-container">
            <button id="eventBtn" className="ui blue basic button " onClick={()=> props.history.push(`/events/${props.userEvent.id}`)}>More</button>
            <i id="trashIcon" className="trash alternate icon" onClick={()=> props.handleDelete('events', props.userEvent.id)}></i>
            </div>
        </div>
        </>
    )
}
export default EventsCardsSpecial