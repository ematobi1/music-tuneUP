#!/bin/bash

echo "í³¦ Creating src/firebase/firestore.ts with db export..."
mkdir -p src/firebase
cat > src/firebase/firestore.ts <<EOF
import { getFirestore } from "firebase/firestore";
import { app } from "./init";

export const db = getFirestore(app);
EOF

echo "í³ Creating firebase.json..."
cat > firebase.json <<EOF
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "storage": {
    "rules": "storage.rules"
  },
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "functions": {
    "source": "functions"
  }
}
EOF

echo "âš™ï¸ Creating .firebaserc..."
cat > .firebaserc <<EOF
{
  "projects": {
    "default": "music-tuneup"
  }
}
EOF

echo "âœ… Firebase setup files created!"
