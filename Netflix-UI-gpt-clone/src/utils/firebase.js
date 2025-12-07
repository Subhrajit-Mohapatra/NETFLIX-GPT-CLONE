// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdHb7GF8r4Z1q-dlEJXly961TuxNxrxFQ",
  authDomain: "netflixgpt-53e00.firebaseapp.com",
  projectId: "netflixgpt-53e00",
  storageBucket: "netflixgpt-53e00.firebasestorage.app",
  messagingSenderId: "20366447135",
  appId: "1:20366447135:web:7d74fe1316649538173b2a",
  measurementId: "G-GCQYJFC7MR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
export const auth = getAuth();