import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "loginonecart-68ddf.firebaseapp.com",
  projectId: "loginonecart-68ddf",
  storageBucket: "loginonecart-68ddf.firebasestorage.app",
  messagingSenderId: "892746205005",
  appId: "1:892746205005:web:4928685d543e43e7b95904"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider}