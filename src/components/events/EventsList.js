import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import EventsCard from "./EventsCard";
import "./EventsList.css";
import { confirmAlert } from "react-confirm-alert";
const EventsList = props => {
  const [events, setEvents] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("credentials"));
  // const user = {id:2}
  const handleDelete = (component, id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            ApiManager.delete(component, id).then(() => {
              ApiManager.getAllWithUserId("events", user.id).then(setEvents);
            })
        },
        {
          label: "No",
          onClick: () => ""
        }
      ]
    });
  };

  useEffect(() => {
    ApiManager.getAllWithUserId("events", user.id).then(eventsFromApi => {
      setEvents(eventsFromApi);
    });
  }, [user.id]);
  let counter = 0;
  return (
    <>
      <div className="events-container">
        <div className="icon-container">
          <div data-tooltip="BACK">
            <i
              className="big arrow circle left icon"
              id="back-arrow-detail"
              onClick={() => props.history.push("/")}
            ></i>
          </div>
          <div data-tooltip="ADD">
            <i
              className="big plus square outline icon"
              id="plusIcon"
              onClick={() => props.history.push("/events/new")}
            ></i>
          </div>
        </div>
        <div className="card-container">
          {events
            .sort(function(a, b) {
              return new Date(b.date) - new Date(a.date);
            })
            .reverse()
            .map(userEvent => {
              counter++;
              return (
                <EventsCard
                  key={userEvent.id}
                  userEvent={userEvent}
                  {...props}
                  handleDelete={handleDelete}
                  counter={counter}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};
export default EventsList;
