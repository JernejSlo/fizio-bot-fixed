import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {selectChats, selectCurrentChat} from '../Slices/navSlice';

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 85%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #fff;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding: 10px;
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

const ChatSender = styled.div`
  font-size: 12px;
  color: #999;
  margin-bottom: 5px;
`;

const CurrentChat = () => {
    const currentChat = useSelector(selectCurrentChat);
    const chats = useSelector(selectChats);
    return (
        <ChatWrapper>
            <h3>{currentChat.title}</h3>
            <ChatContainer>
                {currentChat.chats.map((chat) => (
                    <ChatBubble isSender={chat.sender === 'User'}>
                        <ChatMessage isSender={chat.sender === 'User'}>
                            {chat.content}
                        </ChatMessage>
                    </ChatBubble>
                ))}
            </ChatContainer>
        </ChatWrapper>
    );
};

export default CurrentChat;
