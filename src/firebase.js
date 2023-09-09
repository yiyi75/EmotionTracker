// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDtZMSER_LgSTk-1FZpHeFpTIM108QrEUU",
    authDomain: "emotionratings-a2b6e.firebaseapp.com",
    projectId: "emotionratings-a2b6e",
    storageBucket: "emotionratings-a2b6e.appspot.com",
    messagingSenderId: "414743691534",
    appId: "1:414743691534:web:e6957bb0a63d82dceb175f",
};

const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

export {db};