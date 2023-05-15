// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmLl40TVYPMTxwKJZYmVj5y1XwOiOuBg4",
  authDomain: "chatapp-a3ddd.firebaseapp.com",
  projectId: "chatapp-a3ddd",
  storageBucket: "chatapp-a3ddd.appspot.com",
  messagingSenderId: "133578578955",
  appId: "1:133578578955:web:ee2d8a1d4e872e9c893b0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); //getAuth is used when we need use the authentication process
export const provider = new GoogleAuthProvider(); //GoogleAuthProvider tells the Firebase 
// that we want to handle the authentication using Google 