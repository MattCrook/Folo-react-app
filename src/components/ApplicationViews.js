import { Route, Redirect } from "react-router-dom";
import React  from "react";
import Home from "./home/Home";
import Login from "./auth/Login";
import CreateAccount from "./auth/KK-CreateAccount";
import NewsList from "./news/NewsList";
import NewsDetail from "./news/NewsDetail";
import NewsEditForm from "./news/NewsEditForm";
import NewsForm from "./news/NewsForm";
import EventsList from "./events/EventsList";
import EventDetails from "./events/EventDetails";
import NewEventForm from "./events/NewEventForm";
import EditEventForm from "./events/EditEventForm";
import MessageList from "./chat/Messages";
import TaskList from "./tasks/TaskList";
import TaskEditForm from "./tasks/TaskEditForm";
import AddNewTaskForm from "./tasks/AddNewTaskForm";
import FollowingList from "./followings/FollowingList";
import PasswordCheck from "../editProfile/PasswordCheck";
import EditProfileForm from "../editProfile/EditProfileForm";
import FriendsEventDetails from "./friendsEvents/FriendsEventDetails";
import CompletedTasks from "./tasks/CompletedTasks";

const ApplicationViews = props => {
  const hasUser = props.hasUser;
  const setUser = props.setUser;

  return (
    <React.Fragment>
      <Route
        exact
        path="/"
        render={props => {
          return <Home {...props} hasUser={hasUser} />;
        }}
      />

      <Route
        exact
        path="/login"
        render={props => {
          return <Login setUser={setUser} {...props} />;
        }}
      />
      <Route
        exact
        path="/createaccount"
        render={props => {
          return <CreateAccount setUser={setUser} {...props} />;
        }}
      />

      <Route
        exact
        path="/news"
        render={props => {
          if (hasUser) {
            return <NewsList {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        exact
        path="/news/:newsId(\d+)"
        render={props => {
          if (hasUser) {
            return (
              <NewsDetail
                newsId={parseInt(props.match.params.newsId)}
                {...props}
              />
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/news/:newsId(\d+)/edit"
        render={props => {
          if (hasUser) {
            return <NewsEditForm {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/news/new"
        render={props => {
          if (hasUser) {
            return <NewsForm {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        exact
        path="/events"
        render={props => {
          if (hasUser) {
            return <EventsList {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        exact
        path="/events/:eventId(\d+)"
        render={props => {
          if (hasUser) {
            return (
              <EventDetails
                eventId={parseInt(props.match.params.eventId)}
                {...props}
              />
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/events/:eventId(\d+)/edit"
        render={props => {
          if (hasUser) {
            return (
              <EditEventForm
                eventId={parseInt(props.match.params.eventId)}
                {...props}
              />
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/events/new"
        render={props => {
          if (hasUser) {
            return <NewEventForm {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route path="/chat" render={props => <MessageList {...props} />} />
      <Route
        exact
        path="/friendsevents/:eventId(\d+)"
        render={props => {
          if (hasUser) {
            return (
              <FriendsEventDetails
                eventId={parseInt(props.match.params.eventId)}
                {...props}
              />
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        exact
        path="/tasks"
        render={props =>
          hasUser ? <TaskList {...props} /> : <Redirect to="/login" />
        }
      />
      <Route
        exact
        path="/tasks/:taskId(\d+)/edit"
        render={props => {
          if (hasUser) {
            return (
              <TaskEditForm
                taskId={parseInt(props.match.params.taskId)}
                {...props}
              />
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/tasks/new"
        render={props =>
          hasUser ? <AddNewTaskForm {...props} /> : <Redirect to="/login" />
        }
      />
      <Route
        exact
        path="/tasks/completed"
        render={props => {
          if (hasUser) {
            return (
              <CompletedTasks
                taskId={parseInt(props.match.params.taskId)}
                {...props}
              />
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/friends"
        render={props => {
          if (hasUser) {
            return <FollowingList {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/confirmAccount"
        render={props => {
          if (hasUser) {
            return <PasswordCheck {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/editprofile"
        render={props => {
          if (hasUser) {
            return <EditProfileForm setUser={setUser} {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    </React.Fragment>
  );
};
export default ApplicationViews;
