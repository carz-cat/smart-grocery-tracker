/**
 * Firebase App & Google Analytics Initialization
 * Project: grocerytracker-9ef9b
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

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

try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully for project:", firebaseConfig.projectId);

  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized:", firebaseConfig.measurementId);
    }
  }).catch((err) => {
    console.debug("Firebase Analytics not supported in this environment:", err.message);
  });
} catch (error) {
  console.warn("Firebase initialization skipped or offline:", error.message);
}
