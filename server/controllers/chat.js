const { twilioClient, messagingServiceSid } = require("../utils/constants")

const postMessage =(req, res) => {
  const { message, user: sender, type, members } = req.body
  
  if (type === "message.new") {
    members
      .filter((member) => member.user_id !== sender.id)
      .forEach(({ user }) => {
        if (!user.online) {
          twilioClient.messages.create({
              body: `You have a new message from ${message.user.fullName} - ${message.text}`,
              messagingServiceSid: messagingServiceSid,
              to: user.phoneNumber,
            })
            .then(() => console.log("Message sent!"))
            .catch((err) => console.log(err))
        }
      })
    
    return res.status(200).send("Message sent!")
  }
  
  return res.status(200).send("Not a new message request")
}

module.exports={postMessage}