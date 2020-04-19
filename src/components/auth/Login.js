import React, { useState } from "react";
import "./Login.css";
import ApiManager from "../../modules/ApiManager";
const Login = props => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [isChecked, setIsChecked] = useState(false);

  const handleFieldChange = e => {
    const stateToChange = { ...credentials };
    stateToChange[e.target.id] = e.target.value;
    setCredentials(stateToChange);
  };

  const handleCheckBoxChange = e => {
    setIsChecked(e.target.checked);
  };

  // Check for "remember me" button is clicked. If it is, logs user in setting both local and session storage. If not, only session storage.
  // Sets guard by checking if response came back as 200. ** For a later stretch goal of more practical Authentication.
  // NOTE****This is NOT safe NOR best practice to do a GET call to database when authenticating. NOT SECURE.
  // ONLY for purposes of this project and using JSON server. Without Server Side.
  const handleLogin = e => {
    e.preventDefault();
    // ApiManager.getLogin("users", credentials.email, credentials.password).then(
      ApiManager.get().then(response => {
        console.log(response)
      // response => {
        if (response.length > 0 && isChecked === true) {
          props.setUser(response[0], true);
          setCredentials(response[0]);
          props.history.push("/");
        } else if (response.length > 0 && isChecked === false) {
          props.setUser(response[0], false);
          setCredentials(response[0]);
          props.history.push("/");
        } else {
          alert("Please type in the correct email/password");
        }
      }
    );
  };

  return (
    <form
      className="login-form"
      onSubmit={handleLogin}
    >
      <fieldset className="form">
        <h3 className="header">Please Sign In</h3>
        <div className="form-grid">
          <input
            className="login-input"
            onChange={handleFieldChange}
            type="email"
            id="email"
            placeholder="Email Address"
            required=""
            autoFocus=""
          />
          <label htmlFor="inputEmail">Email Address</label>

          <input
            className="login-input"
            onChange={handleFieldChange}
            type="password"
            id="password"
            placeholder="Password"
            required=""
          />
          <label htmlFor="inputPassword">Password</label>
        </div>
        <button className="login" type="submit">
          Sign In To Your Folo
        </button>
        <label className="option">Remember Me</label>
        <input
          className="option-checkbox"
          type="checkbox"
          onChange={handleCheckBoxChange}
        ></input>
      </fieldset>
    </form>
  );
};

export default Login;
