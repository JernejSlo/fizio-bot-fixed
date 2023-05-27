import Header from "../Components/Header";
import ChatHistory from "../Components/ChatHistory";
import CurrentChat from "../Components/CurrentChat";

import {useEffect, useState} from "react";
import {
    selectUser,
    setChats,
    setCurrentChat,
    setWholeChat,
    addToChat,
    selectCurrentChat,
    popFromChat, setChatTitle, setChatDiagnosis
} from "../Slices/navSlice";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import axios from "axios";
import {serverPort} from "../DatabaseCalls";

const ProfileSettingsButton = styled.button`
  margin-bottom: 5px;
  width: 10%;
  background-color: #1890ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #40a9ff;
  }
`;

function queryCurrentChat(diagnosis){

}

async function BotResponse(answer,bodypart,set,add){

    if (answer == "Hrbet"){
        set("Hrbet")
        return "Žal mi je, da slišim, " +
            "da vas muči bolečina v hrbtu. Hrbet je pogosto prizadet del telesa. " +
            "Prosim odgovori mi na nekaj vprašanj, da čim točneje ocenim, kako olajšati bolečine v hrbtu. " +
            "Ali je bolečina v hrbtu akutna (nenadna) ali kronična (dalj časa trajajoča)? " +
            "Odgovor prosim napiši, kot akutna ali kronična"
    } else {
        if (bodypart != ""){
            if (answer == "akutna" || answer == "kronična"){
                add(answer)
                return "Ali je bolečina posledica poškodbe ali nesreče? (odgovori z poškodba ali brez)"
            }else if (answer == "poškodba" || answer == "brez"){
                add(answer)
                return "Ali imate poleg bolečine v hrbtu tudi katerega od naslednjih simptomov? Prosimo, izberite vse, ki se nanašajo na vaše težave:\n" +
                    "a) Seva bolečina v nogah\n" +
                    "b) Otrplost ali mravljinčenje v nogah\n" +
                    "c) Slabost v nogah\n" +
                    "d) Nič od naštetega\n" +
                    "Odgovor prosim podajte, kot črke ločene SAMO z vejco (npr. a,c ali a,b,c ali d itd. )"
            }else if (answer.split(",")[0] == "a" || answer.split(",")[0] == "b" || answer.split(",")[0] == "c" || answer.split(",")[0] == "d") {
                add(answer)
                return "Ste se v zadnjem času ukvarjali z dvigovanjem težkih predmetov ali napornimi telesnimi aktivnostmi? " +
                    "(odgovori z sem oz. nisem)"
            }else if (answer == "sem" || answer == "nisem"){
                add(answer)
                return "Se bolečina poslabša pri določenih gibanjih ali položajih? (odgovori z da oz.ne)"
            }else if (answer == "da" || answer == "ne"){
                add(answer)
                return "Ste opazili kakšno oteklino ali vnetje na prizadetem območju? (odgovori z oteklina oz. ni otekline)"
            }else if (answer == "oteklina" || answer == "ni otekline"){
                add(answer)
                return "Ali imate preteklost težav ali bolezni hrbta? (odgovori z imam ali nimam)"
            }else if (answer == "imam" || answer == "nimam"){
                add(answer)
                return "Ste poskusili s samozdravljenjem, kot je počitek, terapija s toploto/mrzlim ali zdravila brez recepta? (odgovori" +
                    " z zdravila ali počitek ali toplo/mrzlo ali nisem zdravil. Če ste poskusili več kot eno odgovor ločite LE z vejico)"

            }else if (answer.split(",") == "zdravila" || answer.split(",") == "počitek" || answer.split(",") == "toplo/mrzlo" || answer.split(",") == "nisem" ){
                add(answer)
                return "Finished"
            }
            else{
                return "Žal mi je vendar ne razumem vašega odgovora. Kot testni chat bot še nisem sposoben poglobljenega razumevanja stavkov."
            }
            }
        else {
            return "Živjo! Moje ime je Fizio! Tu sem, da vam čim hitreje pomagam z vašimi težavami! " +
                "Prosim napišite del telesa, kjer se pojavlja bolečina. (Zaenkrat deluje le če odgovoriš Hrbet)"
        }

    }
}

export default function Chat() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const current = useSelector(selectCurrentChat).cid
    const chats = useSelector(selectCurrentChat)

    const [text,setText] = useState("")
    const [bodypart,setBodypart] = useState("")
    const [symptoms,setSyptoms] = useState([])

    let response = ""

    // this function handles setting the title and current body part
    function setBodypartAndTitle(message){
        setBodypart(message)
        dispatch(setChatTitle( {Naslov: "Bolečine v Hrbtu", Id: current}))
        dispatch(setChatDiagnosis({Diagnoza: "Dorzalgija", Id: current}))
        axios.post(`http://localhost:${serverPort}/alterChat`, {
            naslov: "Bolečine v Hrbtu",
            Id: current
        })
            .then(response => {
            })
            .catch(error => {
                console.error(error);
            });
        axios.post(`http://localhost:${serverPort}/alterDiagnosis`, {
            Diagnoza: "Dorzalgija",
            Id: current
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            });
    }

    // this function makes sure that when switching the chats no error occurs when responding
    async function loadSymptoms(){
        let arr = []
        for (let chat in chats.chats){
            if (chats.chats[chat].posiljatelj === "User"){
                arr.push(chats.chats[chat].vsebina)
            }
        }
        if (arr.includes("Hrbet")){
            setBodypart("Hrbet")
        }
        else {
            setBodypart("")
        }
        setSyptoms(arr)
    }

    // when the content of the current chat is changed, this updates the symptoms
    useEffect( () => {
        loadSymptoms()
    }, [chats]);

    // for sending with enter
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage(event,current)
        }
    }
    // this function adds a new symptom to the symptoms array
    function add(answer){
        let arr = symptoms
        arr.push(answer)
        setSyptoms(arr)
    }

    // delays the function for a pleasant visual effect of the bot actually thinking
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // this function sends the message and also handles the bots response
    async function sendMessage(event,cid){
        event.preventDefault()
        let text_ = text+""
        setText("")
        addMessage(cid,"User",text_)
        await delay(100);
        dispatch(addToChat({"Id": 0,"posiljatelj": "bot",
            "vsebina": "..."}))
        await delay(1000);
        dispatch(popFromChat("..."))
        response = await BotResponse(text_,bodypart,setBodypartAndTitle,add)

        if (response == "Finished"){

            axios.post(`http://localhost:${serverPort}/predict`, {
                array: symptoms,
            })
                .then(async response => {
                    addMessage(cid, "bot", response.data.prediction)
                    await delay(100);
                    dispatch(addToChat({
                        "Id": 0, "posiljatelj": "bot",
                        "vsebina": "..."
                    }))
                    await delay(300);
                    dispatch(popFromChat("..."))
                    addMessage(cid, "bot", "Upam, da vam bo moje priporočilo čim bolj pomagalo.")
                    await delay(100);
                    dispatch(addToChat({
                        "Id": 0, "posiljatelj": "bot",
                        "vsebina": "..."
                    }))
                    await delay(300);
                    dispatch(popFromChat("..."))
                    addMessage(cid, "bot", "Če pa z mojim odgovorom niste zadovoljni, prosim nacedite razlog zakaj v vašem profilu.")
                    await delay(100);
                    dispatch(addToChat({
                        "Id": 0, "posiljatelj": "bot",
                        "vsebina": "..."
                    }))
                    await delay(300);
                    dispatch(popFromChat("..."))
                    addMessage(cid, "bot", "Za ponovno ali drugo diagnozo prosim kliknite na gumb *Nov Pogovor*.")
                })
                .catch(error => {
                    console.error(error);
                });
        }else{
            addMessage(cid,"bot",response)
        }


    }

    // this function handles querying the express app to add a new message to teh current conversation
    function addMessage(cid,sender,message){
        axios.post(`http://localhost:${serverPort}/addMessage`, {
            cid: cid,
            sender: sender,
            message: message
        })
            .then(response => {
                // add function to add chat and chats
                dispatch(addToChat({"Id": response.data.insertId,"posiljatelj": sender,
                    "vsebina": message}))
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div style={{ height: "100vh", backgroundColor: "#0c1b30"}}>
            <Header />
            <div
                style={{
                    backgroundColor: "#0c1b30",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 40,
                }}
            >
                <div
                    style={{
                        backgroundColor: "#fff",
                        width: "90%",
                        padding: "20px 0px 30px 20px",
                        borderRadius: "5px",
                        boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
                        display: "flex",
                        height: "75vh"
                    }}
                >
                    <div style={{ width: "20%", padding: "0px 0px"}}>
                        <ChatHistory additionalFunction={queryCurrentChat}/>
                    </div>
                    <div style={{ width: "80%", padding: "0px 30px" }}>
                           <CurrentChat />
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "-2px",
                            }}
                        >
                            <input
                                type="text"
                                onChange={event => setText(event.target.value)}
                                onKeyDown={event => handleKeyDown(event)}
                                value={text}
                                style={{
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "none",
                                    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                                    flexGrow: "1",
                                    marginRight: "20px",
                                }}
                            />
                            <ProfileSettingsButton
                                disabled={user === null}
                                onClick={event => sendMessage(event,current)}
                            >
                                Pošlji
                            </ProfileSettingsButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
