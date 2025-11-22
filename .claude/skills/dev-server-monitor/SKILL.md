---
name: dev-server-monitor
description: Monitor Bun dev server status, hot module reloading, and localhost:3000 health. Use when checking if the dev server is running, troubleshooting hot reload issues, or verifying server configuration.
allowed-tools: Bash, Grep, Read
---

# Dev Server Monitor

Monitor and manage the Bun dev server running at localhost:3000 with hot module reloading and console streaming.

## Server Configuration

The dev server is configured in `src/index.tsx` with:

```typescript
serve({
  development: {
    console: true,  // Streams browser console to terminal
    hmr: true       // Hot module reloading
  },
  routes: {
    "/*": index
  }
})
```

## Instructions

### 1. Check if Server is Running

```bash
lsof -ti:3000
```

If output shows a PID, server is running. If empty, server is not running.

### 2. View Server Status

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```

- `200` = Server healthy
- `000` or error = Server not responding

### 3. Start Dev Server

If server is not running:

```bash
bun --hot src/index.tsx
```

Expected output:
```
🚀 Server running at http://localhost:3000/
→ http://localhost:3000/
```

### 4. Monitor Hot Reload Status

When files change, look for terminal output:
```
[hot] Reloading...
[hot] Reload complete
```

Or for errors:
```
[hot] Reload failed: [error details]
```

### 5. Check Server Configuration

Verify development settings:

```bash
cat src/index.tsx | grep -A 5 "development:"
```

Should show:
- `console: true` - Browser console streaming enabled
- `hmr: true` - Hot module reloading enabled

### 6. Test Hot Reload

To verify hot reload is working:

1. Make a small change to any file in `src/`
2. Watch terminal for `[hot]` messages
3. Browser should auto-refresh without manual reload

## Common Issues

### Port 3000 Already in Use

```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)

# Restart server
bun --hot src/index.tsx
```

### Hot Reload Not Working

Check if `hmr: true` is enabled:

```bash
grep -n "hmr" src/index.tsx
```

### Console Logs Not Appearing

Check if `console: true` is enabled:

```bash
grep -n "console: true" src/index.tsx
```

## Server Health Checks

### Quick Health Check

```bash
curl -s http://localhost:3000 | head -n 5
```

Should return HTML if server is healthy.

### Detailed Status Check

```bash
echo "Server Status:" && \
curl -s -o /dev/null -w "HTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" http://localhost:3000
```

## Server Lifecycle

### Starting Server

```bash
bun --hot src/index.tsx
```

Features enabled:
- ✅ Hot module reloading
- ✅ Browser console streaming
- ✅ On-demand bundling
- ✅ TypeScript/JSX support

### Stopping Server

In the terminal running the server:
- Press `Ctrl+C` to stop

Or from another terminal:
```bash
kill $(lsof -ti:3000)
```

### Restarting Server

```bash
# Stop existing server
kill $(lsof -ti:3000)

# Start fresh
bun --hot src/index.tsx
```

## Development Workflow

1. **Start server** - `bun --hot src/index.tsx`
2. **Open browser** - Navigate to localhost:3000
3. **Edit code** - Changes auto-reload via HMR
4. **Monitor logs** - Browser console streams to terminal
5. **Debug** - See errors immediately in terminal

## Performance Monitoring

### Check Server Response Time

```bash
curl -w "@-" -o /dev/null -s http://localhost:3000 <<'EOF'
Response Time: %{time_total}s
EOF
```

### Monitor Memory Usage

```bash
ps aux | grep "bun" | grep "index.tsx"
```

Shows CPU and memory usage of the dev server.

## Tips

- Keep terminal visible to see hot reload confirmations
- Server automatically bundles files on-demand - no build step needed
- Browser console logs appear with `[browser]` prefix
- HMR preserves React state when possible
- Use `bun --hot` flag for automatic restart on crashes
