# Bun Fullstack Best Practices

## Image Usage

**IMPORTANT: Always use `OptimizedImage` component when displaying images.**

Never use raw `<img>` tags. Import `OptimizedImage` from `./components/OptimizedImage` and use it for all images. This ensures:

- Responsive image variants (400, 800, 1200, 1600px widths)
- Modern formats (AVIF, WebP, JPEG with fallback)
- Optimized quality (85 - visually lossless)
- Stripped metadata
- Proper lazy loading and async decoding

Example:

```tsx
import { OptimizedImage } from "./components/OptimizedImage";

<OptimizedImage
  src={imageUrl}
  alt="Description"
  sizes="(max-width: 400px) 400px, 800px"
  width={800}
  height={600}
/>;
```

## Minimal Setup Philosophy

Keep it simple. Start with vanilla HTML + React + Tailwind.css, add complexity only when needed.

## Development Mode

Enable hot reloading with console streaming:

```ts
Bun.serve({
  development: {
    hmr: true,
    console: true,
  },
  routes: {
    "/*": index,
  },
});
```

Run with: `bun --hot src/index.tsx`

## Project Structure

```
├── index.html          # Entry point
├── src/
│   └── index.tsx       # Server
└── CLAUDE.md           # This file
```

Scale to:

```
├── index.html
├── src/
│   ├── index.tsx       # Server
│   ├── App.tsx         # React root
│   ├── main.tsx        # Client entry
│   └── styles.css      # Global styles
└── CLAUDE.md
```

## React Integration

When ready, add React:

```bash
bun add react react-dom
bun add -d @types/react @types/react-dom
```

```tsx
// src/main.tsx
import { createRoot } from "react-dom/client";
import { App } from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
```

```html
<!-- index.html -->
<div id="root"></div>
<script type="module" src="./src/main.tsx"></script>
```

## TailwindCSS Integration

When needed:

```bash
bun add tailwindcss bun-plugin-tailwind
```

```toml
# bunfig.toml
[serve.static]
plugins = ["bun-plugin-tailwind"]
```

```html
<!-- index.html -->
<link rel="stylesheet" href="tailwindcss" />
```

## API Routes

Add as needed:

```ts
serve({
  routes: {
    "/": index,
    "/api/users": {
      GET: () => Response.json({ users: [] }),
      POST: async (req) => {
        const data = await req.json();
        return Response.json(data, { status: 201 });
      },
    },
  },
});
```

## Production

When deploying:

```bash
bun build --target=bun --production --outdir=dist ./src/index.tsx
NODE_ENV=production bun dist/index.tsx
```

Or runtime bundling:

```ts
serve({
  development: false, // Enables caching, minification
  routes: { "/": index },
});
```

## Key Principles

1. **Start minimal** - Single HTML file + server
2. **Add incrementally** - React, Tailwind, APIs only when needed
3. **Hot reload everything** - Use `bun --hot` + `console: true`
4. **No build step in dev** - Bun bundles on-demand
5. **Production optimized** - AOT or runtime bundling

## SSR (Future Reference)

When needed for SEO/performance:

```tsx
import { renderToReadableStream } from "react-dom/server";

const stream = await renderToReadableStream(<App />);
return new Response(stream, {
  headers: { "Content-Type": "text/html" },
});
```

Requires React 19+.

## Claude Code Agent Skills

This project includes specialized Agent Skills for monitoring and debugging the dev server:

### Browser Console Monitor

Monitors browser console logs streamed to terminal via `console: true`. Use this skill to:

- Track browser-side errors and warnings in real-time
- Debug frontend issues without opening browser DevTools
- Monitor console.log output directly in terminal

### Dev Server Monitor

Monitors Bun dev server health and hot module reloading. Use this skill to:

- Check if localhost:3000 is running
- Verify HMR (hot module reloading) is working
- Troubleshoot server configuration issues

### Frontend Debugger

Comprehensive React debugging with console streaming. Use this skill to:

- Debug component lifecycle and state issues
- Investigate render problems and infinite loops
- Track props, events, and network requests

Skills are located in `.claude/skills/` and automatically available to Claude Code.
