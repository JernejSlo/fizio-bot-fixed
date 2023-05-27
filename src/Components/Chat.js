import {useEffect, useState} from 'react';
import { BsChatLeft } from "react-icons/bs";
import styled from 'styled-components';
import {selectChats, selectCurrentChat, selectUser, setChats, setSelectedChat} from "../Slices/navSlice";
import {useDispatch, useSelector} from "react-redux";

const ChatContainer = styled.button`
  display: flex;
  padding: 5px 20px;
  align-items: center;
  border-radius: 8px;
  background-color: ${props => props.isSelected ? '#f6f6f6' : (props.isHovering ? '#f6f6f6' : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: none;
  width: 100%;

  &:hover {
  }
`;

const ChatIcon = styled(BsChatLeft)`
  font-size: 1.5rem;
  margin-right: 10px;
  color: #666;
`;

const ChatTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;




const Chat = ({ chat,selected,key,onClick }) => {

    const current = useSelector(selectCurrentChat)

    const [isHovering, setIsHovering] = useState(false);
    const [isSelected, setIsSelected] = useState(selected);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };


    useEffect(() => {
        if (current.cid === chat.Id){
            setIsSelected(true)
        }
        else{
            setIsSelected(false)
        }
    }, [current]);

    return (
            <ChatContainer
                onClick={onClick}
                isHovering={isHovering}
                isSelected={isSelected}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <ChatIcon />
                <ChatTitle>{chat.Naslov}</ChatTitle>
            </ChatContainer>
    );
};

export default Chat;
