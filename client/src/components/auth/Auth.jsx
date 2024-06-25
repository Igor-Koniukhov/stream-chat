import React, { useState } from "react"
import Cookies from "universal-cookie"
import axios from "axios"
import { initialState, signinImage, URL } from "../../utils/constants"
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
    
    cookies.set("token", token)
    cookies.set("username", username)
    cookies.set("fullName", fullName)
    cookies.set("userId", userId)
    
    if (isSignup) {
      cookies.set("phoneNumber", phoneNumber)
      cookies.set("avatarURL", avatarURL)
      cookies.set("hashedPassword", hashedPassword)
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
                name="fullName"
                type="text"
                placeholder="Full Name"
                handleChange={handleChange}
                labelText="Full Name"
              />
            )}
            <FormInput
              name="username"
              type="text"
              placeholder="Username"
              handleChange={handleChange}
              labelText="Username"
            />
            {isSignup && (
              <FormInput
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                handleChange={handleChange}
                labelText="Phone Number"
              />
            )}
            {isSignup && (
              <FormInput
                name="avatarURL"
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
