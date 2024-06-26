import React from "react"
import {useMessageContext} from "stream-chat-react";

const MessageAttachments = ({ attachments }) => {
  const { isMyMessage, message } = useMessageContext()
  const attachmentsUiClassNames = ["message-attachments"]
  
  if (isMyMessage()) {
    attachmentsUiClassNames.push("custom-attachment--mine")
  } else {
    attachmentsUiClassNames.push("custom-attachment--other")
  }
  return (
    <div className={attachmentsUiClassNames.join(" ")}>
      {attachments.map((attachment, index) => (
        <div key={index} className="message-attachment">
          {attachment.image_url && <img src={attachment.image_url} alt={attachment.fallback || "Attachment"} />}
          {attachment.file && (
            <a href={attachment.asset_url} target="_blank" rel="noopener noreferrer">
              {attachment.title || "File"}
            </a>
          )}
        </div>
      ))}
    </div>
  )
}

export default MessageAttachments
