import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase-config";



export const Chat = (props) => {

    const [newMessage, setNewMessage] = useState("");

    const messageRef = collection(db, "messages") //the refferance to the location of the collection (table)where in the Firebase to put or get 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: props.room,
        });

        setNewMessage("")

    }
    return (
        <div className="chat-app">
            <form onSubmit={handleSubmit} className="new-message-form">
                <input
                    className="new-message-input"
                    placeholder="Type your message...."
                    onChange={(e) => {setNewMessage(e.target.value)}}
                    value={newMessage}
                />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    )
}