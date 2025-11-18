#!/bin/bash

echo "í´§ Fixing firebase.json to remove missing firestore.indexes.json..."

FILE="firebase.json"

if [ ! -f "$FILE" ]; then
  echo "âŒ Error: firebase.json not found in this directory."
  exit 1
fi

# Backup current firebase.json
cp "$FILE" "${FILE}.bak"

# Remove the "indexes" line from the firestore block
jq 'if .firestore then .firestore |= del(.indexes) else . end' "$FILE" > tmp.firebase.json && mv tmp.firebase.json "$FILE"

echo "âœ… Cleaned up firebase.json. Removed firestore.indexes.json reference."
echo "í·ª Re-run deployment: firebase deploy --only firestore:rules"
 
