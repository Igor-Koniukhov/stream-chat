import React, { useState } from "react"
import Cookies from "universal-cookie"
import axios from "axios"
import {
  AVATAR_URL,
  FULL_NAME, HASHED_PASS,
  initialState,
  PHONE_NUMBER,
  signinImage,
  TOKEN,
  URL,
  USER_ID,
  USER_NAME
} from "../../utils/constants"
import FormInput from "../ui/FormInput"

const cookies = new Cookies()
const Auth = () => {
  const [form, setForm] = useState(initialState)
  const [isSignup, setIsSignup] = useState(true)
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const { username, password, phoneNumber, avatarURL } = form
    
    const data = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
      username, password, fullName: form.fullName, phoneNumber, avatarURL,
    })
    const { token, userId, hashedPassword, fullName } = data.data
    
    cookies.set(TOKEN, token)
    cookies.set(USER_NAME, username)
    cookies.set(FULL_NAME, fullName)
    cookies.set(USER_ID, userId)
    
    if (isSignup) {
      cookies.set(PHONE_NUMBER, phoneNumber)
      cookies.set(AVATAR_URL, avatarURL)
      cookies.set(HASHED_PASS, hashedPassword)
    }
    
    window.location.reload()
    
  }
  
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
  }
  
  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <FormInput
                name={FULL_NAME}
                type="text"
                placeholder="Full Name"
                handleChange={handleChange}
                labelText="Full Name"
              />
            )}
            <FormInput
              name={USER_NAME}
              type="text"
              placeholder="Username"
              handleChange={handleChange}
              labelText="Username"
            />
            {isSignup && (
              <FormInput
                name={PHONE_NUMBER}
                type="text"
                placeholder="Phone Number"
                handleChange={handleChange}
                labelText="Phone Number"
              />
            )}
            {isSignup && (
              <FormInput
                name={AVATAR_URL}
                type="text"
                placeholder="Avatar URL"
                handleChange={handleChange}
                labelText="Avatar URL"
              />
            )}
            <FormInput
              name="password"
              type="password"
              placeholder="Password"
              handleChange={handleChange}
              labelText="Password"
            />
            {isSignup && (
              <FormInput
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                handleChange={handleChange}
                labelText="Confirm Password"
              />
            )}
            <div className="auth__form-container_fields-content_button">
              <button>{isSignup ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup
                ? "Already have an account?"
                : "Don't have an account?"
              }
              <span onClick={switchMode}>
                             {isSignup ? "Sign In" : "Sign Up"}
                             </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signinImage} alt="sign in" />
      </div>
    </div>
  )
}

export default Auth
