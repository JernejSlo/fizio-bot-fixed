import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Routes,Router, Route} from "react-router";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Chat from "./Pages/Chat";
import Profile from "./Pages/Profile";
import {Provider} from "react-redux";
import {store} from "./store";
import {PersistGate} from "redux-persist/integration/react"
import {persistStore} from "redux-persist"



const root = ReactDOM.createRoot(document.getElementById('root'));

let persistor = persistStore(store)

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                        <Route exact path="/" element={
                            <PersistGate persistor={persistor}>
                                <App/>
                            </PersistGate>
                        }/>
                        <Route exact path="/login" element={
                            <PersistGate persistor={persistor}>
                                <Login/>
                            </PersistGate>
                        }/>
                        <Route exact path="/sign-up" element={
                            <PersistGate persistor={persistor}>
                                <Register/>
                            </PersistGate>
                        }/>
                        <Route exact path="/chat" element={
                            <PersistGate persistor={persistor}>
                                <Chat/>
                            </PersistGate>
                        }/>
                        <Route exact path="/profile" element={
                            <PersistGate persistor={persistor}>
                                <Profile/>
                            </PersistGate>
                        }/>
                </Routes>

            </BrowserRouter>
        </React.StrictMode>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
