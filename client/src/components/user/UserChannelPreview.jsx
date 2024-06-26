import React from 'react';
import {useChatContext} from 'stream-chat-react';
import DirectPreview from "./DirectPreview";


const UserChannelPreview = ({setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type}) => {
  const {channel: activeChannel, client} = useChatContext();
  
  const ChannelPreview = () => (
    <p className="channel-preview__item">
      🗨️ {channel?.data?.name || channel?.data?.id}
    </p>
  );
  
  return (
    <div className={
      channel?.id === activeChannel?.id
        ? 'channel-preview__wrapper__selected'
        : 'channel-preview__wrapper'
    }
         onClick={() => {
           setIsCreating(false);
           setIsEditing(false);
           setActiveChannel(channel);
           if (setToggleContainer) {
             setToggleContainer((prevState) => !prevState)
           }
         }}
    >
      {type === 'team' ? <ChannelPreview/> : <DirectPreview channel={channel} client={client}/>}
    </div>
  );
}

export default UserChannelPreview;
