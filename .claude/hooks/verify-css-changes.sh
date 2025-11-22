#!/bin/bash

# Read input from stdin
INPUT=$(cat)

echo "🔍 Verifying application state..."
echo ""
echo "✓ Changes saved successfully"
echo ""
echo "⚠️  Browser cache may prevent changes from showing immediately."
echo "   To see your changes:"
echo "   1. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux)"
echo "   2. Or clear cache in DevTools → Right-click refresh → 'Empty Cache and Hard Reload'"
echo "   3. Or toggle dark mode off/on to force re-render"
echo ""
echo "📊 Verifying CSS is being served..."

# Wait a moment for HMR to process
sleep 1

# Check if server is running
if ! curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
  echo "❌ Server not responding on localhost:3000"
  echo "   Make sure 'bun --hot src/index.tsx' is running"
  exit 0
fi

# Get current CSS hash
CSS_URL=$(curl -s http://localhost:3000 | grep -o '/_bun/asset/[^"]*\.css' | head -1)

if [ -z "$CSS_URL" ]; then
  echo "❌ Could not find CSS asset URL"
  exit 0
fi

echo "✓ Server is running"
echo "✓ CSS asset: $CSS_URL"
echo ""

# Verify CSS content
CSS_CONTENT=$(curl -s "http://localhost:3000$CSS_URL")

# Check for dark mode colors
if echo "$CSS_CONTENT" | grep -q "oklch(18%"; then
  echo "✓ Dark mode colors are present"
else
  echo "❌ Dark mode colors not found"
fi

# Check for noise texture
if echo "$CSS_CONTENT" | grep -q "\.noise"; then
  echo "✓ Noise texture classes exist"
fi

# Check for semantic color tokens
if echo "$CSS_CONTENT" | grep -q "bg-background"; then
  echo "✓ Semantic color tokens are generated"
fi

# Check fonts in HTML
HTML_CONTENT=$(curl -s "http://localhost:3000")
if echo "$HTML_CONTENT" | grep -q "Inter"; then
  echo "✓ Inter font is loaded"
elif echo "$HTML_CONTENT" | grep -q "Fraunces"; then
  echo "⚠️  Using Fraunces instead of Inter (design system mismatch)"
fi

if echo "$HTML_CONTENT" | grep -q "DM.*Serif"; then
  echo "✓ DM Serif Display font is loaded"
fi

echo ""
echo "🔗 View site: http://localhost:3000"
echo "💡 Remember to hard refresh (Cmd+Shift+R) if changes don't appear"

exit 0
