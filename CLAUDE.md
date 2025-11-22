# Bun Fullstack Best Practices

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
