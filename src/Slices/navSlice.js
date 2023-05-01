import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {"username": "jernej", "photo": "/FizioBot.png"},
    chats: [
        {"title": "First Chat","chatID": 1},
        {"title": "Chat example","chatID": 2},
        {"title": "Chat example","chatID": 3},
        {"title": "Chat example","chatID": 4},
        {"title": "Chat example","chatID": 5},
        {"title": "Chat example","chatID": 6},
        {"title": "Chat example","chatID": 7},
        {"title": "Chat example","chatID": 8},
        {"title": "Chat example","chatID": 9},
        {"title": "Chat example","chatID": 10},
        {"title": "Chat example","chatID": 11},
        {"title": "Chat example","chatID": 12},
        {"title": "Chat example","chatID": 13},
        {"title": "Chat example","chatID": 14},
        {"title": "Chat example","chatID": 15},
        {"title": "Chat example","chatID": 16},
    ],
    current_chat: {
        "chatID": 1,
        "chats": [
            {"sender": "Bot","content": "Hi! I am Fizio-bot a virtual assistant for all your physiotherapeutic needs"},
            {"sender": "User","content": "Hi Fizio!"}
        ]
    },
}

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setCurrentChat: (state, action) => {
            state.current_chat = action.payload;
        },

    },
});

export const {setUser} = navSlice.actions;
export const selectUser = (state) => state.nav.user;
export const selectChats = (state) => state.nav.chats;
export const selectCurrentChat = (state) => state.nav.current_chat;

export default navSlice.reducer;
