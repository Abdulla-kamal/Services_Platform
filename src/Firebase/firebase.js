// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import getStorage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlTY1NQxkzcIWwRHlXrLP1JXuaWiclixI",
  authDomain: "services-platform-69110.firebaseapp.com",
  projectId: "services-platform-69110",
  storageBucket: "services-platform-69110.firebasestorage.app",
  messagingSenderId: "974155295410",
  appId: "1:974155295410:web:f7b323530532782d53f7ab",
  measurementId: "G-FTLMCZTX8E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize storage and export it
export default app;
