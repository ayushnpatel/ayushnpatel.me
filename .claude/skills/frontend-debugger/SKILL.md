---
name: frontend-debugger
description: Debug React components, styles, and interactions on localhost:3000 using browser console streaming and dev tools. Use when fixing UI bugs, investigating render issues, or debugging component behavior.
allowed-tools: Bash, Read, Grep, Edit, Glob
---

# Frontend Debugger

Debug React components and frontend issues using Bun's console streaming and code inspection.

## How It Works

With `console: true` enabled, all browser console output appears in your terminal with `[browser]` prefix. This creates a seamless debugging experience without switching between terminal and browser DevTools.

## Instructions

### 1. Add Debug Logging to Components

When investigating issues, add strategic console logs:

```typescript
// In any component
console.log('[DEBUG] Component rendered', { props, state });
console.log('[DEBUG] Effect triggered', { dependencies });
console.error('[ERROR] Something went wrong', error);
```

These appear immediately in terminal as:
```
[browser] console.log: [DEBUG] Component rendered Object { props: ..., state: ... }
```

### 2. Debug Component Lifecycle

Track component mounting and updates:

```typescript
useEffect(() => {
  console.log('[MOUNT] Component mounted');
  return () => console.log('[UNMOUNT] Component unmounted');
}, []);

useEffect(() => {
  console.log('[UPDATE] Dependency changed', { dependency });
}, [dependency]);
```

### 3. Debug Props and State

Log props and state changes:

```typescript
console.log('[PROPS]', props);
console.log('[STATE]', { currentState, previousState });
```

### 4. Debug Event Handlers

Add logging to event handlers:

```typescript
const handleClick = (e) => {
  console.log('[EVENT] Button clicked', { target: e.target, data });
  // handler logic
};
```

### 5. Debug Network Requests

Track fetch calls and responses:

```typescript
console.log('[FETCH] Starting request', { url, options });
const response = await fetch(url, options);
console.log('[FETCH] Response received', { status: response.status, data });
```

### 6. Inspect Component Structure

Use React component tree in console:

```typescript
// In component
console.dir(element); // Shows full DOM structure
console.table(arrayData); // Table format for arrays
console.group('Component Details'); // Group related logs
console.log('Props:', props);
console.log('State:', state);
console.groupEnd();
```

## Common Debugging Patterns

### Pattern 1: Component Not Rendering

**Symptoms:**
- Component doesn't appear on page
- No console logs from component

**Debug steps:**

1. Check if component is imported:
```bash
grep -r "import.*YourComponent" src/
```

2. Check if component is used in JSX:
```bash
grep -r "<YourComponent" src/
```

3. Add console.log at top of component:
```typescript
function YourComponent(props) {
  console.log('[RENDER] YourComponent', props);
  // ...
}
```

### Pattern 2: Props Not Updating

**Symptoms:**
- Component doesn't react to prop changes
- Stale data displayed

**Debug steps:**

1. Log props in useEffect:
```typescript
useEffect(() => {
  console.log('[PROPS CHANGED]', props);
}, [props]);
```

2. Check parent component:
```typescript
// In parent
console.log('[PARENT] Passing props', propsToPass);
return <Child {...propsToPass} />;
```

### Pattern 3: Infinite Re-renders

**Symptoms:**
- Terminal floods with `[browser]` logs
- Browser becomes unresponsive
- Memory usage spikes

**Debug steps:**

1. Add render counter:
```typescript
const renderCount = useRef(0);
console.log('[RENDER]', ++renderCount.current);
```

2. Check useEffect dependencies:
```typescript
useEffect(() => {
  console.log('[EFFECT] Dependencies:', { deps });
}, [deps]); // Ensure deps are stable
```

3. Look for state updates in render:
```typescript
// ❌ BAD - causes infinite loop
function Component() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // Never do this in render
}
```

### Pattern 4: Event Handler Not Firing

**Symptoms:**
- Clicking button does nothing
- No console logs from handler

**Debug steps:**

1. Verify handler is attached:
```typescript
<button onClick={(e) => {
  console.log('[CLICK] Handler called', e);
  handleClick(e);
}}>
  Click Me
</button>
```

2. Check for CSS pointer-events:
```bash
grep -r "pointer-events: none" src/
```

3. Verify button is not disabled:
```typescript
console.log('[BUTTON] Disabled state:', buttonDisabled);
```

### Pattern 5: Style Issues

**Symptoms:**
- Element not positioned correctly
- Colors or sizes wrong

**Debug steps:**

1. Log computed styles:
```typescript
const elementRef = useRef(null);
useEffect(() => {
  if (elementRef.current) {
    const styles = getComputedStyle(elementRef.current);
    console.log('[STYLES]', {
      display: styles.display,
      position: styles.position,
      width: styles.width,
    });
  }
}, []);
```

2. Check CSS classes:
```typescript
console.log('[CLASSES]', element.className);
```

3. Inspect Tailwind classes:
```bash
grep -n "className=" src/components/YourComponent.tsx
```

## Error Investigation Workflow

### 1. Identify Error Location

When you see error in terminal:
```
[browser] console.error: TypeError: Cannot read property 'x' of undefined
    at Component.tsx:42
```

Read the file at that line:
```bash
sed -n '40,45p' src/components/Component.tsx
```

### 2. Add Defensive Checks

```typescript
// Before
const value = data.nested.value;

// After
console.log('[DEBUG] Data:', data);
const value = data?.nested?.value;
if (!value) {
  console.warn('[WARN] Missing value in data', data);
}
```

### 3. Test Fix

1. Save file (hot reload applies automatically)
2. Watch terminal for new `[browser]` logs
3. Verify error is gone

## React-Specific Debugging

### Hook Dependencies

```typescript
useEffect(() => {
  console.log('[EFFECT] Running with deps:', { dep1, dep2 });
  // effect logic
}, [dep1, dep2]);
```

### State Updates

```typescript
setState((prev) => {
  console.log('[STATE] Updating from', prev, 'to', newValue);
  return newValue;
});
```

### Memo/Callback Dependencies

```typescript
const memoized = useMemo(() => {
  console.log('[MEMO] Recalculating');
  return expensiveOperation();
}, [deps]);
```

## Advanced Debugging

### Performance Issues

```typescript
console.time('expensive-operation');
const result = expensiveOperation();
console.timeEnd('expensive-operation');
// Output: expensive-operation: 234.56ms
```

### Memory Leaks

Look for unmounted component warnings:
```
[browser] console.warn: Can't perform state update on unmounted component
```

Fix with cleanup:
```typescript
useEffect(() => {
  let mounted = true;

  fetchData().then(data => {
    if (mounted) {
      console.log('[DATA] Setting state', data);
      setState(data);
    } else {
      console.log('[CLEANUP] Component unmounted, skipping update');
    }
  });

  return () => { mounted = false; };
}, []);
```

## Tips

- **Use descriptive prefixes** in console.log: `[COMPONENT_NAME]`, `[FEATURE]`, `[DEBUG]`
- **Group related logs** with console.group/groupEnd
- **Use console.table** for arrays and objects
- **Color code messages** with console.error (red), console.warn (yellow), console.log (default)
- **Remove debug logs** before committing (or use a debug flag)
- **Watch terminal continuously** - errors appear immediately without opening browser
- **Hot reload preserves state** - debug without losing context

## Integration with Browser DevTools

While console streaming is powerful, sometimes you need browser DevTools:

1. **Elements panel** - Inspect DOM structure and CSS
2. **Network panel** - Monitor API calls and timing
3. **React DevTools** - Component tree and props inspection
4. **Performance panel** - Identify rendering bottlenecks

Use console streaming for quick debugging, browser DevTools for deep investigation.
