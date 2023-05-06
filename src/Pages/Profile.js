import { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectUser } from '../Slices/navSlice';
import { selectChats } from '../Slices/navSlice';
import Chat from '../Components/Chat';
import Diagnosis from "../Components/Diagnosis";
import Feedback from '../Components/Feedback';
import Header from "../Components/Header";
import ChatHistory from "../Components/ChatHistory";
import CurrentChat from "../Components/CurrentChat";

const AppWrapper = styled.div`
  overflow-y: scroll;
  background-color: #0c1b30;
  height: 100vh;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    width: 6px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 10px;
  }
`;

const ProfilePageWrapper = styled.div`
  display: flex;
  margin-top: 2%;
  flex-direction: row;
  align-items: start;
`;

const ProfileSettingsWrapper = styled.div`
  display: flex;
  width: 12%;
  border-radius: 14px;
  padding: 0px 20px;
  margin-top: 20px;
  margin-left: 5%;
  background-color: white;
  flex-direction: column;
`;

const ProfileSettingsButton = styled.button`
  margin-top: 10px;
  margin-bottom: 15px;
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

const RightSideFeedback = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CurrentChatWrapper = styled.div`
  margin: 0% 25%;
  height: 50vh;
  align-self: center;
  border-radius: 14px;
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
`;

const ProfilePage = () => {
    const user = useSelector(selectUser);
    const chats = useSelector(selectChats);
    const [showFeedback, setShowFeedback] = useState(false);
    const [diagnosis, setDiagnosis] = useState("Select chat to display diagnosis");
    const handleFeedbackClick = () => {
        setShowFeedback(!showFeedback);
    };

    const setD = (diagnosis) => {
        setDiagnosis(diagnosis)
    }

    return (
        <AppWrapper>
            <Header/>
            <ProfilePageWrapper>
                <ProfileSettingsWrapper>
                    <ChatHistory additionalFunction={setD}/>

                    <ProfileSettingsButton onClick={handleFeedbackClick}>
                        Leave Feedback
                    </ProfileSettingsButton>
                </ProfileSettingsWrapper>

                <RightSideFeedback>
                    <Diagnosis value={diagnosis}/>
                    {showFeedback ? (
                        <Feedback onClose={handleFeedbackClick} />
                    ) : (
                        <CurrentChatWrapper>
                            <CurrentChat/>
                        </CurrentChatWrapper>
                    )}
                </RightSideFeedback>

            </ProfilePageWrapper>

        </AppWrapper>
    );
};

export default ProfilePage;
