// config.js
const { initializeApp } = require("firebase/app");
const { getFirestore, collection } = require("firebase/firestore/lite");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1Zk6kRjzCR5USRANOZozaW36wPV816Pk",
  authDomain: "profolo-846f7.firebaseapp.com",
  projectId: "profolo-846f7",
  storageBucket: "profolo-846f7.appspot.com",
  messagingSenderId: "242789930782",
  appId: "1:242789930782:web:2dc7f979ddadb19e411b0f",
  measurementId: "G-NXZHJBECTV",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Get a reference to the "Posts" collection
const Post = collection(db, "Posts");

// Export the Post collection reference
module.exports = { Post };
