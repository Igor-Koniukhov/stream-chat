export const MESSENGER_NAME = process.env.REACT_APP_MESSENGER_NAME
export const URL = process.env.REACT_APP_URL
export const apiKey = process.env.REACT_APP_API_KEY

export const TYPE_TEAM = "team"
export const TYPE_MSGING = "messaging"
export const TYPE_CHANNEL = "channel"
export { default as signinImage } from "../assets/signup2.webp"

export const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
}
export const statusIconMap = {
  received: "✅",
  receivedAndRead: "👁️",
  sending: "🛫",
  unknown: "❓",
}
