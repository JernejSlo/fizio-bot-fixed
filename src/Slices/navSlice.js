import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {"username": "jernej", "photo": "/FizioBot.png", "id": 1},
    chats: [
        {"title": "First Chat","chatID": 1, "diagnosis": "Tight quad"},
        {"title": "Chat example","chatID": 2, "diagnosis": "Tight hip abductor"},
        {"title": "Chat example","chatID": 3, "diagnosis": "Tight hip abductor"},
        {"title": "Chat example","chatID": 4, "diagnosis": "Tight hip abductor"},
        {"title": "Chat example","chatID": 5, "diagnosis": "Tight hip abductor"},
        {"title": "Chat example","chatID": 6, "diagnosis": "Tight hip abductor"},
        {"title": "Chat example","chatID": 7, "diagnosis": "Tight hip abductor"},
        {"title": "Chat example","chatID": 8, "diagnosis": "Tight hip abductor"},
        {"title": "Chat example","chatID": 9, "diagnosis": "Tight hip abductor"},
        {"title": "Chat example","chatID": 10, "diagnosis": "Tight hip abductor"},
        {"title": "Chat example","chatID": 11, "diagnosis": "Tight hip abductor"},
        {"title": "Chat example","chatID": 12, "diagnosis": "Tight hip abductor"},
        {"title": "Chat example","chatID": 13, "diagnosis": "Tight hip abductor"},
        {"title": "Chat example","chatID": 14, "diagnosis": "Tight hip abductor"},
        {"title": "Chat example","chatID": 15, "diagnosis": "Tight hip abductor"},
        {"title": "Chat example","chatID": 16, "diagnosis": "Tight hip abductor"},
    ],
    current_chat: {
        "chatID": 1,
        "chats": [
            {"sender": "Bot","content": "Hi! I am Fizio-bot a virtual assistant for all your physiotherapeutic needs"},
            {"sender": "User","content": "Hi Fizio!"},{"sender": "Bot","content": "Hi! I am Fizio-bot a virtual assistant for all your physiotherapeutic needs"},
            {"sender": "User","content": "Hi Fizio!"},
            {"sender": "Bot","content": "Hi! I am Fizio-bot a virtual assistant for all your physiotherapeutic needs"},
            {"sender": "User","content": "Hi Fizio!"},
            {"sender": "Bot","content": "Hi! I am Fizio-bot a virtual assistant for all your physiotherapeutic needs"},
            {"sender": "User","content": "Hi Fizio!"},
            {"sender": "Bot","content": "Hi! I am Fizio-bot a virtual assistant for all your physiotherapeutic needs"},
            {"sender": "User","content": "Hi Fizio!"},
            {"sender": "Bot","content": "Hi! I am Fizio-bot a virtual assistant for all your physiotherapeutic needs"},
            {"sender": "User","content": "Hi Fizio!"},

        ],
        "diagnosis": "Tight quad"
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
