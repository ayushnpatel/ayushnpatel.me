import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Hide the initial loading overlay once React has mounted
requestAnimationFrame(() => {
  const overlay = document.getElementById("initial-loading-overlay");
  if (overlay) {
    overlay.classList.add("hidden");
    // Remove from DOM after transition completes
    setTimeout(() => {
      overlay.remove();
    }, 400);
  }
});
