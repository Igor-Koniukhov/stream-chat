import React, { useState } from "react"
import { useChatContext } from "stream-chat-react"
import ChannelNameInput from "../../ui/ChannelNameInput"
import { UserList } from "../../index"
import { CloseCreateChannel } from "../../../assets"
import { TYPE_TEAM } from "../../../utils/constants"


const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext()
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""])
  const [channelName, setChannelName] = useState("")
  
  const createChannel = async (e) => {
    e.preventDefault()
    
    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName, members: selectedUsers,
      })
      
      await newChannel.watch()
      
      setChannelName("")
      setIsCreating(false)
      setSelectedUsers([client.userID])
      setActiveChannel(newChannel)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>{createType === TYPE_TEAM ? "Create a New Channel" : "Send a Direct Message"}</p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === TYPE_TEAM && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="create-channel__button-wrapper" onClick={createChannel}>
        <p>{createType === TYPE_TEAM ? "Create Channel" : "Create Message Group"}</p>
      </div>
    </div>
  )
}

export default CreateChannel
