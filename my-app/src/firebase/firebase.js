// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhp3J9SZL4GosuIlpCiwQlLz56ygAYJ7w",
  authDomain: "tally-codebrewers-44082.firebaseapp.com",
  projectId: "tally-codebrewers-44082",
  storageBucket: "tally-codebrewers-44082.appspot.com",
  messagingSenderId: "69812637605",
  appId: "1:69812637605:web:7d3d83d3d367068524624c",
  measurementId: "G-3GTBXZ9F43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

