// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/storage";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore/lite";

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
// const app = initializeApp(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
// const db = firebase.firestore();

export { auth, db };

// export const auth = getAuth(app);
export const storage = getStorage(firebaseApp);
// export const db = getFirestore(app);
