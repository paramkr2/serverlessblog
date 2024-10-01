// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAoH7lJPvC25PqsaWGr-aeUeaifK4Cs5ac",
  authDomain: "servelessblog.firebaseapp.com",
  projectId: "servelessblog",
  storageBucket: "servelessblog.appspot.com",
  messagingSenderId: "183500751679",
  appId: "1:183500751679:web:d6b9c7f9ca5707f391898a",
  measurementId: "G-0DHFFY9SRS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
