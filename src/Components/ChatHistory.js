import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
    selectChats,
    selectUser,
    setCurrentChat,
    addAChat,
    setCurrentChatCID,
    setSelectedChat, selectCurrentChat, setChats
} from "../Slices/navSlice";
import Chat from "../Components/Chat";
import axios from "axios";
import {getChats, serverPort} from "../DatabaseCalls";

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



const ChatHistory = ({additionalFunction, setDiagnosis}) => {

    const dispatch = useDispatch()

    const chats = useSelector(selectChats)
    const user = useSelector(selectUser)
    const current = useSelector(selectCurrentChat)


    // function that handles changing the chat
    async function handleChatClick(chatD, chatID, setDiagnosis) {
        additionalFunction(chatD.Diagnoza);
        dispatch(setCurrentChatCID(chatID));
        getCurrentChat(chatID)
        dispatch(setSelectedChat(chatD.Id))
    };


    // function that queries the express app to receive the current chat
    const getCurrentChat = async (id) => {
        try {
            axios.post(`http://localhost:${serverPort}/getMessages`, {
                id: id
            })
                .then(response => {
                    if (response.data != null){
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
    // function that handles adding a new chat
    const addChat = async (e,uid) => {
        e.preventDefault()
        axios.post(`http://localhost:${serverPort}/addChat`, {
            uid: uid
        })
            .then(response => {
                // add function to add chat and chats
                dispatch(addAChat({"Naslov": "Nov Pogovor", "Id": response.data.Id, "Diagnoza": "Ni diagnoze"}))
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

                {user != null ? (chats.map(chat => (
                    <Chat
                        chat={chat}
                        selected={chat.selected}
                        key={chat.Id}
                        onClick={() => handleChatClick(chat,chat.Id,setDiagnosis)}
                    />
                ))) : <text>
                    Prijavi se, da vidiš vse svoje pogovore!
                </text>}
            </ChatHistoryWrapper>
            <ProfileSettingsButton onClick={e => addChat(e,user.Id)} disabled={user === null}>
                Nov pogovor
            </ProfileSettingsButton>
        </div>
    );
}

export default ChatHistory;
