import React, { useState } from 'react';
import { Chat } from 'stream-chat-react';
import { Auth, ChannelContainer, ChannelListContainer } from './components';
import 'stream-chat-react/dist/css/index.css';
import './styles/styles.css';
import useChatClient from "./components/hooks/useChatClient";

const App = () => {
  const { client, isLoading } = useChatClient();
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  if (isLoading) return <div>Loading...</div>;
  if (!client) return <Auth />;
  
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;
