#!/bin/bash

echo "âš™ï¸ Creating Firebase config file at src/firebase/config.ts..."

mkdir -p src/firebase
cat > src/firebase/config.ts <<'EOF'
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "music-tuneup",
  storageBucket: "music-tuneup.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
EOF

echo "âœ… Firebase config created at src/firebase/config.ts"
echo "í·  Donâ€™t forget to replace the placeholder values with your real Firebase config!"
