require("dotenv").config()

const api_key = process.env.STREAM_API_KEY
const api_secret = process.env.STREAM_API_SECRET
const app_id = process.env.STREAM_APP_ID
const PORT = process.env.PORT || 5000

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID
const twilioClient = require("twilio")(accountSid, authToken)

module.exports = {
  api_secret,
  api_key,
  app_id,
  PORT,
  accountSid,
  authToken,
  messagingServiceSid,
  twilioClient,
}