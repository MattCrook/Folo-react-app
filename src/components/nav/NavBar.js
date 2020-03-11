import React from "react";
import { slide as Menu } from "react-burger-menu";
import { withRouter } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {
  const handleLogout = () => {
    props.clearUser();
    props.history.push("/");
  };
  return (
    <Menu>
      {props.hasUser ? (
        <a className="menu-item" href="/">
          {" "}
          Home{""}
        </a>
      ) : null}

      {props.hasUser ? (
        <a className="menu-item" href="/news">
          News
        </a>
      ) : null}

      {props.hasUser ? (
        <a className="menu-item" href="/events">
          Events
        </a>
      ) : null}

      {props.hasUser ? (
        <a className="menu-item" href="/tasks">
          {" "}
          Tasks{" "}
        </a>
      ) : null}

      {props.hasUser ? (
        <a className="menu-item" href="/chat">
          Chat
        </a>
      ) : null}
      
      {props.hasUser ? (
        <a className="menu-item" href="/friends">
          Following List
        </a>
      ) : null}

      {props.hasUser ? (
        <a className="menu-item" onClick={handleLogout} href="/">
          {" "}
          Logout{" "}
        </a>
      ) : null}
    </Menu>
  );
};
export default withRouter(NavBar);
