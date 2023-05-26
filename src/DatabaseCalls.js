import axios from "axios";
import {setChats, setCurrentChat} from "./Slices/navSlice";

let serverPort = 5000

const getCurrentChat = async (id,set,dispatch) => {
    try {
        axios.post(`http://localhost:${serverPort}/getMessages`, {
            id: id
        })
            .then(response => {
                console.log(response.data)
                if (response.data != null){
                    dispatch(set(response.data.messages))
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

const getDiagnosis = async (id) => {
    try {
        axios.post(`http://localhost:${serverPort}/getDiagnosis`, {
            id: id
        })
            .then(response => {
                console.log(response.data)
                if (response.data != null){
                    return response.data.diagnoses
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

const getChats = async (id,set,setAll,dispatch) => {
    try {
        axios.post(`http://localhost:${serverPort}/getChats`, {
            id: id
        })
            .then(response => {
                console.log(response.data.chats)
                if (response.data != null){
                    dispatch(setChats(response.data.chats))
                    getCurrentChat(response.data.chats[0].Id,setAll,dispatch)
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

export {getChats,getCurrentChat,serverPort}