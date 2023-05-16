import React, { useState, useRef } from "react"; //useRef hook that grab data from input
import './App.css';
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";

const cookies = new Cookies()

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }
  return (
    <div>
      {room ? (
        <div>Chat</div>
      ) : (
        <div className="room">
          <label>Enter Room Name:</label>
          <input ref={roomInputRef} /> {/*//if we implement onChange event the first letter wil make room state not empty anymore and it will open Chat  => let's use useRef */}
          <button onClick={() => setRoom(roomInputRef.current.value)}> 
            Enter Chat
          </button> {/*we kind of delaying the process of updating the room state to be equal the value of the input */}
        </div>)}
    </div>
  )

}

export default App;
