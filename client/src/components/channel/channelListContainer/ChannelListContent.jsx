import React from "react"
import { ChannelList, useChatContext } from "stream-chat-react"
import { CompanyHeader, SideBar } from "../../ui"
import { ChannelSearch, UserChannelList, UserChannelPreview } from "../../index"
import { TYPE_MSGING, TYPE_TEAM } from "../../../utils/constants"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === TYPE_TEAM)
}

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === TYPE_MSGING)
}


const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
  const { client } = useChatContext()
  
  const logout = () => {
    cookies.remove("token")
    cookies.remove("userId")
    cookies.remove("username")
    cookies.remove("fullName")
    cookies.remove("avatarURL")
    cookies.remove("hashedPassword")
    cookies.remove("phoneNumber")
    
    window.location.reload()
  }
  
  const filters = { members: { $in: [client.userID] } }
  
  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <UserChannelList
              {...listProps}
              type={TYPE_TEAM}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <UserChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type={TYPE_TEAM}
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <UserChannelList
              {...listProps}
              type={TYPE_MSGING}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <UserChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type={TYPE_MSGING}
            />
          )}
        />
      </div>
    </>
  )
}

export default ChannelListContent