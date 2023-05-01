import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectChats } from "../Slices/navSlice";
import Chat from "../Components/Chat";

const ChatHistoryWrapper = styled.div`
  height: 65vh;
  padding-right: 10px;
  overflow-y: hidden;
  border-radius: 8px;

  &:hover {
    overflow-y: auto;
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

const ChatHistoryTitle = styled.h2`
  font-weight: 700;
  padding-bottom: 5px;
  font-size: 22px;
  margin: 15px;
`;

function getChat(chats, chatID) {
    const updatedChats = chats.map(chat => {
        if (chat.chatID === chatID) {
            return {
                ...chat,
                selected: true
            };
        } else {
            return {
                ...chat,
                selected: false
            };
        }
    });
    return updatedChats;
}

export default function ChatHistory() {
    const chats = useSelector(selectChats);
    const [selectedChatID, setSelectedChatID] = useState(null);

    const handleChatClick = chatID => {
        setSelectedChatID(chatID);
    };

    const updatedChats = getChat(chats, selectedChatID);

    return (
        <div style={{
        }}>
            <ChatHistoryTitle>POGOVORI</ChatHistoryTitle>
            <ChatHistoryWrapper>
                {updatedChats.map(chat => (
                    <Chat
                        title={chat.title}
                        selected={chat.selected}
                        key={chat.chatID}
                        onClick={() => handleChatClick(chat.chatID)}
                    />
                ))}
            </ChatHistoryWrapper>
        </div>
    );
}
