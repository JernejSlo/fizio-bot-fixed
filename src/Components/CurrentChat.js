import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {selectChats, selectCurrentChat, selectUser, setChats, setSelectedChat} from '../Slices/navSlice';
import {useEffect, useRef, useState} from "react";

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
  padding-right:  8px;
  &:hover {
    overflow-y: auto;
    padding-right: ${props => props.isOverflowing ? '2px' : '8px'};
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

const CurrentChat = () => {
    const currentChat = useSelector(selectCurrentChat);
    const user = useSelector(selectUser)
    const chatContainerRef = useRef(null);

    const [isOverflowing, setIsOverflowing] = useState(false);

    // this use effect handles scrolling and changing the padding to smoothly fit the scrollbar
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        const lastChatBubble = chatContainer.lastElementChild;
        if (lastChatBubble != null){
            lastChatBubble.scrollIntoView({ behavior: 'smooth' });
        }
        if (chatContainer.scrollHeight > chatContainer.clientHeight) {
            setIsOverflowing(true);
        } else {
            setIsOverflowing(false);
        }
    }, [currentChat]);

    return (
        <ChatWrapper>
            <h3>{user !== null ? currentChat.Naslov : ""}</h3>
            <ChatContainer isOverflowing={isOverflowing} ref={chatContainerRef} >
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
