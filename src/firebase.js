// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4QuHLEqrpxp_966vsKc57-Nch4YGd3mI",
  authDomain: "sport-center-app.firebaseapp.com",
  projectId: "sport-center-app",
  storageBucket: "sport-center-app.appspot.com",
  messagingSenderId: "433023385079",
  appId: "1:433023385079:web:4c9cff8609e1c42e1cc2f2",
  measurementId: "G-HLN8T4BTQH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
