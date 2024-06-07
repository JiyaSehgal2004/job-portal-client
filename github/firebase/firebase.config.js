import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNqNf1em0hY3X4601s3SdS8e1B6Rlf-xg",
  authDomain: "job-portal-8e408.firebaseapp.com",
  projectId: "job-portal-8e408",
  storageBucket: "job-portal-8e408.appspot.com",
  messagingSenderId: "891144451868",
  appId: "1:891144451868:web:a0d8234e4a828dc70f6cd9",
  measurementId: "G-8J7NNX5N2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth, provider};