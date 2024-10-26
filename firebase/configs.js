// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection, onSnapshot,
  query, where,getDocs, getDoc,addDoc,deleteDoc,
  updateDoc,setDoc,doc,increment, initializeFirestore, Timestamp, orderBy
  } from "firebase/firestore";
import { getAuth, onAuthStateChanged,createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,sendEmailVerification,updateProfile, 
  signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFunctions, httpsCallable } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEA3oUAfIQVBElZqwEpeXcCtYw3yZc7pE",
  authDomain: "picpica-309f4.firebaseapp.com",
  projectId: "picpica-309f4",
  storageBucket: "picpica-309f4.appspot.com",
  messagingSenderId: "735319738154",
  appId: "1:735319738154:web:dc2f831e809c5a1264c053",
  measurementId: "G-MKZZN1CJC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
const functions = getFunctions(app);
const db = getFirestore(app);

export { auth,createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, onAuthStateChanged,
  updateProfile,sendEmailVerification,signOut, db, collection,doc, getDocs,
  getDoc, addDoc, setDoc, storage,ref, uploadBytes, getDownloadURL,functions,
  updateDoc, query, where, onSnapshot, increment, deleteDoc, Timestamp, orderBy, httpsCallable }