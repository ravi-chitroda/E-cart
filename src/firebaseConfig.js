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

// const firebaseConfig = {
//   apiKey: "AIzaSyBsqQj4q0JDOGbQ1tymdIpK8qUrkHM55X4",
//   authDomain: "e-cart-e50bd.firebaseapp.com",
//   projectId: "e-cart-e50bd",
//   storageBucket: "e-cart-e50bd.appspot.com",
//   messagingSenderId: "808906952279",
//   appId: "1:808906952279:web:a8ec6f15636fbc35c51d12",
//   measurementId: "G-097ZJ7FVLQ",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCOzYHuxdS4Uxa3Ils9JR1mKUsINqvxmKM",
  authDomain: "e-cart-new.firebaseapp.com",
  projectId: "e-cart-new",
  storageBucket: "e-cart-new.appspot.com",
  messagingSenderId: "799532675660",
  appId: "1:799532675660:web:bb40a619aa509abd42fae9",
  measurementId: "G-4SV4B1MS8R",
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
