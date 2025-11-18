#!/bin/bash

echo "í» ï¸ Fixing firebase.json without jq..."

FILE="firebase.json"

if [ ! -f "$FILE" ]; then
  echo "âŒ Error: firebase.json not found in current directory."
  exit 1
fi

# Backup the original file
cp "$FILE" "${FILE}.bak"
echo "ï¿½ï¿½ Backup saved as firebase.json.bak"

# Create a cleaned version by removing "indexes" line
grep -v '"indexes":' "$FILE" > tmp.firebase.json

# Replace original
mv tmp.firebase.json "$FILE"
echo "âœ… Removed 'indexes' line from firebase.json."

echo "ï¿½ï¿½ Now run: firebase deploy --only firestore:rules"
