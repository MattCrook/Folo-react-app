import React, { useState } from "react"
// import ApiManager from "../modules/ApiManager";

const PasswordCheck = props => {
    const [password, setPassword ] = useState({password:""})
    const user= JSON.parse(sessionStorage.getItem('credentials'))

    const handleFieldChange = e=> {
        const stateToChange = {...password}
        stateToChange[e.target.id] = e.target.value
        setPassword(stateToChange)
    }
    const handleSubmit = e => {
        e.preventDefault()
        if(password.password!== user.password){
            window.alert('Please enter in the correct password')
        } else{
            props.history.push('/editprofile')
        }
    }

    return (
        <>
        <div className="form-field">
            <div className="password-form">
            <h1>Please confirm your password</h1>
            <div className='password-field'>
                <input type="password" id="password" onChange={handleFieldChange}/>
            </div>
            <button 
                id="eventBtn"
                type="button" 
                className="ui blue basic button" 
                onClick={handleSubmit}>
                    Submit
            </button>
        </div>
        </div>
        </>
    )
}
export default PasswordCheck;