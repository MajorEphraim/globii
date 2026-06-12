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
  apiKey: "AIzaSyBJDRft0ou_uSzbKLTIDlE7zygkxdxc2z0",
  authDomain: "globii-app1.firebaseapp.com",
  projectId: "globii-app1",
  storageBucket: "globii-app1.firebasestorage.app",
  messagingSenderId: "1029631097434",
  appId: "1:1029631097434:web:55f1da253e49c69b88b663",
  measurementId: "G-W74PLYRVV2"
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