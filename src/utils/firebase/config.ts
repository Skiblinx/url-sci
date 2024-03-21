import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjwEKtF1sKHb8jz2aj9WnGWsUTvNpd4tA",
  authDomain: "scissors-app-694bb.firebaseapp.com",
  projectId: "scissors-app-694bb",
  storageBucket: "scissors-app-694bb.appspot.com",
  messagingSenderId: "647262210247",
  appId: "1:647262210247:web:f531b368599999b46696e2",
  measurementId: "G-8VZGVYCDZE"
};

// Initialize Firebase
// initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore()

