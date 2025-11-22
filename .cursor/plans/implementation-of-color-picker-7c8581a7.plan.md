<!-- 7c8581a7-8657-4ab9-9b0c-7299a4152e38 791e4d6a-f5af-4f03-949a-498901bc6547 -->
# Color Theme System Implementation Plan

## 1. Core Logic & State Management

- **Modify `src/hooks/useTheme.ts`**:
    - Add state for `colorTheme` (types: `'green' | 'turquoise' | 'amaretto' | 'burgundy' | 'boring' | 'neo-brutalism'`).
    - default to `'green'`.
    - Persist `colorTheme` to `localStorage`.
    - Add effect to apply `data-color-theme` attribute to `document.documentElement`.
    - Return `colorTheme` and `setColorTheme` alongside existing `isDark` logic.

## 2. Styling Infrastructure (`src/styles.css`)

- **Refactor CSS Variables**:
    - Keep existing variables as the default (fallback) and for `[data-color-theme="green"]`.
    - Add new attribute selectors for each theme (e.g., `[data-color-theme="turquoise"]`).
    - Define Light and Dark mode overrides for each theme:
        - **Turquoise**: Cyan/Teal primary, Deep Ocean dark background.
        - **Amaretto**: Warm Amber/Caramel primary, Espresso dark background.
        - **Burgundy**: Rich Wine/Red primary, Dark Merlot dark background.
        - **Boring**: Monochrome grayscale, high contrast, Pure Black dark background.
        - **Neo-Brutalism**:
            - **Colors**: Violet (#A8A6FF), Pink (#FFA6F6), Lime (#B8FF9F) as primary/secondary/accent.
            - **Shadows**: Hard edges, no blur (e.g., `4px 4px 0px 0px #000`).
            - **Borders**: Thick black borders (`2px solid #000`).
            - **Typography**: Keep Space Grotesk but maybe bolder weights.
    - Ensure `background`, `primary`, `secondary`, and `accent` colors are mapped correctly for each.

## 3. New UI Component: `ColorPicker`

- **Create `src/components/ColorPicker.tsx`**:
    - Use `DropdownMenu` from `@radix-ui` (via `src/components/ui/dropdown-menu.tsx` if usable, else implement simple minimal dropdown).
    - **Trigger**: A sleek button (e.g., a palette icon or a colored dot indicating current theme).
    - **Content**: A vertical list of themes.
    - **Item Design**:
        - Left: Theme Name (font: `Space Grotesk` / `font-display`).
        - Right: Color Swatch (square box with the theme's primary color).
    - Minimal animations for opening/closing.
    - **Update Icon**:
        - For the "Neo-Brutalism" theme, the swatch icon should be split vertically into 3 colors (violet, pink, lime).

## 4. Integration

- **Update `src/components/Header.tsx`**:
    - Accept `colorTheme` and `onColorChange` props.
    - Render `ColorPicker` component to the left of `ThemeButton`.
- **Update `src/App.tsx`**:
    - Destructure new research values from `useTheme`.
    - Pass them to `Header`.
    - Ensure Neo-Brutalism styling applies correctly to global elements (borders, shadows).

## 5. Aesthetic Polish

- Ensure transitions between themes are smooth (`transition-colors duration-500` is already on `App` wrapper, ensure it applies to all changed properties).
- Verify accessibility (contrast) for "Boring" and "Burgundy" themes especially.
- **Neo-Brutalism Specifics**:
    - High contrast borders (black, thicker).
    - Sharp shadows (no blur, offset).
    - Vibrant background colors (pastel/neon mix).

### To-dos

- [ ] Update hooks/useTheme.ts to handle color themes
- [ ] Add color theme variables to styles.css
- [ ] Create ColorPicker component
- [ ] Integrate ColorPicker into Header and App