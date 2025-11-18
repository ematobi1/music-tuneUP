#!/bin/bash

echo "Ì¥ç Validating named exports in all .ts and .tsx files..."

# Search all .ts/.tsx files and look for common named export patterns
find ./src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read file; do
  if grep -qE 'export (interface|function|const|type|class)' "$file"; then
    echo "‚úÖ Found export in $file"
  else
    echo "‚ùå MISSING export in $file"
  fi
done

echo "‚úÖ Validation complete."
