---
argument-hint: [theme-name] [kind(normal|extra)] [notes...]
description: Add a new color theme (and optional extra styling) to this portfolio site.
---

You are helping maintain this project's theming system. Add a new theme based on the existing ones.

## Context

- App shell and vignette usage: @src/App.tsx, @src/components/Vignette.tsx
- Theme state and persistence: @src/hooks/useTheme.ts
- Theme selection UI: @src/components/ColorPicker.tsx, @src/components/ThemeButton.tsx
- Global tokens and per-theme CSS (including neo-brutalism extras): @src/styles.css

The theming architecture works as follows:

- **Theme identity** is the `ColorTheme` union in `useTheme.ts` and the `data-color-theme="<value>"` attribute on `document.documentElement`.
- **Dark vs light mode** is controlled by the `dark` class on `document.documentElement`.
- **Per-theme colors** are expressed as CSS custom properties and per-theme overrides under `[data-color-theme="..."]` and `[data-color-theme="..."].dark` in `styles.css`.
- **The vignette** reads `--vignette-color-1` through `--vignette-color-6` and adjusts intensity based on `colorTheme` and `isDark`.
- **The UI** exposes themes through `ColorThemeList` in `ColorPicker.tsx` and uses `ThemeButton.tsx` for dark/light toggling.

## Inputs

- **Theme name**: `$1`
  - This is the canonical theme ID and should be used:
    - As a new `ColorTheme` union member in `useTheme.ts`
    - As the `value` in `ColorThemeList`
    - As the selector `[data-color-theme="$1"]` in `styles.css`
- **Theme kind**: `$2`
  - `"normal"`: behaves like `green`, `amaretto`, etc. (primarily color tokens and vignette colors)
  - `"extra"`: behaves more like `neo-brutalism` (can introduce global layout/texture/border/typography treatments)
- **Design notes**: remaining arguments in `$ARGUMENTS` (e.g., desired mood, primary hue, references)

If `$2` is missing, assume `"normal"` unless the description explicitly calls for a more radical, layout-changing theme.

## High-level goals

Create a new theme that:

- Feels cohesive and intentional, not just a hue swap.
- Preserves usability, readability, and contrast in both light and dark modes.
- Integrates cleanly with the existing motion/vignette system and Tailwind classes.
- Does **not** regress or alter the semantics of existing themes.

## Implementation steps

1. **Understand the design intent**

   - Parse `$ARGUMENTS` to infer:
     - Primary hue, saturation, and lightness.
     - Overall mood (e.g., calm, energetic, editorial, retro).
     - Whether it should lean toward a “normal” token-only theme or an “extra” stylized theme.
   - Skim existing themes in @src/styles.css:
     - For “normal” themes, mirror the structure of `green`, `amaretto`, etc.
     - For “extra” themes, study the `neo-brutalism` sections, including:
       - Background gradients and textures on `html`/`body`/`.bg-background`
       - Stronger borders/shadows and font treatment overrides.

2. **Extend the `ColorTheme` type and persistence**

   - In @src/hooks/useTheme.ts:
     - Add `$1` as a new member of the `ColorTheme` union.
     - Ensure the list of acceptable themes used to validate `localStorage` values includes `$1`.
   - Keep the default theme behavior the same unless the intent is to make `$1` the new default; if so, adjust the initial `colorTheme` state and comments accordingly.

3. **Expose the new theme in the UI**

   - In @src/components/ColorPicker.tsx:
     - Add a new entry to `ColorThemeList`:
       - `value: "$1"` (must exactly match the union and `data-color-theme` value)
       - `label`: a human-readable, nicely formatted name (e.g., “$1” in title case or a friendlier label based on notes).
       - `color`: a representative OKLCH or hex color that matches the primary accent (for single-color preview).
       - Optionally, `colors: [...]` if the theme is multi-accent and should show stripes like `neo-brutalism`.
   - Verify that `ThemeButton` does not require changes for the new theme; it should work automatically since it uses `ColorTheme` and `ColorThemeList`.

4. **Define per-theme tokens and vignette colors**

   - In @src/styles.css, under “Color Theme Definitions”:

     - Add a new block:

       - `[data-color-theme="$1"] { ... }` for light mode:
         - Define `--color-primary-500/600/700` using OKLCH or hex values appropriate to the design.
         - Set `--color-background` using `color-mix` in OKLCH or similar, mirroring existing patterns.
         - Choose `--vignette-color-1` through `--vignette-color-6` to create a compelling gradient palette.
       - `[data-color-theme="$1"].dark { ... }` for dark mode overrides:
         - Set a darker `--color-background` and adjust `--vignette-color-*` for better glow and contrast, following the patterns of other `.dark` blocks.

   - Ensure the vignette colors work well with the `Vignette` shader:
     - Colors should be harmonious and not overly saturated in light mode.
     - In dark mode, they can be a bit more vivid but still readable behind text.

5. **(For “extra” themes) Add structural and texture styling**

   - If `$2` is `"extra"` (or the notes clearly suggest a layout/styling overhaul):
     - Model the approach on the `neo-brutalism` sections in @src/styles.css:
       - Background gradients and textures:
         - For light mode: background on `[data-color-theme="$1"] body, html`.
         - For dark mode: background on `[data-color-theme="$1"].dark body, html, .bg-background`.
         - Add suitable grain/texture overlays with `::before`.
       - Component styling:
         - Consider theme-scoped overrides for borders, shadows, and card surfaces under `[data-color-theme="$1"] ...` similar to the neo-brutalism overrides.
       - Typography:
         - **Be conservative.** If you adjust fonts/weights/letter-spacing, keep readability high and consider scoping changes more narrowly than the current global overrides where appropriate.
     - Keep these “extra” customizations **scoped** to `[data-color-theme="$1"]` so other themes remain unchanged.

6. **Consider vignette intensity and behavior**

   - In @src/components/Vignette.tsx:
     - Review how `intensity` is derived:
       - Currently, “neo-brutalism” uses a higher default intensity than other themes.
     - Decide whether `$1` should:
       - Use the standard intensity path (like other normal themes), or
       - Be treated like `neo-brutalism` with a higher vignette intensity.
     - If needed, adjust the intensity logic to give `$1` a custom default without hard-coding overly theme-specific behavior.

7. **Quality and accessibility checks**

   - Ensure:
     - Text/background contrast meets accessibility guidelines in both light and dark modes.
     - Interactive states (`hover`, `active`, focus) remain noticeable and consistent with the overall aesthetic.
     - Motion remains subtle and does not introduce jitter or readability issues.
   - Keep theme-specific quirks tasteful; this is a personal/professional site.

8. **Explain the new theme**
   - Add or update comments in @src/styles.css (and, if appropriate, in `useTheme.ts`) that briefly describe:
     - The intent of `$1` (e.g., “calm forest theme”, “high-contrast editorial theme”).
     - Any special considerations (e.g., why certain vignette colors or gradients were chosen).

## Output

When you are done:

- Summarize the new theme:
  - Name and kind (`normal` vs `extra`).
  - Primary and secondary hues.
  - How it differs from existing themes, especially neo-brutalism.
- Call out any tradeoffs or limitations (e.g., borderline contrast in certain edge cases) and suggest future refinements if needed.
