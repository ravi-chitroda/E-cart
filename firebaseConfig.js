// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsqQj4q0JDOGbQ1tymdIpK8qUrkHM55X4",
  authDomain: "e-cart-e50bd.firebaseapp.com",
  projectId: "e-cart-e50bd",
  storageBucket: "e-cart-e50bd.appspot.com",
  messagingSenderId: "808906952279",
  appId: "1:808906952279:web:a8ec6f15636fbc35c51d12",
  measurementId: "G-097ZJ7FVLQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
