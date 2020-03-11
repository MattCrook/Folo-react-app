import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import ApiManager from '../../modules/ApiManager';
import FollowCard from './FollowCard'
import FollowerForm from './FollowerForm'
import './Following.css'

const FollowingList = props => {
  const [followingList, setFollowingList] = useState([]);
  const [users, setUsers] = useState([]);
  const activeUser = JSON.parse(sessionStorage.getItem('credentials'))
  
  const getFollowings = () => {
    // Gets the activeUser's followings and puts them in state
    return ApiManager.getAllWithUserId("followings", parseInt(activeUser.id))
      .then(setFollowingList)
  }

  const getUsers = () => {
    // Gets all users and puts them in state
    return ApiManager.getAll("users")
      .then(setUsers)
  }

  // Find to get a user from state that matches the followId
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  const findExistingFollowing = (followedId) => {
    if (users.length > 0) {
      return users.find( ({id}) => id === followedId)
    } else {
      return {username: null}
    }
  }

  const handleDelete = (follow) => {
    confirmAlert({
      title: 'Confirm Unfollow',
      message: "Are you sure you want to unfollow this user?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => ApiManager.delete("followings", follow.id)
            .then(getFollowings)
        },
        {
          label: 'No',
          onClick: () => ""
        }
      ]
    })

  }

  useEffect(() => {
    getFollowings();
    getUsers();
  }, [])
  
  return (
    <>
      <div className="follow-background">
        <div className="follow-wrapper">
          <div id="follow-headerContainer">
            <h1>FOLLOWING ḸIST</h1>
          </div>
          <div className="follow-container-form">
            <FollowerForm
              getFollowings={getFollowings}
              followingList={followingList}
              {...props}
            />
          </div>
          <div className="follow-container-cards">
            {followingList.map(follow => 
              <FollowCard 
                key={follow.id}
                user={findExistingFollowing(follow.followedId)}
                handleDelete={() => handleDelete(follow)}
                {...props}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )

}

export default FollowingList  