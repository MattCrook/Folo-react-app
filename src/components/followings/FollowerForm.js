import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';

const FollowerForm = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [follow, setFollow] = useState({});
  const [users, setUsers] = useState([]);
  const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

  const handleFieldChange = evt => {
    const stateToChange = {...follow};
    stateToChange[evt.target.id] = evt.target.value;
    setFollow(stateToChange);
  }

  const getUsers = () => {
    // Gets all users and puts them in state
    return ApiManager.getAll("users")
      .then(setUsers)
  }

  // Find to get a user from state that matches the input username
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  const findMatchingUsername = (input) => {
    if (users.length > 0) {
      return users.find( ({username}) => username.toLowerCase() === input.toLowerCase())
    } else {
      return null
    }
  }

  const alreadyFollowing = (user) => {
    if (props.followingList.find(({followedId}) => followedId === user.id)) {
      return true;
    } else {
      return false;
    }
  }

  const validFollow = (matchingUser) => {
    // Check if they've entered a valid user:
    if (follow === "" || matchingUser === undefined) {
      window.alert("Please input a valid username");
      return false;
    // Check if they're already following them:
    } else if (alreadyFollowing(matchingUser)) {
      window.alert("You already follow that user")
      return false;
    // Check if they're you
    } else if (matchingUser.id === activeUser.id) {
      window.alert("Enter a user that isn't you")
      return false;
    } else {
      return true;
    }
  }

  const saveFollow = (follow) => {
    return ApiManager.post("followings", follow)
  }

  const handleSubmit = (evt) => {
    setIsLoading(true);
    evt.preventDefault();
    evt.stopPropagation();
    // Search for a username that matches their input:
    const matchingUser = findMatchingUsername(follow.follow);
    if (validFollow(matchingUser)) {
      const constructedFollow = {
        userId: activeUser.id,
        followedId: matchingUser.id
      };
      // Clears form upon submit
      evt.target.reset();
      saveFollow(constructedFollow)
        .then(props.getFollowings)
    } else {
      // Clears form on failed validation
      evt.target.reset();
    }
  }

  useEffect(() => {
    getUsers();
    setIsLoading(false);
  }, [])

  return (
    <>
      {/*
        https://stackoverflow.com/a/33212911
        Form Submit allows the Enter key to work 
        instead of just clicking the send button
      */}
      <div className="follow-container, darker, follow-input-container">
        <form className="follow-container-form" onSubmit={handleSubmit}>
          <fieldset className="follow-form-fieldset">
            <div className="follow-input-inner-container">
              <input
                className="follow-container-input"
                name="follow"
                type="follow"
                required
                onChange={handleFieldChange}
                id="follow"
                placeholder="Enter username to follow"
              />
              <button className="follow-send-button" data-tooltip="FOLLOW">
                <i className="user plus icon"
                  type="submit"
                  disabled={isLoading}
                >
                </i>
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  )
}

export default FollowerForm