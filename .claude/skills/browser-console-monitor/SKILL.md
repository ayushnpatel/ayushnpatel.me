---
name: browser-console-monitor
description: Monitor and analyze browser console logs from localhost:3000 streamed to the terminal. Use when debugging frontend issues, checking for console errors, warnings, or tracking browser-side behavior. Works with Bun's console streaming feature.
allowed-tools: Bash, Grep, Read
---

# Browser Console Monitor

This skill helps analyze browser console logs that are streamed from localhost:3000 to the terminal via Bun's `console: true` feature.

## How It Works

With `console: true` enabled in src/index.tsx, all browser console logs are prefixed with `[browser]` and streamed to the terminal that runs `bun --hot src/index.tsx`.

## Instructions

### 1. Check Console Streaming Status

Verify that console streaming is enabled:

```bash
cat src/index.tsx | grep -A 2 "development:"
```

Expected output should show:
```typescript
development: {
  console: true,
  hmr: true
}
```

### 2. Monitor Live Console Logs

When the dev server is running, browser console logs appear in the terminal with `[browser]` prefix:

```
[browser] console.log: User clicked button
[browser] console.error: Failed to fetch data
[browser] console.warn: Performance warning
```

### 3. Analyze Console Errors

When debugging issues:

1. Look for `[browser]` prefixed errors in terminal output
2. Check for patterns in error messages
3. Identify stack traces and line numbers
4. Correlate browser errors with code changes

### 4. Common Console Patterns to Watch For

**Errors:**
- `[browser] console.error:` - Runtime errors
- `Uncaught` - Unhandled exceptions
- `Failed to` - Network or loading failures

**Warnings:**
- `[browser] console.warn:` - React warnings, deprecations
- `Performance` - Render performance issues

**Info:**
- `[browser] console.log:` - Debug messages
- State changes and data flow

## Examples

### Example 1: Tracking Component Renders

If you see in terminal:
```
[browser] console.log: App component rendered
[browser] console.log: BorderEffect mounted
```

This shows component lifecycle and helps debug render issues.

### Example 2: Catching Errors Early

Terminal shows:
```
[browser] console.error: TypeError: Cannot read property 'map' of undefined
    at App.tsx:42
```

Immediately identify the error location without opening browser DevTools.

### Example 3: Performance Monitoring

```
[browser] console.warn: Component re-rendered 10 times in 1 second
```

Helps identify performance bottlenecks in real-time.

## Tips

- Console logs appear immediately in terminal - no need to open browser DevTools
- Use descriptive console.log messages in your code for better debugging
- Add console.group/groupEnd for nested log organization
- Console streaming works across all browsers accessing localhost:3000
- Errors are automatically captured and displayed with stack traces

## Debugging Workflow

1. **Start dev server** with `bun --hot src/index.tsx`
2. **Open browser** to localhost:3000
3. **Monitor terminal** for `[browser]` prefixed logs
4. **Reproduce issue** in browser
5. **Analyze logs** in terminal without switching windows
6. **Fix code** and hot reload applies automatically
7. **Verify fix** by checking new console output

This creates a seamless debugging experience where you can see everything happening in the browser without leaving your terminal or Claude Code session.
