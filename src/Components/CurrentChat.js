import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {selectChats, selectCurrentChat, selectUser} from '../Slices/navSlice';
import {useEffect, useRef} from "react";

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #fff;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
  overflow-y: hidden;
  &:hover {
    overflow-y: auto;
    padding-right:  8px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
  
`;

const ChatBubble = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isSender ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const ChatMessage = styled.div`
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.isSender ? '#03a9f4' : '#f5f5f5')};
  color: ${(props) => (props.isSender ? '#fff' : '#333')};
`;
const ProfileSettingsButton = styled.button`
  margin-bottom: 5px;
  width: 100%;
  background-color: #1890ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #40a9ff;
  }
`;
const CurrentChat = () => {
    const currentChat = useSelector(selectCurrentChat);
    const chats = useSelector(selectChats);
    const user = useSelector(selectUser)

    const chatContainerRef = useRef(null);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        const lastChatBubble = chatContainer.lastElementChild;
        if (lastChatBubble != null){
            lastChatBubble.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentChat]);

    return (
        <ChatWrapper>
            <h3>{user !== null ? currentChat.Naslov : ""}</h3>
            <ChatContainer ref={chatContainerRef}>
                {currentChat.chats.map((chat) => (
                    <ChatBubble isSender={chat.posiljatelj === 'User'}>
                        <ChatMessage isSender={chat.posiljatelj === 'User'}>
                            {chat.vsebina}
                        </ChatMessage>
                    </ChatBubble>))}
            </ChatContainer>
        </ChatWrapper>
    );
};

export default CurrentChat;
