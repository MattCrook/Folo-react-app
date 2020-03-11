import React from "react";
import "./Home.css";
import FriendsEventsList from "../friendsEvents/FriendsEventsList";

const Home = props => {
    if(props.hasUser){
        return(
        <>
      <div className="home-container">
        <div className="home-picture">
          <picture className="home-dash">
          <img
              src="https://images.unsplash.com/34/BA1yLjNnQCI1yisIZGEi_2013-07-16_1922_IMG_9873.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
              alt="home"
              className="home-photo"
            />
           {
               <FriendsEventsList {...props} />
           }
          </picture>
        </div>
      </div>
    </>
        )
    }else {
  return (
    <>
      <div className="home-container">
        <div className="home-picture">
          <picture>
            <img
              src="https://images.unsplash.com/34/BA1yLjNnQCI1yisIZGEi_2013-07-16_1922_IMG_9873.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
              alt="home"
              className="home-photo"
            />
          </picture>
        </div>
        <div className="button-container">
          {!props.hasUser ? (
            <button
              id="eventBtn"
              className="ui blue basic button"
              onClick={() => {
                props.history.push("/login");
              }}
            >
              Sign In
            </button>
          ) : null}
          {!props.hasUser ? (
            <button
              id="eventBtn"
              className="ui blue basic button"
              onClick={() => props.history.push("/createaccount")}
            >
              Create an account
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};}
export default Home;
