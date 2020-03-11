import React, { useState, useEffect } from 'react'
import ApiManager from "../modules/ApiManager"
import keys from "../keys/keys";
import "./EditProfile.css";

const EditProfileForm = props => {
    const [editedUser, setEditedUser] = useState({})
    const [image, setImage] = useState({picUrl:""})
    const [isLoading, setIsLoading] = useState(false);
    const user= JSON.parse(sessionStorage.getItem('credentials'))
    


    const handleFieldChange = e => {
        const stateToChange = {...editedUser}
        stateToChange[e.target.id] = e.target.value
        setEditedUser(stateToChange)
    }

    const postUpdatedUser = e => {
        e.preventDefault()
        if(editedUser.email===""||editedUser.password===""||editedUser.username===""){
            window.alert('please fill out all the fields')
        } else if(editedUser.password !== editedUser.confirmedPassword){
            window.alert("The passwords do not match")
        } else if(image.picUrl===""){
            const editUser = {
                id:user.id,
                email: editedUser.email,
                username: editedUser.username,
                password: editedUser.password,
                picUrl: "https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg"
              };
              ApiManager.updatePut('users',editUser).then(user=> {
                  props.setUser(user, false)
                  window.location="/";
              })
        } else{
            const editUser = {
                id:user.id,
                email: editedUser.email,
                username: editedUser.username,
                password: editedUser.password,
                picUrl: image.picUrl
              };
              ApiManager.updatePut('users',editUser).then(user=> {
                  props.setUser(user, false)
                  window.location="/";
              })
        }
    }
    useEffect(()=> {
        setImage({picUrl: user.picUrl}) 
        setEditedUser(user)
    }, [])

    const uploadImage = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "photoLab");
        setIsLoading(true);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${keys.cloudinary}/image/upload`,
          {
            method: "POST",
            body: data
          }
        );
        const file = await res.json();
        setImage({ picUrl: file.secure_url });
        setIsLoading(false);
      };
      return (
        <form className="main-form" onSubmit={postUpdatedUser}>
        <fieldset className="fs-form">
            <h3 className="title">Edit Your Account</h3>
            <div className="create-form">
            <label htmlFor="inputEmail">Email Address</label>
            <input
                className="input"
                onChange={handleFieldChange}
                type="email"
                id="email"
               value={editedUser.email}
                required=""
                autoFocus=""
            />
            <label htmlFor="inputUsername">Username</label>
            <input
                className="input"
                onChange={handleFieldChange}
                type="text"
                id="username"
                value={editedUser.username}
                required=""
                autoFocus=""
            />

            <label htmlFor="inputPassword">Password</label>
            <input
                className="input"
                onChange={handleFieldChange}
                type="password"
                id="password"
                value={editedUser.password}
                required=""
                autoFocus=""
            />
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
                className="input"
                onChange={handleFieldChange}
                type="password"
                id="confirmedPassword"
                placeholder="Confirm password..."
                required=""
                autoFocus=""
            />
            <label htmlFor="eventImage">Please upload a profile picture</label>
            <input
                name="file"
                id="picUrl"
                type="file"
                className="file-upload"
                placeholder="Upload an Image"
                data-cloudinary-field="image_id"
                onChange={uploadImage}
                data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
            />
            </div>
            <div className="create-buttons">
           
            <div className="newPhoto">
                {isLoading ?(
                    <h3> Loading...</h3>
                ): (
                    <>
                    <img src={image.picUrl} style={{width: '300px'}} alt="upload-photos"/>
                    </>
                )}
                </div>
            <button 
                id="eventBtn"
                className="ui blue basic button" 
                type="submit">
                    Submit
            </button>
        
            </div>
        </fieldset>
        </form>
    );
}
export default  EditProfileForm;