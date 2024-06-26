import React from "react"
import { Avatar, MessageText, ReactionsList, useMessageContext } from "stream-chat-react"
import CustomMessageUiActions from "./CustomMessageUiActions"
import CustomMessageUiMetadata from "./CustomMessageUiMetadata"
import MessageAttachments from "./MessageAttachments"

const CustomMessageUi = () => {
  const { isMyMessage, message } = useMessageContext()
  const messageUiClassNames = ["custom-message-ui"]
  
  if (isMyMessage()) {
    messageUiClassNames.push("custom-message-ui--mine")
  } else {
    messageUiClassNames.push("custom-message-ui--other")
  }
  
  return (
    <div className={messageUiClassNames.join(" ")} data-message-id={message.id}>
      {message.deleted_at && (
        <div className="custom-message-ui__body">This message has been deleted...</div>
      )}
      {!message.deleted_at && (
        <>
          <div className="custom-message-ui__body">
            <Avatar image={message.user?.image} name={message.user?.name || message.user?.id} />
            <MessageText />
          </div>
          {message.attachments && <MessageAttachments attachments={message.attachments} />}
          <CustomMessageUiMetadata />
          <CustomMessageUiActions />
          <ReactionsList />
        </>
      )}
    </div>
  )
}

export default CustomMessageUi
