import Header from "../Components/Header"
import {AppWrapper} from "../Components/Constants"
import {useEffect, useState} from "react";
import axios from "axios";
import {setChats, setCurrentChat, setUser} from "../Slices/navSlice";
import {useLocation, useNavigate} from "react-router-dom";
import ChatHistory from "../Components/ChatHistory";
import {baseConn, serverPort} from "../DatabaseCalls"
import {useDispatch} from "react-redux";

export default function Login() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function navigateTo(endpoint) {
        navigate(endpoint);
    }
    const getCurrentChat = async (id) => {
        try {
            axios.post(`http://${baseConn}:${serverPort}/getMessages`, {
                id: id
            })
                .then(response => {
                    if (response.data != null){
                        dispatch(setCurrentChat(response.data.messages))
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


    const getChats = async (id) => {
        try {
            axios.post(`http://${baseConn}:${serverPort}/getChats`, {
                id: id
            })
                .then(response => {
                    if (response.data != null){
                        dispatch(setChats(response.data.chats))
                        getCurrentChat(response.data.chats[0].Id)
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


    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
            axios.post(`http://${baseConn}:${serverPort}/login`, {
                email: email,
                password: password
            })
                .then(response => {
                    if (response.data.user != null){
                        dispatch(setUser(response.data.user))
                        getChats(response.data.user.Id)
                        navigateTo("/profile")
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            // Handle login error
            console.log(error)
        }
    };
    return (
        <AppWrapper>
            <Header />
            <div style={{ backgroundColor: '#F0F2F5', height: 'calc(100vh - 60px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ backgroundColor: '#fff', maxWidth: '300px', width: '90%', padding: '30px', borderRadius: '5px', boxShadow: '0px 2px 10px rgba(0,0,0,0.2)' }}>
                    <h1 style={{ color: '#0077C9', textAlign: 'center', marginBottom: '30px' }}>PRIJAVA</h1>
                    <form style={{ display: 'flex', flexDirection: 'column',alignItems: "center" }}>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: 'bold' }}>Email naslov</label>
                            <input onChange={e => setEmail(e.target.value)} type="email" id="email" name="email" required placeholder="Vnesi svoj email naslov" style={{ padding: '10px', borderRadius: '5px', border: 'none', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)' }} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: 'bold' }}>Geslo</label>
                            <input onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" required placeholder="Vnesi svoje geslo" style={{ padding: '10px', borderRadius: '5px', border: 'none', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center',marginTop: "10px" }}>
                            <button onClick={e => handleSubmit(e)} type="submit" style={{ backgroundColor: '#0077C9', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Prijava</button>
                        </div>
                    </form>
                </div>
            </div>
        </AppWrapper>
    );
}
