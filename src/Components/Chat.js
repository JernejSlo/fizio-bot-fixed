import { useState } from 'react';
import { BsChatLeft } from "react-icons/bs";
import styled from 'styled-components';
import {useSelector} from "react-redux";
import {selectCurrentChat} from "../Slices/navSlice";

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



const Chat = ({ title,selected,key,onClick }) => {
    const [isHovering, setIsHovering] = useState(false);



    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
            <ChatContainer
                onClick={onClick}
                isHovering={isHovering}
                isSelected={selected}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <ChatIcon />
                <ChatTitle>{title}</ChatTitle>
            </ChatContainer>
    );
};

export default Chat;
