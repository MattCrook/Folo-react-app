import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import "./EventDetails.css";
import { confirmAlert } from "react-confirm-alert";

const EventDetails = props => {
  const [oneEvent, setOneEvent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = () => {
    setIsLoading(true);
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            ApiManager.delete("events", props.eventId).then(() =>
              props.history.push("/events")
            )
        },
        {
          label: "No",
          onClick: () => ""
        }
      ]
    });
    // ApiManager.delete('events', props.eventId).then(()=> props.history.push('/events'))
  };

  useEffect(() => {
    ApiManager.get("events", props.eventId).then(eventFromAPi => {
      setOneEvent(eventFromAPi);
    });
  }, [props.eventId]);

  return (
    <>
      <div className="details-container">
        <div className="event-details">
          <div className="details-icon-container">
            <div data-tooltip="BACK">
              <i
                className="big arrow circle left icon"
                id="detailIcon"
                onClick={() => props.history.push("/events")}
              ></i>
            </div>
            <div data-tooltip="EDIT">
              <i
                className="big edit icon"
                id="detailIcon"
                onClick={() =>
                  props.history.push(`/events/${props.eventId}/edit`)
                }
              ></i>
            </div>
          </div>
          <h1>{oneEvent.name}</h1>
          <picture>
            <img src={oneEvent.eventImage} alt="event" id="detail-photo" />
          </picture>
          <div className="kk-details-specific">
          <h4>{oneEvent.description}</h4>
          <div className="detail-event-info">
            <h4>Date: {oneEvent.date}</h4>
            <h4>Venue: {oneEvent.location}</h4> 
            <h4>Address: {oneEvent.streetAddress}</h4>
            <h4>
              Location: {oneEvent.city}, {oneEvent.state}, {oneEvent.zipcode}
            </h4>
          </div>
          </div>
          <div className="delete-container">
            <div data-tooltip="DELETE">
              <i
                id="trashIcon"
                className=" big trash alternate icon"
                onClick={handleDelete}
                disabled={isLoading}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EventDetails;
