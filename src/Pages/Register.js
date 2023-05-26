import Header from "../Components/Header"
import {AppWrapper} from "../Components/Constants"
import {useDispatch} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {serverPort} from "../DatabaseCalls";
import {setChats, setCurrentChat, setUser, setWholeChat} from "../Slices/navSlice";
export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // function that checks if user is already registered
    const checkEmail = async (event) => {

        event.preventDefault();
        try {
            axios.post(`http://localhost:${serverPort}/login`, {
                email: email,
                password: password
            })
                .then(response => {
                    if (response.data.userFound){
                        // add logic for saying to log in instead
                        navigate("/login")
                    }
                    else {
                        register()
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

    function addChat(uid){
        axios.post(`http://localhost:${serverPort}/addChat`, {
            uid: uid
        })
            .then(response => {
                // add function to add chat and chats
                console.log(response)
                dispatch(setChats([{"Naslov": "Nov Pogovor","Id": response.data.Id, "Diagnoza": ""},]))


                addMessage(response.data.Id,"bot","Živjo, moje ime je Fizio, kako ti lahko pomagam danes?")
            })
            .catch(error => {
                console.error(error);
            });
    }
    function addMessage(cid,sender,message){
        axios.post(`http://localhost:${serverPort}/addMessage`, {
            cid: cid,
            sender: sender,
            message: message
        })
            .then(response => {
                // add function to add chat and chats
                dispatch(setWholeChat({
                    "cid": cid,
                    "chats": [
                        {
                            "Id": response.data.Id,
                            "posiljatelj": "bot",
                            "vsebina": "Živjo, moje ime je Fizio, kako ti lahko pomagam danes?"
                        }
                    ],
                    "Diagnoza": ""
                },))
            })
            .catch(error => {
                console.error(error);
            });
    }

    // function that send an api call to the db.js app to insert data
    function register(){
        axios.post(`http://localhost:${serverPort}/register`, {
            name: name,
            email: email,
            password: password,
        })
            .then(response => {
                // add function to add chat and chats
                addChat(response.data.Id)

                dispatch(setUser({"Id": response.data.Id,"Ime": name,"Email": email, "Slika": "./DefaultImage"}))
                navigate("/profile")

            })
            .catch(error => {
                // Handle errors
                console.error(error);
                // Perform any necessary error handling
            });
    }

    // function that registers the user
    function registerUser(e){
        e.preventDefault()

        //check if email already has an account registered
        checkEmail(e)

        // empty the form
        setName("")
        setEmail("")
        setPassword("")
    }

    return (
        <AppWrapper>
            <Header />
            <div style={{ backgroundColor: '#F0F2F5', height: 'calc(100vh - 60px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ backgroundColor: '#fff', maxWidth: '300px', width: '90%', padding: '30px', borderRadius: '5px', boxShadow: '0px 2px 10px rgba(0,0,0,0.2)' }}>
                    <h1 style={{ color: '#0077C9', textAlign: 'center', marginBottom: '30px'}}>REGISTER</h1>
                    <form style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: 'bold' }}>Full Name</label>
                            <input onChange={e => setName(e.target.value)} type="text" id="name" name="name" required placeholder="Enter your full name" style={{ padding: '10px', borderRadius: '5px', border: 'none', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)' }} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: 'bold' }}>Email Address</label>
                            <input onChange={e => setEmail(e.target.value)} type="email" id="email" name="email" required placeholder="Enter your email address" style={{ padding: '10px', borderRadius: '5px', border: 'none', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)' }} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: 'bold' }}>Password</label>
                            <input onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" required placeholder="Enter a strong password" style={{ padding: '10px', borderRadius: '5px', border: 'none', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center',marginTop: "10px" }}>
                            <button onClick={e => registerUser(e)} type="submit" style={{ backgroundColor: '#0077C9', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </AppWrapper>
    );
}
