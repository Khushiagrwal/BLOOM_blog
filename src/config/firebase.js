import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAuM0F4Lk7Ffsmvim-W2lsBxQ0kUapLdgY",
  authDomain: "fir-2ac9d.firebaseapp.com",
  projectId: "fir-2ac9d",
  storageBucket: "fir-2ac9d.appspot.com",
  messagingSenderId: "621464853712",
  appId: "1:621464853712:web:ffab0f451a55e9b35d12d5",
  measurementId: "G-8DCQD96MPQ"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();