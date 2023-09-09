// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// replace with firebase project config
const firebaseConfig = {
    apiKey: "xxxx",
    authDomain: "xxxx",
    projectId: "xxxx",
    storageBucket: "xxxx",
    messagingSenderId: "xxx",
    appId: "xxx",
};

const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

export {db};