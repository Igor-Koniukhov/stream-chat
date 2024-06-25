const { app } = require("./init/index.js")
const authRoutes = require("./routes/auth.js")
const { PORT, accountSid, authToken, messagingServiceSid, twilioClient } = require("./utils/constants.js")
const { postMessage } = require("./controllers/chat.js")


app.post("/", postMessage)
app.use("/auth", authRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))