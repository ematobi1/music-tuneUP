#!/bin/bash

echo "âš™ï¸ Creating Firebase config file at src/firebase/config.ts..."

mkdir -p src/firebase
cat > src/firebase/config.ts <<'EOF'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// âœ… Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "music-tuneup",
  storageBucket: "music-tuneup.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
EOF

echo "âœ… Firebase config created at src/firebase/config.ts"
echo "í·  Reminder: Replace placeholder keys with real values from Firebase console."
