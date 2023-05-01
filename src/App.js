import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Components/Header';
import { store } from './store';
import { Provider } from 'react-redux';

const AppWrapper = styled.div`
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: calc(100vh - 60px);
`;

const MainContent = styled.div`
  background-color: transparent;
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: start;
  align-items: center;
`;
const SecondaryContent = styled.div`
  background-color: white;
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroText = styled.div`
  background-color: transparent;
  width: 30vw;
  padding: 5%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const App = () => {
    return (
        <AppWrapper>
            <Header />
            <ContentWrapper>
                <MainContent>
                    <IntroText>
                        <text style={{
                            color: "white",
                            fontSize: 50,
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontWeight: 600,
                            width: "100%",
                        }}>
                            Rešite vaše težave z enim klikom
                        </text>
                        <text style={{
                            color: "gray",
                            fontSize: 15,
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontWeight: 400,
                            textAlign: "left",
                            width: "100%",
                        }}>
                            Fizio bot, vaš virtualni fizioterapev
                        </text>
                    </IntroText>
                </MainContent>
                <SecondaryContent>
                    <Link
                        to="/sign-up"
                        style={{
                            color: '#fff',
                            padding: '20px 40px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            textDecoration: 'none',
                        }}
                    >
                        Register
                    </Link>
                </SecondaryContent>

            </ContentWrapper>
        </AppWrapper>
    );
};

export default App;
