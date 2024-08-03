// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-web-app-6b382.firebaseapp.com",
  projectId: "real-estate-web-app-6b382",
  storageBucket: "real-estate-web-app-6b382.appspot.com",
  messagingSenderId: "841487207017",
  appId: "1:841487207017:web:5e566bdd49f13422a830f8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);