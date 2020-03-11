// import React, { useState } from "react";
// import "./CreateAccount.css";
// import ApiManager from "../../modules/ApiManager";
// const CreateAccount = props => {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const [isChecked, setIsChecked] = useState(false);

//   const handleInputFieldChange = event => {
//     const stateToChange = { ...credentials };
//     stateToChange[event.target.id] = event.target.value;
//     setCredentials(stateToChange);
//   };
//   const handleSignInCheckBox = event => {
//     setIsChecked(event.target.checked);
//   };
//   const handleCreateAccountLogin = event => {
//     event.preventDefault();
//     props.setUser();
//     props.history.push("/");
//     if (isChecked === true) {
//       localStorage.setItem("credentials", JSON.stringify(credentials));
//       props.history.push("/");
//     } else {
//       sessionStorage.setItem("credentials", JSON.stringify(credentials));
//       props.history.push("/");
//     }
//   };
//   registration list... Gaurds:
//   should check to see if user account already exists
//   button disabled (user cannot submit incomplete info)
//   fetch call to post new user object
//   add photo in object
//   const handleAuth = async e => {
//     try {
//       if (!props.hasUser) {
//         const postUserToApi = ApiManager.post();
//         setCredentials(postUserToApi);
//         handleCreateAccountLogin(e);
//       } else {
//         window.alert("Please enter the correct email/ password");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <form className="create-account-form" onSubmit={handleCreateAccountLogin}>
//       <fieldset className="form">
//         <h3 className="header">Create Your Account</h3>
//         <div className="sign-in-form-grid">
//           <input
//             className="create-account-input"
//             onChange={handleInputFieldChange}
//             type="email"
//             id="create-email"
//             placeholder="Enter Email Address"
//             required=""
//             autoFocus=""
//           />
//           <label htmlFor="inputEmail">Email Address</label>

//           <input
//             className="create-account-input"
//             onChange={handleInputFieldChange}
//             type="password"
//             id="create-password"
//             placeholder="Create Your Password"
//             required=""
//             autoFocus=""
//           />
//           <label htmlFor="inputPassword">Password</label>
//         </div>
//         <button className="login" type="submit">
//           Sign In
//         </button>
//         <label className="option">Remember Me</label>
//         <input
//           className="option"
//           type="checkbox"
//           onChange={handleSignInCheckBox}
//         ></input>
//       </fieldset>
//     </form>
//   );
// };


