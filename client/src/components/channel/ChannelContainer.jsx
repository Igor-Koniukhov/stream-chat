import React from "react"
import {Channel} from "stream-chat-react"
import CustomMessageUi from "../message/CustomMessageUi"
import {EmojiPicker} from "stream-chat-react/emojis"

import {ChannelInner, CreateChannel, EditChannel} from ".."


const EmptyState = () => (
  <div className="channel-empty__container">
    <p className="channel-empty__first">This is the beginning of your chat history.</p>
    <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
  </div>
)

const WrappedChannel = ({children}) => {
  return <Channel
    EmptyStateIndicator={EmptyState}
    Message={CustomMessageUi}
    EmojiPicker={EmojiPicker}
  >{children}</Channel>
}
const ChannelContainer = ({isCreating, setIsCreating, isEditing, setIsEditing, createType}) => {
  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating}/>
      </div>
    )
  }
  
  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing}/>
      </div>
    )
  }
  
  return (
    <div className=" channel__container">
      <WrappedChannel>
        <ChannelInner setIsEditing={setIsEditing}/>
      </WrappedChannel>
    </div>
  )
}

export default ChannelContainer
