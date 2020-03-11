import React from "react";

const EventsCards = props => {
  if (props.counter === 1) {
    return (
      <>
        <div className="event-card special">
          <h3>Upcoming...</h3>
          <picture>
            <img
              src={props.userEvent.eventImage}
              alt="your-event"
              className="event-photo"
              onClick={() =>
                props.history.push(`/events/${props.userEvent.id}`)
              }
            />
          </picture>

          <div className="event-info">
            <h4>{props.userEvent.name}</h4>
            <h5>{props.userEvent.date} </h5>
            <h5 className="light-text">{props.userEvent.city}</h5>
          </div>
          <div className="event-button-container">
            <button
              id="eventBtn"
              className="ui blue basic button "
              onClick={() =>
                props.history.push(`/events/${props.userEvent.id}`)
              }
            >
              More
            </button>
            <div data-tooltip="DELETE">
              <i
                id="trashIcon"
                className="big trash alternate icon"
                onClick={() => props.handleDelete("events", props.userEvent.id)}
              ></i>
            </div>
          </div>
        </div>
      </>
    );
  } else
    return (
      <>
        <div className="event-card">
          <picture>
            <img
              src={props.userEvent.eventImage}
              alt="event"
              className="event-photo"
              onClick={() =>
                props.history.push(`/events/${props.userEvent.id}`)
              }
            />
          </picture>

          <div className="event-info">
            <h4>{props.userEvent.name}</h4>
            <h5>{props.userEvent.date} </h5>
            <h5 className="light-text">{props.userEvent.city}</h5>
          </div>
          <div className="event-button-container">
            <button
              id="eventBtn"
              className="ui blue basic button "
              onClick={() =>
                props.history.push(`/events/${props.userEvent.id}`)
              }
            >
              More
            </button>
            <div data-tooltip="DELETE">
              <i
                id="trashIcon"
                className="big trash alternate icon"
                onClick={() => props.handleDelete("events", props.userEvent.id)}
              ></i>
            </div>
          </div>
        </div>
      </>
    );
};
export default EventsCards;
