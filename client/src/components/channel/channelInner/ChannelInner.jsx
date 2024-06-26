import React, {useState} from "react"
import {MessageInput, MessageList, Thread, useChannelActionContext, useMessageContext, useChannelStateContext, Window} from "stream-chat-react"
import UserTeamChannelHeader from "./UserTeamChannelHeader"
import axios from "axios";
import {URL} from "../../../utils/constants";

export const GiphyContext = React.createContext({})

const ChannelInner = ({setIsEditing}) => {
  const [giphyState, setGiphyState] = useState(false)
  const {sendMessage} = useChannelActionContext()
  const { channel } = useChannelStateContext();
  const channelMembers = channel.state.members;
  
  const overrideSubmitHandler = async (msg) => {
    let updatedMessage = {
      attachments: msg.attachments,
      mentioned_users: msg.mentioned_users,
      parent_id: msg.parent?.id,
      parent: msg.parent,
      text: msg.text,
    }
    
    if (giphyState) {
      updatedMessage = {...updatedMessage, text: `/giphy ${msg.text}`}
    }
    if (sendMessage) {
      sendMessage(updatedMessage)
      const data = await axios.post(`${URL}/`, {msg, channelMembers})
      setGiphyState(false)
    }
  }
  
  return (
    <GiphyContext.Provider value={{giphyState, setGiphyState}}>
      <div style={{display: "flex", width: "100%"}}>
        <Window>
          <UserTeamChannelHeader setIsEditing={setIsEditing}/>
          <MessageList/>
          <MessageInput overrideSubmitHandler={overrideSubmitHandler}/>
        </Window>
        <Thread/>
      </div>
    </GiphyContext.Provider>
  )
}


export default ChannelInner
