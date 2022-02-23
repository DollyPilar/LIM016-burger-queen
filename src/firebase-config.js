// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm42S0gHwwlEk6ABaKu_SXq3JT4P1SeCs",
  authDomain: "happy-paws-8c623.firebaseapp.com",
  projectId: "happy-paws-8c623",
  storageBucket: "happy-paws-8c623.appspot.com",
  messagingSenderId: "789497116803",
  appId: "1:789497116803:web:c54abe09b8e2f1ef1a03b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);