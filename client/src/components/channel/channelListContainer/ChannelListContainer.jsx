import React, { useState } from "react"
import { ChannelListContent } from "./index"

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
  const [toggleContainer, setToggleContainer] = useState(false)
  
  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>
      
      <div className="channel-list__container-responsive"
           style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff" }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}
        >
        </div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  )
  
}

export default ChannelListContainer
