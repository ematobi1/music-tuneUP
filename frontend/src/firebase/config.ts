// src/firebase/config.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUdusKOmMdBCeOgDkTSCHx5ggMTh63w_0",
  authDomain: "music-tuneup.firebaseapp.com",
  projectId: "music-tuneup",
  storageBucket: "music-tuneup.firebasestorage.app",
  messagingSenderId: "672253954740",
  appId: "1:672253954740:web:408ad117ea7023fc6da5e1",
  measurementId: "G-QYXVCG9PDR"
};

// ✅ Prevent duplicate initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
