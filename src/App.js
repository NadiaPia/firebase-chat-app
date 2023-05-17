import React, { useState, useRef } from "react"; //useRef hook that grab data from input
import './App.css';
import './styles/Chat.css';
import './styles/Auth.css';


import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";



const cookies = new Cookies()

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }
  return (
    <>
      {room ? (
        <div><Chat room={room}/></div>
      ) : (
        <div className="room">
          <label>Enter Room Name:</label>
          <input ref={roomInputRef} /> {/*//if we implement onChange event the first letter wil make room state not empty anymore and it will open Chat  => let's use useRef */}
          <button onClick={() => setRoom(roomInputRef.current.value)}> 
            Enter Chat
          </button> {/*we kind of delaying the process of updating the room state to be equal the value of the input */}
        </div>)}

        <div className="sign-out">
          <button onClick={signUserOut}>Sign Out</button>
        </div>
    </>

  )

}

export default App;
