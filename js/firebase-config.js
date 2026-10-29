/**
 * Firebase App, Google Analytics, Authentication & Cloud Firestore Realtime Sync
 * Project: grocerytracker-9ef9b
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  updateProfile 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyDsQJnaG88UWoliGvAOU5cvf9ctJrIJ4Rg",
  authDomain: "grocerytracker-9ef9b.firebaseapp.com",
  projectId: "grocerytracker-9ef9b",
  storageBucket: "grocerytracker-9ef9b.firebasestorage.app",
  messagingSenderId: "788986834823",
  appId: "1:788986834823:web:ec633464913ad15537ed22",
  measurementId: "G-YC612QM83L"
};

export let app = null;
export let analytics = null;
export let auth = null;
export let googleProvider = null;
export let db = null;

try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully for project:", firebaseConfig.projectId);

  // Initialize Analytics
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized:", firebaseConfig.measurementId);
    }
  }).catch((err) => {
    console.debug("Firebase Analytics notice:", err.message);
  });

  // Initialize Auth
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  console.log("Firebase Auth initialized.");

  // Initialize Cloud Firestore for Realtime Multi-Device Sync
  db = getFirestore(app);
  console.log("Firebase Cloud Firestore initialized.");
} catch (error) {
  console.warn("Firebase initialization skipped or offline:", error.message);
}

export { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  updateProfile,
  doc,
  setDoc,
  getDoc,
  onSnapshot
};
