// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvSzHncf2jVkL6qVQwbWJ1XRdBbCI9CmE",
  authDomain: "keja-424910.firebaseapp.com",
  projectId: "keja-424910",
  storageBucket: "keja-424910.appspot.com",
  messagingSenderId: "766621918518",
  appId: "1:766621918518:web:9ad0040e0ac3fd23737f97",
  measurementId: "G-N5HYERHRKH"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;