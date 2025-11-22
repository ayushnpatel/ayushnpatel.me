import { $ } from "bun";
import { existsSync } from "fs";
import { cp, mkdir, rm } from "fs/promises";

console.log("🧹 Cleaning dist directory...");
if (existsSync("dist")) {
  await rm("dist", { recursive: true });
}
await mkdir("dist", { recursive: true });

console.log("📦 Building React app for browser...");
// Build main.tsx for browser - Bun will handle bundling React and dependencies
await $`bun build --target=browser --outdir=dist --minify --sourcemap=external ./src/main.tsx`.quiet();

// Rename the output to main.js (Bun outputs with .js extension)
if (existsSync("dist/main.js")) {
  // Already correct
} else {
  // Find the actual output file
  const files = await Array.fromAsync(new Bun.Glob("dist/*.js").scan("."));
  if (files.length > 0) {
    await $`mv ${files[0]} dist/main.js`.quiet();
  }
}

console.log("📄 Processing index.html...");
// Read and update index.html
const indexHtml = await Bun.file("index.html").text();
const updatedHtml = indexHtml
  .replace("./src/main.tsx", "./main.js")
  .replace("./src/styles.css", "./styles.css");
await Bun.write("dist/index.html", updatedHtml);

console.log("🎨 Processing CSS...");
// Build CSS - Bun will process Tailwind
await $`bun build --target=browser --outdir=dist ./src/styles.css`.quiet();

// Ensure styles.css exists (Bun might name it differently)
if (!existsSync("dist/styles.css")) {
  const cssFiles = await Array.fromAsync(new Bun.Glob("dist/*.css").scan("."));
  if (cssFiles.length > 0) {
    await $`mv ${cssFiles[0]} dist/styles.css`.quiet();
  }
}

console.log("🖼️  Copying assets...");
// Copy src/assets (images will be handled by Bun's bundler, but copy as fallback)
if (existsSync("src/assets")) {
  await mkdir("dist/assets", { recursive: true });
  await cp("src/assets", "dist/assets", { recursive: true });
}

// Copy public folder if it exists
if (existsSync("public")) {
  await cp("public", "dist/public", { recursive: true });
}

console.log("📋 Copying CNAME for GitHub Pages...");
// Copy CNAME for custom domain
if (existsSync("CNAME")) {
  await cp("CNAME", "dist/CNAME");
}

console.log("✅ Static build complete! Files are in dist/");
console.log("📤 Ready to deploy to GitHub Pages!");
