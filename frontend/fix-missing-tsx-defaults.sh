#!/bin/bash

echo "í» ï¸ Auto-injecting default exports into .tsx files missing any export..."

count=0
find ./src -type f -name "*.tsx" | while read file; do
  # Skip files with exports already
  if grep -qE 'export (default|const|function|class|interface)' "$file"; then
    echo "âœ… Already exported: $file"
  else
    echo "íº‘ Adding 'export default () => null;' to: $file"
    echo -e "\nexport default () => null;" >> "$file"
    ((count++))
  fi
done

echo "âœ… Injection complete. Total files fixed: $count"
echo "íº€ You can now run: npm run dev"
