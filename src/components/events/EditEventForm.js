import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import keys from "../../keys/keys";

const EditEventForm = props => {
  const [editedEvent, setEditedEvent] = useState({
    name: "",
    description: "",
    date: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: "",
    location: "",
    eventImage: ""
  });
  const [ogPost, setOgPost] = useState({})
  const [image, setImage] = useState({})
  const [isLoading, setIsLoading] = useState(false);
    const activeUser = JSON.parse(sessionStorage.getItem('credentials'))
    // const activeUser = { id: 2 };

  const handleFieldChange = e => {
    const stateToChange = { ...editedEvent };
    stateToChange[e.target.id] = e.target.value;
    setEditedEvent(stateToChange);
  };

  const handleDelete = () => {
    ApiManager.delete("events", props.eventId).then(() =>
      props.history.push("/events")
    );
  };
  useEffect(() => {
    ApiManager.get("events", props.eventId).then(userEvent => {
        setEditedEvent(userEvent);
        setOgPost(userEvent);
        setImage({eventImage: userEvent.eventImage})
        
      });
  }, [props.eventId]);
  const postNewEvent = e => {
    e.preventDefault();
    if (
      editedEvent.name === "" ||
      editedEvent.description === "" ||
      editedEvent.date === "" ||
      editedEvent.streetAddress === "" ||
      editedEvent.city === "" ||
      editedEvent.state === "" ||
      editedEvent.location === ""
    ) {
      window.alert("please fill out all the required fields");
    } else if (editedEvent.image=== ogPost.eventImage && image.eventImage!==ogPost.eventImage){
        setIsLoading(true);
      const editedEventObj = {
        id: props.eventId,
        name: editedEvent.name,
        userId: activeUser.id,
        description: editedEvent.description,
        date: editedEvent.date,
        streetAddress: editedEvent.streetAddress,
        city: editedEvent.city,
        location: editedEvent.location,
        state: editedEvent.state,
        zipcode: editedEvent.zipcode,
        eventImage: image.eventImage
      };
      ApiManager.updatePut("events", editedEventObj).then(() =>
        props.history.push("/events")
      );
    }else if (
      editedEvent.eventImage !== ogPost.eventImage &&
      image.eventImage !==
        ogPost.eventImage
    ) {
      window.alert("Only one image please.");
    } else if (
      editedEvent.eventImage !== ogPost.eventImage &&
      image.eventImage === ogPost.eventImage
    ) {
      setIsLoading(true);
      const editedEventObj = {
        id: props.eventId,
        name: editedEvent.name,
        userId: activeUser.id,
        description: editedEvent.description,
        date: editedEvent.date,
        streetAddress: editedEvent.streetAddress,
        city: editedEvent.city,
        location: editedEvent.location,
        state: editedEvent.state,
        zipcode: editedEvent.zipcode,
        eventImage: editedEvent.eventImage
      };
      ApiManager.updatePut("events", editedEventObj).then(() =>
        props.history.push("/events")
      );
    } else if (
      editedEvent.eventImage === ogPost.eventImage &&
      image.eventImage !== ogPost.eventImage

      ) {
      setIsLoading(true);
      const editedEventObj = {
        id: props.eventId,
        name: editedEvent.name,
        userId: activeUser.id,
        description: editedEvent.description,
        date: editedEvent.date,
        streetAddress: editedEvent.streetAddress,
        city: editedEvent.city,
        location: editedEvent.location,
        state: editedEvent.state,
        zipcode: editedEvent.zipcode,
        eventImage: image.eventImage
      };
      ApiManager.updatePut("events", editedEventObj).then(() =>
        props.history.push("/events")
      );
    } else if (editedEvent.eventImage===ogPost.eventImage){
        const editedEventObj = {
            id: props.eventId,
            name: editedEvent.name,
            userId: activeUser.id,
            description: editedEvent.description,
            date: editedEvent.date,
            streetAddress: editedEvent.streetAddress,
            city: editedEvent.city,
            location: editedEvent.location,
            state: editedEvent.state,
            zipcode: editedEvent.zipcode,
            eventImage: editedEvent.eventImage
          };
          ApiManager.updatePut("events", editedEventObj).then(() =>
            props.history.push("/events")
          );
    }
  };
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
    setImage({eventImage: file.secure_url});
    setIsLoading(false);
  };

  return (
    <>
      <div className="form-container">

        <div className="details-icon-container">
        <div data-tooltip="BACK">
          <i
            className="big arrow circle left icon"
            id="detailIcon"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to go back? All unsaved changes will be lost..."
                )
              ) {
                props.history.push("/events");
              }
            }}
          ></i>
          </div>
          <div data-tooltip="DELETE">
          <i
            id="trashIcon"
            className="big trash alternate icon"
            onClick={handleDelete}
          ></i>
          </div>
        </div>
        <h1>Edit Event</h1>     
        <form className="bigger-form">         
        
          <fieldset className="event-form">
            <label htmlFor="name">Title (req): </label>
            <input
              type="text"
              id="name"
              required
              value={editedEvent.name}
              onChange={handleFieldChange}
            />
            <label htmlFor="description">Description (req): </label>
            <textarea
              type="text"
              id="description"
              required
              value={editedEvent.description}
              onChange={handleFieldChange}
            />
            <label htmlFor="date">Date (req): </label>
            <input
              type="date"
              id="date"
              value={editedEvent.date}
              required
              onChange={handleFieldChange}
            />
            <label htmlFor="location">Location (req): </label>
            <input
              type="text"
              id="location"
              value={editedEvent.location}
              required
              onChange={handleFieldChange}
            />
          </fieldset>

          <fieldset className="event-form">
            <label htmlFor="city">City (req): </label>
            <input
              type="text"
              id="city"
              value={editedEvent.city}
              required
              onChange={handleFieldChange}
            />
            <label htmlFor="state">State</label>
            <select
              id="state"
              value={editedEvent.state}
              onChange={handleFieldChange}
            >
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            <label htmlFor="streetAddress">Address: </label>
            <input
              type="text"
              id="streetAddress"
              required
              value={editedEvent.streetAddress}
              onChange={handleFieldChange}
            />
            <label htmlFor="zipcode">Zipcode: </label>
            <input
              type="text"
              id="zipcode"
              required
              value={editedEvent.zipcode}
              onChange={handleFieldChange}
            />
          </fieldset>
          <fieldset className="event-form cloudinary-img">
            <label htmlFor="eventImage">Please upload or find an image</label>
            <input
              name="file"
              id="eventImage"
              type="file"
              className="file-upload"
              data-cloudinary-field="image_id"
              onChange={uploadImage}
              data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
            />
            <h4>Or</h4>
            <input
              id="eventImage"
              type="text"
            //   value={editedEvent.eventImage}
            placeholder="url..."
              onChange={handleFieldChange}
            />
          </fieldset>
        </form>
        <div className="newPhoto">
          {isLoading ? (
            <h3> Loading...</h3>
          ) : (
              editedEvent.eventImage!== ogPost.eventImage ? (
                <img src={editedEvent.eventImage} style={{width: '300px'}} alt="upload-photos"/>
              ) :
              image.eventImage ?(
                <img src={image.eventImage} style={{width: '300px'}}alt="upload-photos" />
              ) : (
            <>
              <img src={editedEvent.eventImage} style={{width: '300px'}} alt="upload-photos"/>
                
            </>)
          )}
        </div>
        <button
          id="homeBtn"
          className="ui blue basic button "
          onClick={postNewEvent}
        >
          Submit
        </button>
      </div>
    </>
  );
};
export default EditEventForm;
