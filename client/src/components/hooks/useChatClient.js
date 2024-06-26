import { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import Cookies from 'universal-cookie';
import {
  apiKey,
  AVATAR_URL,
  FULL_NAME,
  HASHED_PASS,
  PHONE_NUMBER,
  TOKEN,
  USER_ID,
  USER_NAME
} from "../../utils/constants";

const useChatClient = () => {
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get(TOKEN);
    
    if (authToken) {
      const chatClient = StreamChat.getInstance(apiKey);
      
      chatClient.connectUser({
        id: cookies.get(USER_ID),
        name: cookies.get(USER_NAME),
        fullName: cookies.get(FULL_NAME),
        image: cookies.get(AVATAR_URL),
        hashedPassword: cookies.get(HASHED_PASS),
        phoneNumber: cookies.get(PHONE_NUMBER),
      }, authToken).then(() => {
        setClient(chatClient);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
    
    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, []);
  
  return { client, isLoading };
};

export default useChatClient;
