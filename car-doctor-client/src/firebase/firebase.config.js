// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXyF29jaxB2K2D7H-ehCJHoIPx50v7m-Y",
  authDomain: "car-doctor-8031e.firebaseapp.com",
  projectId: "car-doctor-8031e",
  storageBucket: "car-doctor-8031e.appspot.com",
  messagingSenderId: "667940157512",
  appId: "1:667940157512:web:4b2e4dd4c3d5dc5a8b807d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth