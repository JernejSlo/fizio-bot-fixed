import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {selectChats, selectCurrentChat, selectUser, setChats, setCurrentChat,addAChat,setCurrentChatCID} from "../Slices/navSlice";
import Chat from "../Components/Chat";
import {useLocation, useNavigate} from "react-router-dom"
import axios from "axios";
import {serverPort} from "../DatabaseCalls";

const ChatHistoryWrapper = styled.div`
  height: 65vh;
  padding-right: 10px;
  border-radius: 8px;
  overflow-y: hidden;
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

const ProfileSettingsButton = styled.button`
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

function getChat(chats, chatID) {
    const updatedChats = chats.map(chat => {
        if (chat.Id === chatID) {
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


const ChatHistory = ({additionalFunction, setDiagnosis}) => {
    const chats = useSelector(selectChats);
    const user = useSelector(selectUser)
    const current_ = useSelector(selectCurrentChat)
    const [selectedChatID, setSelectedChatID] = useState(null);
    const [updatedChats, setUpdatedChats] = useState(getChat(chats, selectedChatID));
    const [current, setCurrent] = useState([]);

    function handleChatClick(chatD,chatID,setDiagnosis){
        setSelectedChatID(chatID);
        additionalFunction(chatD);
        dispatch(setCurrentChatCID(chatID));
        getCurrentChat(chatID)
    };

    const dispatch = useDispatch()

    const getCurrentChat = async (id) => {
        try {
            axios.post(`http://localhost:${serverPort}/getMessages`, {
                id: id
            })
                .then(response => {
                    console.log(response.data)
                    if (response.data != null){
                        console.log(response.data.messages)
                        dispatch(setCurrentChat(response.data.messages))
                        dispatch(setCurrentChatCID(id))
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            // Handle login error
            console.log(error)
        }
    }

    function addChat(uid){
        axios.post(`http://localhost:${serverPort}/addChat`, {
            uid: uid
        })
            .then(response => {
                // add function to add chat and chats
                console.log(response)
                dispatch(addAChat({"Naslov": "Nov Pogovor","Id": response.data.Id, "Diagnoza": ""}))

            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div style={{
        }}>
            <ChatHistoryTitle>POGOVORI</ChatHistoryTitle>
            <ChatHistoryWrapper>

                {user != null ? (updatedChats.map(chat => (
                    <Chat
                        title={chat.Naslov}
                        selected={chat.selected}
                        key={chat.Id}
                        onClick={() => handleChatClick(chat.Diagnoza,chat.Id,setDiagnosis)}
                    />
                ))) : <text>
                    Prijavi se, da vidiš vse svoje pogovore!
                </text>}
            </ChatHistoryWrapper>
            <ProfileSettingsButton onClick={e => addChat(user.Id)} disabled={user === null}>
                Nov pogovor
            </ProfileSettingsButton>
        </div>
    );
}

export default ChatHistory;
