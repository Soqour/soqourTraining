// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxthFGj5fDfp-AF4ps1kPBNMcCJwyaZGk",
  authDomain: "soqour-b3355.firebaseapp.com",
  projectId: "soqour-b3355",
  storageBucket: "soqour-b3355.appspot.com",
  messagingSenderId: "48615618175",
  appId: "1:48615618175:web:146742d754d5db8e6db14a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
