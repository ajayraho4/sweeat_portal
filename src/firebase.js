import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBZJ-nvXPTwtLaADs123-QtrrCnFlkpQN0",
  authDomain: "de-sweeats.firebaseapp.com",
  projectId: "de-sweeats",
  storageBucket: "de-sweeats.appspot.com",
  messagingSenderId: "1081649292501",
  appId: "1:1081649292501:web:a026e281bcca891ca6ee5c"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
// const storage = getStorage()
export { app, db };