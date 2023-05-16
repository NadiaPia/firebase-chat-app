import React, { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where } from "firebase/firestore"; //onSnapshot will allow to listen to changes
import { auth, db } from "../firebase-config";



export const Chat = (props) => {

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);


    const messagesRef = collection(db, "messages") //the refferance to the location of the collection (table)where in the Firebase to put or get 

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", props.room) );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => { //callback fun will be run every time ,when it will be any changes in queryMessages
            //console.log("NEWWWWWWWWW");
            console.log("snapshotsnapshotsnapshot", snapshot)
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id}); 
            })
            setMessages(messages)
        }) //queryMessages specify what changes exactly to listen to

        return () => unsuscribe(); //cleaning up the useEffect
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: props.room,
        });

        setNewMessage("")

    }
    return (
        <div className="chat-app">
            <div>{messages.map((message, key) => <h1 key={`message-${key}`}>{message.text}</h1>)}</div>
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