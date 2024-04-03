// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB54buszaijHUZVJU6ciQS7aNbWiIEV57k",
  authDomain: "next-word-44a90.firebaseapp.com",
  projectId: "next-word-44a90",
  storageBucket: "next-word-44a90.appspot.com",
  messagingSenderId: "163153975483",
  appId: "1:163153975483:web:3679ebf1da2971f94ff19e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const authCreate = getAuth(); // Aquí inicializamos el módulo de autenticación
const authValidation = getAuth(app); 

export { app, provider, authCreate, authValidation };
