import React, { useState } from "react";
import ApiManager from "../../modules/ApiManager";
import keys from "../../keys/keys";
import "./NewEventForm.css"

const NewEventForm = props => {
  const [newEvent, setNewEvent] = useState({
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
  const [image, setImage] = useState({ eventImage: "https://www.muralswallpaper.com/app/uploads/geometric-mountains-blue-nursery-plain-820x532.jpg" });
  const [isLoading, setIsLoading] = useState(false);
  const activeUser = JSON.parse(sessionStorage.getItem('credentials'))
//   const activeUser = { id: 2 };

  const handleFieldChange = e => {
    const stateToChange = { ...newEvent };
    stateToChange[e.target.id] = e.target.value;
    setNewEvent(stateToChange);
  };
  const postNewEvent = e => {
    e.preventDefault();
    if (
      newEvent.name === "" ||
      newEvent.description === "" ||
      newEvent.date === "" ||
      newEvent.streetAddress === "" ||
      newEvent.city === "" ||
      newEvent.state === "" ||
      newEvent.location === ""
    ) {
      window.alert("please fill out all the required fields");
    }  else if (newEvent.eventImage !== "" && image.eventImage !== "https://www.muralswallpaper.com/app/uploads/geometric-mountains-blue-nursery-plain-820x532.jpg"){
        window.alert('Only one image please.')
    }else if (newEvent.eventImage === "" && image.eventImage === "https://www.muralswallpaper.com/app/uploads/geometric-mountains-blue-nursery-plain-820x532.jpg") {
      setIsLoading(true);
      const newEventObj = {
        name: newEvent.name,
        userId: activeUser.id,
        description: newEvent.description,
        date: newEvent.date,
        streetAddress: newEvent.streetAddress,
        city: newEvent.city,
        location: newEvent.location,
        state: newEvent.state,
        zipcode: newEvent.zipcode,
        eventImage:
          "https://www.muralswallpaper.com/app/uploads/geometric-mountains-blue-nursery-plain-820x532.jpg"
      };
      ApiManager.post("events", newEventObj).then(() =>
        props.history.push("/events")
      );
    } else if (newEvent.eventImage === "" && image.eventImage !== "https://www.muralswallpaper.com/app/uploads/geometric-mountains-blue-nursery-plain-820x532.jpg") {
      setIsLoading(true);
      const newEventObj = {
        name: newEvent.name,
        userId: activeUser.id,
        description: newEvent.description,
        date: newEvent.date,
        streetAddress: newEvent.streetAddress,
        city: newEvent.city,
        location: newEvent.location,
        state: newEvent.state,
        zipcode: newEvent.zipcode,
        eventImage: image.eventImage
      };
      ApiManager.post("events", newEventObj).then(() =>
        props.history.push("/events")
      );
    } else if (newEvent.eventImage !== "" && image.eventImage === "https://www.muralswallpaper.com/app/uploads/geometric-mountains-blue-nursery-plain-820x532.jpg") {
      setIsLoading(true);
      const newEventObj = {
        name: newEvent.name,
        userId: activeUser.id,
        description: newEvent.description,
        date: newEvent.date,
        streetAddress: newEvent.streetAddress,
        city: newEvent.city,
        location: newEvent.location,
        state: newEvent.state,
        zipcode: newEvent.zipcode,
        eventImage: newEvent.eventImage
      };
      ApiManager.post("events", newEventObj).then(() =>
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
      <h1>New Event</h1>   
        <form className="bigger-form">
          <fieldset className="event-form">
            <label htmlFor="name">Title (req): </label>
            <input type="text" id="name" required placeholder="Title..." onChange={handleFieldChange}/>
            <label htmlFor="description">Description (req): </label>
            <textarea
              type="text"
              id="description"
              required
              placeholder="Description..."
              onChange={handleFieldChange}
            />
            <label htmlFor="date">Date (req): </label>
            <input type="date" id="date" required onChange={handleFieldChange} />
            <label htmlFor="location">Location (req): </label>
            <input type="text" id="location"  placeholder="Location..." required onChange={handleFieldChange}/>
            </fieldset>

            <fieldset className="event-form">
            <label htmlFor="city">City (req): </label>
            <input type="text" id="city" placeholder="City..." required onChange={handleFieldChange}/>
            <label htmlFor="state">State</label>
            <select id="state" onChange={handleFieldChange}>
              <option selected disabled>
                Please choose a state
              </option>
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
            <label htmlFor="streetAddress" >Address: </label>
            <input
              type="text"
              id="streetAddress"
              required
              placeholder="Address..."
              onChange={handleFieldChange}
            />
            <label htmlFor="zipcode">Zipcode: </label>
            <input type="text" id="zipcode" required placeholder="Zipcode..." onChange={handleFieldChange}/>
            </fieldset>
            <fieldset className="event-form">
            <label htmlFor="eventImage">Please upload or find an image</label>
            <input name="file" id="eventImage" type="file"
   className="file-upload" placeholder="Upload an Image"data-cloudinary-field="image_id" onChange={uploadImage}
   data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"/>
   <h4>Or</h4>
   <input id="eventImage" type="text" placeholder="url..." onChange={handleFieldChange}/>
    
          </fieldset>
          
        </form>
        <div className="newPhoto">
            {isLoading ?(
                <h3> Loading...</h3>
            ): (
                image.eventImage? (
                    <img src={image.eventImage} style={{width: '300px'}} alt="upload-photos"/>
                ) :(
                <>
                <img src={newEvent.eventImage} style={{width: '300px'}} alt="upload-photos" />
                
                </>)
            )}
            </div>
            <button id="homeBtn" className="ui blue basic button " onClick={postNewEvent}>Submit</button>
      </div>
    </>
  );
};

export default NewEventForm;