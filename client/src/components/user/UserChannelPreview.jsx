import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';


const DirectPreview = ({channel, client}) => {
    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    
    console.log(members[0]);
    
    return (
      <div className="channel-preview__item single">
          <Avatar
            image={members[0]?.user?.image}
            name={members[0]?.user?.fullName || members[0]?.user?.id}
            size={24}
          />
          <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </div>
    )
}

const UserChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => {
    const { channel: activeChannel, client } = useChatContext();

    const ChannelPreview = () => (
        <p className="channel-preview__item">
            # {channel?.data?.name || channel?.data?.id}
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
            if(setToggleContainer) {
                setToggleContainer((prevState) => !prevState)
            }
        }}
        >
            {type === 'team' ? <ChannelPreview /> : <DirectPreview channel={channel} client={client} />}
        </div>
    );
}

export default UserChannelPreview;