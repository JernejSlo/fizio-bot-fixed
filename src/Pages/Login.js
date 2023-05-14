import Header from "../Components/Header"
import {AppWrapper} from "../Components/Constants"
import {useState} from "react";
import axios from "axios";
import {setChats, setCurrentChat, setUser} from "../Slices/navSlice";
import { useNavigate } from "react-router-dom";


export default function Login() {

    let serverPort = 5000

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function navigateTo(endpoint) {
        navigate(endpoint);
    }

    const getCurrentChat = async (id) => {
        try {
            axios.post(`http://localhost:${serverPort}/getMessages`, {
                id: id
            })
                .then(response => {
                    console.log(response.data)
                    if (response.data != null){
                        setCurrentChat(response.data.messages)
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
            axios.post(`http://localhost:${serverPort}/getChats`, {
                id: id
            })
                .then(response => {
                    console.log(response.data)
                    if (response.data != null){
                        setChats(response.data.chats)
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
            axios.post(`http://localhost:${serverPort}/login`, {
                email: email,
                password: password
            })
                .then(response => {
                    console.log(response)
                    if (response.data.user != null){
                        setUser(response.data.user)
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
                    <h1 style={{ color: '#0077C9', textAlign: 'center', marginBottom: '30px' }}>LOG IN</h1>
                    <form style={{ display: 'flex', flexDirection: 'column',alignItems: "center" }}>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: 'bold' }}>Email Address</label>
                            <input onChange={e => setEmail(e.target.value)} type="email" id="email" name="email" required placeholder="Enter your email address" style={{ padding: '10px', borderRadius: '5px', border: 'none', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)' }} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: 'bold' }}>Password</label>
                            <input onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" required placeholder="Enter your password" style={{ padding: '10px', borderRadius: '5px', border: 'none', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center',marginTop: "10px" }}>
                            <button onClick={e => handleSubmit(e)} type="submit" style={{ backgroundColor: '#0077C9', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Log in</button>
                        </div>
                    </form>
                </div>
            </div>
        </AppWrapper>
    );
}
