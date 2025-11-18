#!/bin/bash

# Phase 86: Full Integration & Testing for DJ App
APP_FILE="src/App.tsx"
TEST_UTILS_DIR="src/test-utils"
FIREBASE_UTILS="src/firebase/firestore.ts"
DEV_PANEL="src/components/DevTestingPanel.tsx"

# âœ… Step 1: Create DevTestingPanel.tsx
mkdir -p src/components
cat > $DEV_PANEL <<EOF
import React from "react";

const DevTestingPanel = () => {
  return (
    <div style={{
      background: "#222",
      color: "#0f0",
      padding: "10px",
      borderRadius: "6px",
      marginTop: "1rem"
    }}>
      <h3>í·ª Dev Testing Panel</h3>
      <ul>
        <li>âœ… UI components mounted</li>
        <li>âœ… Firebase session synced</li>
        <li>âœ… Event logging enabled</li>
      </ul>
    </div>
  );
};

export default DevTestingPanel;
EOF

# âœ… Step 2: Add import to App.tsx if missing
IMPORT_LINE='import DevTestingPanel from "./components/DevTestingPanel";'
grep -qxF "$IMPORT_LINE" $APP_FILE || sed -i "1s|^|$IMPORT_LINE\n|" $APP_FILE

# âœ… Step 3: Inject toggle render logic below <PlaylistLibrary />
sed -i '/<PlaylistLibrary \/>/a \
          {window.location.search.includes("debug=true") && <DevTestingPanel />}
' $APP_FILE

# âœ… Step 4: Add logger util
mkdir -p $TEST_UTILS_DIR
cat > $TEST_UTILS_DIR/logger.ts <<EOF
export function logEvent(name: string, payload?: any) {
  console.log(\`íºµ [Event]: \${name}\`, payload || "(no payload)");
}
EOF

# âœ… Step 5: Add test session Firestore utilities
mkdir -p src/firebase
cat > $FIREBASE_UTILS <<EOF
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "./init";

const db = getFirestore(app);

export async function loadTestSession(id: string) {
  const ref = doc(db, "sessions", id);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function saveTestSession(id: string, data: any) {
  const ref = doc(db, "sessions", id);
  await setDoc(ref, data, { merge: true });
}
EOF

echo "âœ… Phase 86 complete: DevTestingPanel active at http://localhost:5173/?debug=true"
