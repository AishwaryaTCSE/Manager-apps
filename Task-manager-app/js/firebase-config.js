// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmw-yRO2WrB9eZ-Ijfzmd8UEEEM6IYj7Q",
  authDomain: "task-manager-app-60731.firebaseapp.com",
  databaseURL: "https://task-manager-app-60731-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "task-manager-app-60731",
  storageBucket: "task-manager-app-60731.appspot.com",
  messagingSenderId: "509961538556",
  appId: "1:509961538556:web:e54032b17a42e975948079",
  measurementId: "G-2DHS85JGN2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
