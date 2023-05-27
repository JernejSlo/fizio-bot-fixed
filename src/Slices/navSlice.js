import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    chats: [
        {"Naslov": "First Chat","Id": 1, "Diagnoza": "Tight quad"},
        {"Naslov": "Chat example","Id": 2, "Diagnoza": "Tight hip abductor"},
        {"Naslov": "Chat example","Id": 3, "Diagnoza": "Tight hip abductor"},
        {"Naslov": "Chat example","Id": 4, "Diagnoza": "Tight hip abductor"},
        {"Naslov": "Chat example","Id": 5, "Diagnoza": "Tight hip abductor"},
        {"Naslov": "Chat example","Id": 6, "Diagnoza": "Tight hip abductor"},
        {"Naslov": "Chat example","Id": 7, "Diagnoza": "Tight hip abductor"},
    ],
    current_chat: {
        "cid": 0,
        "chats": [
            {"Id": 0,"posiljatelj": "bot", "vsebina": "Živjo, moje ime je Fizio! Če želiš govoriti z mano, se prosim prijavi."},
            {"Id": 1,"posiljatelj": "User", "vsebina": "Prijaviš se lahko zgoraj s klikom na gumb Log in."},
            {"Id": 2,"posiljatelj": "bot", "vsebina": "Če pa še nisi registriran pa to lahko storiš s pritiskom na gumb Sign Up."}
        ],
        "Diagnoza": "Welcome!"
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
            state.current_chat.chats = action.payload;
        },
        setCurrentChatCID:(state, action) => {
            state.current_chat.cid = action.payload;
        },
        setWholeChat: (state, action) => {
            state.current_chat = action.payload;
        },
        addToChat: (state, action) => {
            state.current_chat.chats.push(action.payload);
        },
        popFromChat:(state, action) => {
            state.current_chat.chats = state.current_chat.chats.filter(function(element) {
                return element.vsebina !== action.payload;
            });
        },
        addAChat: (state, action) => {
            state.chats.push(action.payload);
        },
        setChatTitle: (state, action) => {
            let index = 0
            for (let dict in state.chats){
                if (state.chats[dict].Id == action.payload.Id){
                    break
                }
                index++
            }
            state.chats[index].Naslov = action.payload.Naslov
        },
        setChatDiagnosis: (state, action) => {
            let index = 0
            for (let dict in state.chats){
                if (state.chats[dict].Id == action.payload.Id){
                    break
                }
                index++
            }
            state.chats[index].Diagnoza = action.payload.Diagnoza
        },
        setSelectedChat: (state, action) => {
            state.chats = state.chats.map(chat =>
                chat.Id === action.payload ? { ...chat, selected: true } : { ...chat, selected: false }
            );
        },

    },
});

export const {setUser,setChats,setCurrentChat, setWholeChat, addToChat,addAChat, setCurrentChatCID, popFromChat,setSelectedChat, setChatTitle, setChatDiagnosis} = navSlice.actions;
export const selectUser = (state) => state.nav.user;
export const selectChats = (state) => state.nav.chats;
export const selectCurrentChat = (state) => state.nav.current_chat;
export const selectAll = (state) => state.nav

export default navSlice.reducer;
