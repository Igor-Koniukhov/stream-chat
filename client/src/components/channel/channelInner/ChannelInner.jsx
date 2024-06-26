import React, { useState } from "react"
import { MessageInput, MessageList, Thread, useChannelActionContext, Window } from "stream-chat-react"
import UserTeamChannelHeader from "./UserTeamChannelHeader"

export const GiphyContext = React.createContext({})

const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false)
  const { sendMessage } = useChannelActionContext()
  
  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    }
    console.log(updatedMessage)
    
    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` }
    }
    
    if (sendMessage) {
      sendMessage(updatedMessage)
      setGiphyState(false)
    }
  }
  
  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: "flex", width: "100%" }}>
        <Window>
          <UserTeamChannelHeader setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  )
}


export default ChannelInner
