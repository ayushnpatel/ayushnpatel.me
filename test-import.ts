// Test if plugin is registered
import BunImageTransformPlugin from "bun-image-transform";
Bun.plugin(BunImageTransformPlugin());

// Try importing an image
try {
  const img = await import("./src/assets/capital-one-icon.png?width=80&format=webp&bunimg");
  console.log("Success! Image imported:", img.default);
} catch (e) {
  console.error("Error importing image:", e.message);
}
