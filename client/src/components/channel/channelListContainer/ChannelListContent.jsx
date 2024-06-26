import React from "react"
import {ChannelList, useChatContext} from "stream-chat-react"
import {CompanyHeader, SideBar} from "../../ui"
import {ChannelSearch, UserChannelList, UserChannelPreview} from "../../index"
import {
  AVATAR_URL,
  FULL_NAME,
  HASHED_PASS,
  PHONE_NUMBER,
  TOKEN,
  TYPE_MSGING,
  TYPE_TEAM,
  USER_ID,
  USER_NAME
} from "../../../utils/constants"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === TYPE_TEAM)
}

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === TYPE_MSGING)
}


const ChannelListContent = ({isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer}) => {
  const {client} = useChatContext()
  
  const logout = () => {
    cookies.remove(TOKEN)
    cookies.remove(USER_ID)
    cookies.remove(USER_NAME)
    cookies.remove(FULL_NAME)
    cookies.remove(AVATAR_URL)
    cookies.remove(HASHED_PASS)
    cookies.remove(PHONE_NUMBER)
    
    window.location.reload()
  }
  
  const filters = {members: {$in: [client.userID]}}
  
  return (
    <>
      <SideBar logout={logout}/>
      <div className="channel-list__list__wrapper">
        <CompanyHeader/>
        <ChannelSearch setToggleContainer={setToggleContainer}/>
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