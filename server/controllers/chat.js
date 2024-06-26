const {twilioClient, messagingServiceSid} = require("../utils/constants")
const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^\+380\d{9}$/;
  return phoneNumberRegex.test(phoneNumber);
}

const postMessage = (req, res) => {
  const {msg, channelMembers} = req.body
 
  Object.values(channelMembers)
    .forEach(({user}) => {
      
      if (!validatePhoneNumber(user.phoneNumber)) {
        console.log(user.phoneNumber, " not valid format")
      }
      
      if (!user.online && validatePhoneNumber(user.phoneNumber)) {
        twilioClient.messages.create({
            body: `You have a new message from ${msg.user?.fullName ?? ""} - ${msg.text}`,
            messagingServiceSid: messagingServiceSid,
            to: user.phoneNumber,
          })
          .then(() => console.log("Message sent!"))
          .catch((err) => console.log(err))
      }
    })
  
  return res.status(200).send("Message sent!")
  
}

module.exports = {postMessage}