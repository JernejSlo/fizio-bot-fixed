import styled from "styled-components";

export const AppWrapper = styled.div`
  overflow-y: scroll;
  background-color: #0c1b30;
  scrollbar-width: thin;
  scrollbar-color: gray;
  
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
