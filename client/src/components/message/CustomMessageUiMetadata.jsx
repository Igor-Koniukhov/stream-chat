import React from "react"
import { useChatContext, useMessageContext } from "stream-chat-react"
import { statusIconMap } from "../../utils/constants"

const CustomMessageUiMetadata = () => {
  const {
    message: {
      created_at: createdAt,
      message_text_updated_at: messageTextUpdatedAt,
      reply_count: replyCount = 0,
      status = "unknown",
    },
    readBy = [],
    handleOpenThread,
  } = useMessageContext()
  const { client } = useChatContext()
  
  const [firstUser] = readBy
  
  const receivedAndRead = readBy.length > 1 || (firstUser && firstUser.id !== client.user?.id)
  
  return (
    <div className="custom-message-ui__metadata">
      <div className="custom-message-ui__metadata-created-at">{createdAt?.toLocaleString()}</div>
      <div className="custom-message-ui__metadata-read-status">
        {receivedAndRead
          ? statusIconMap.receivedAndRead
          : statusIconMap[status] ?? statusIconMap.unknown}
      </div>
      {messageTextUpdatedAt && (
        <div className="custom-message-ui__metadata-edited-status" title={messageTextUpdatedAt}>
          Edited
        </div>
      )}
      {replyCount > 0 && (
        <button className="custom-message-ui__metadata-reply-count" onClick={handleOpenThread}>
          <span>
            {replyCount} {replyCount > 1 ? "replies" : "reply"}
          </span>
        </button>
      )}
    </div>
  )
}

export default CustomMessageUiMetadata