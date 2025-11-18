#!/bin/bash

echo "í³¦ Fixing src/types/TrackMetadata.ts..."

cat > src/types/TrackMetadata.ts <<'EOF'
export interface TrackMetadata {
  id: string;
  title: string;
  artist: string;
  bpm?: number;
  key?: string;
  beatGrid?: number[];
}
EOF

echo "âœ… Fixed: src/types/TrackMetadata.ts now exports 'TrackMetadata'."
