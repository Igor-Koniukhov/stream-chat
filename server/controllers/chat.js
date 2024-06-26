const { twilioClient, messagingServiceSid } = require("../utils/constants")

const postMessage =(req, res) => {
  console.log("fired")
  const { message, user: sender, type, members } = req.body
  
  
    members
      .forEach(({ user }) => {
        
          twilioClient.messages.create({
              body: `You have a new message from ${message.user.fullName} - ${message.text}`,
              messagingServiceSid: messagingServiceSid,
              to: +380953357230,
            })
            .then(() => console.log("Message sent!"))
            .catch((err) => console.log(err))
        
      })
    
    return res.status(200).send("Message sent!")
  
  
  //return res.status(200).send("Not a new message request")
}

module.exports={postMessage}