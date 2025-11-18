#!/bin/bash

echo "âš™ï¸ Creating Firebase config file with Firestore, Storage, and Auth..."

mkdir -p src/firebase
cat > src/firebase/config.ts <<'EOF'
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "music-tuneup",
  storageBucket: "music-tuneup.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// âœ… Prevent duplicate app init
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
EOF

echo "âœ… Firebase config created at src/firebase/config.ts"
echo "í·  Now paste your actual Firebase values in the config!"
