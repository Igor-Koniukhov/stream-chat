import React from "react"
import { useComponentContext, useMessageContext } from "stream-chat-react"

const CustomMessageUiActions = () => {
  const {
    handleDelete,
    handleFlag,
    handleOpenThread,
    handlePin,
    handleReaction,
    message,
    threadList,
  } = useMessageContext()
  
  const { reactionOptions } = useComponentContext()
  
  if (threadList) return null
  
  return (
    <div className="custom-message-ui__actions">
      <div className="custom-message-ui__actions-group">
        <button onClick={handlePin} title={message.pinned ? "Unpin" : "Pin"}>
          {message.pinned ? "📍" : "📌"}
        </button>
        <button onClick={handleDelete} title="Delete">
          🗑️
        </button>
        <button onClick={handleOpenThread} title="Open thread">
          ↩️
        </button>
        <button onClick={handleFlag} title="Flag message">
          🚩
        </button>
      </div>
      <div className="custom-message-ui__actions-group">
        {reactionOptions.map(({ Component, name, type }) => (
          <button key={type} onClick={(e) => handleReaction(type, e)} title={`React with: ${name}`}>
            <Component />
          </button>
        ))}
      </div>
    </div>
  )
}

export default CustomMessageUiActions