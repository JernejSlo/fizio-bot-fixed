import Header from "../Components/Header";
import ChatHistory from "../Components/ChatHistory";
import CurrentChat from "../Components/CurrentChat";

import * as tf from "@tensorflow/tfjs"


function queryCurrentChat(diagnosis){

}

export default function Chat() {
    return (
        <div style={{ height: "100vh", backgroundColor: "#0c1b30"}}>
            <Header />
            <div
                style={{
                    backgroundColor: "#0c1b30",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 30,
                }}
            >
                <div
                    style={{
                        backgroundColor: "#fff",
                        width: "90%",
                        padding: "20px",
                        borderRadius: "5px",
                        boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
                        display: "flex",
                    }}
                >
                    <div style={{ width: "20%", padding: "0px 0px"}}>
                        <ChatHistory additionalFunction={queryCurrentChat}/>
                    </div>
                    <div style={{ width: "80%", padding: "0px 30px" }}>
                           <CurrentChat/>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "20px",
                            }}
                        >
                            <input
                                type="text"
                                style={{
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "none",
                                    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                                    flexGrow: "1",
                                    marginRight: "20px",
                                }}
                            />
                            <button
                                style={{
                                    backgroundColor: "#0077C9",
                                    color: "#fff",
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
