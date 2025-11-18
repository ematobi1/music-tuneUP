#!/bin/bash

echo "í»   Let's set up your Firebase config automatically."

read -p "í´‘ Enter your Firebase apiKey: " API_KEY
read -p "í¼ Enter your authDomain (e.g. your-app.firebaseapp.com): " AUTH_DOMAIN
read -p "í¶” Enter your projectId: " PROJECT_ID
read -p "í³¦ Enter your storageBucket: " STORAGE_BUCKET
read -p "í³¨ Enter your messagingSenderId: " MESSAGING_SENDER_ID
read -p "í·¬ Enter your appId: " APP_ID

mkdir -p src/firebase

cat > src/firebase/init.ts <<EOF
// Auto-generated Firebase Initialization
import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "${API_KEY}",
  authDomain: "${AUTH_DOMAIN}",
  projectId: "${PROJECT_ID}",
  storageBucket: "${STORAGE_BUCKET}",
  messagingSenderId: "${MESSAGING_SENDER_ID}",
  appId: "${APP_ID}"
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
EOF

echo "âœ… Firebase init.ts created at src/firebase/init.ts"
