# Pixelfic UI Kit: developer handoff

> **Version 0.4.0** · 2026-10-07 · Applies to every Pixelfic Framer plugin (Calfic, Crestbar, BEAF, Formfic, Socialfic, and new ones)
> **Design source of truth:** Figma file `N7pg94Ht36iCcqt37tyyJZ`, page **🎨 DS**
> **Code source of truth:** this folder (`@pixelfic/ui`)

---

## 1. What's in this package

| File | What it is | Who uses it |
|---|---|---|
| `css/tokens.css` | All design tokens as CSS variables (`--px-*`): palette, light/dark theme, brand modes, sizes, type, shadows | Every plugin. Load first. |
| `react/kit.css` | Component styles (buttons, inputs, cards, tabs, sheets, banners, badges…) | Plugins using the React components |
| `css/base.css` | Framer's `framer.css` in a low-priority `framer` layer. Import it instead of framer.css | Every plugin |
| `react/kit.tsx`, `react/icons.tsx` | React components and the 16px icon set | React plugins |
| `react/illustrations.tsx` | Animated illustrations (`ProIllustration`, `TrashIllustration`) | React plugins |
| `tokens/tokens.json` | The same tokens in W3C Design Tokens (DTCG) format | Other stacks, Style Dictionary, Tokens Studio |
| `tokens/tokens.ts` | Typed token references (`tokens.color["text/brand"]` → `var(--px-color-text-brand)`) | TS code that needs tokens in JS |
| `css/framer-fallback.css` | Values for Framer's own `--framer-color-*` variables | **Only** Storybook, docs or tests outside Framer |
| `tokens/figma-export.json` | Raw export from Figma: the single source for all files above | Regenerating outputs |
| `CHANGELOG.md` | What changed in each version | Everyone |

## 2. Install in a plugin

Copy the folder into the plugin repo (or use it as a git submodule or workspace package), then:

```ts
// main.tsx — order matters
import "@pixelfic/ui/base.css"             // Framer's base styles, in a low-priority layer (REQUIRED, see §3)
import "@pixelfic/ui/tokens.css"           // Pixelfic tokens
import "@pixelfic/ui/kit.css"              // Pixelfic components
import "./app.css"                         // plugin-specific styles only
```

```tsx
import { Button, Badge, Banner, Field, TextInput, Sheet, Icon } from "@pixelfic/ui"

<Button variant="primary" size="md" icon="plus">Insert on canvas</Button>
```

**Brand mode:** Pixelfic indigo is the default. A plugin with its own brand sets `data-px-brand` on `<html>`:

```html
<html data-px-brand="calfic">
```

To add a brand, add a mode to the **Brand** collection in Figma, re-export, and rebuild (§5).

## 3. Rules every app must follow

1. **Never hard-code colours, radii, spacing or shadows.** Use `var(--px-…)`. If a token is missing, add it in Figma first (§5).
2. **Don't redefine `--framer-color-*` inside a plugin.** Framer injects them for light and dark mode. Use the `--px-color-*` aliases. They point at Framer's value and fall back to ours.
3. **Light and dark:** Framer sets `data-framer-theme` on `<body>`, and tokens switch automatically. Test both before shipping (a Framer review requirement).
4. **One Primary button per view.** Secondary, Ghost and Danger for everything else.
5. **Never import `framer-plugin/framer.css` directly.** It gives every `<button>` and `<input>` a fixed 30px height, 100%/134px width and a grey background, which breaks kit layouts. Import `@pixelfic/ui/base.css`: it layers framer.css below the kit, and `kit.css` resets those defaults.
6. **Only change kit code here, never in a single app.** Fix it in Figma and this package, bump the version, then update the apps (§6).

## 4. Token reference

### Colour (semantic: use these)

| Token (Figma) | CSS variable | Light | Dark | Use |
|---|---|---|---|---|
| bg/default | `--px-color-bg` | #FFFFFF | #101010 | Panel background (Framer) |
| bg/secondary | `--px-color-bg-secondary` | #F5F5F5 | #181818 | Header, hover |
| bg/tertiary | `--px-color-bg-tertiary` | #EDEDED | #202020 | Inputs, secondary buttons |
| bg/raised | `--px-color-bg-raised` | #FFFFFF | #18191B | Cards, tiles, toasts |
| bg/selected | `--px-color-bg-selected` | #FFFFFF | #2A2A2A | Selected segment (never reuse bg/raised for selection) |
| text/primary | `--px-color-text` | #1B1F22 | #FFFFFF | Main text |
| text/secondary | `--px-color-text-secondary` | #5C6670 | #CBCBCB | Descriptions |
| text/tertiary | `--px-color-text-tertiary` | #8A939C | #777777 | Hints. Not for essential text |
| text/brand | `--px-color-text-brand` | #4761DB | #8FA3FF | Links, brand text |
| border/divider | `--px-color-divider` | black 5% | white 4% | Hairlines, card borders |
| border/highlight | `--px-color-border-highlight` | white 100% | white 3% | Lit top edge on cards (inside shadows) |
| border/selected | `--px-color-border-selected` | black 5% | white 6% | Selected segment edge |
| control/track | `--px-color-control-track` | black 8% | white 12% | Empty part of a slider |
| focus/ring | `--px-color-focus-ring` | #5271FF | #5271FF | Focus outline |
| status/* | `--px-color-success · warning · danger · info` (+ `-subtle`) | | | Messages. Info uses the brand scale (#4761DB / #8FA3FF) |
| pro/* | `--px-color-pro-bg · pro-text · pro-border` | violet | violet | PRO badge only |
| brand/* | `--px-brand-primary (#5271FF) · primary-hover (#4761DB) · primary-pressed (#3B51B8) · action · gradient-start/end · subtle · tint · on-primary` | per brand mode | | Accent, Primary button |
| ai/* | `--px-ai-blue (#5271FF) · ai-violet (#A26BFF) · ai-pink (#FF6FB5) · ai-cyan (#4FD6FF)` | | | AI surfaces only (`.ai-field` border) |

### Size

| Group | Variables |
|---|---|
| Space | `--px-space-2 · 4 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 32` |
| Radius | `--px-radius-4 · 6 · 8 · 10 · 12 · 14 · 16 · 20 · full`. Buttons 8/10, inputs 8, cards 14, panels and hero 16–20 |
| Controls | `--px-control-height-sm` 30 · `-md` 36 |
| Icons | `--px-icon-12 · 16 · 20 · 24` |
| Panel | default 360 × 640, min 300 × 480, split layout from 600, max 900 |

### Type (Inter; mono = JetBrains Mono)

Use them as `font: var(--px-text-body-default); letter-spacing: var(--px-text-body-default-tracking);`

| Style | Variable | Spec |
|---|---|---|
| Title/Large | `--px-text-title-large` | 600 20/26, −2% |
| Title/Medium | `--px-text-title-medium` | 600 15/22, −1% |
| Title/Small | `--px-text-title-small` | 600 14/20, −0.5% |
| Body/Large | `--px-text-body-large` | 400 14/21 |
| Body/Default | `--px-text-body-default` | 500 12/18 (Framer base) |
| Body/Strong | `--px-text-body-strong` | 600 12/18 (buttons, labels) |
| Body/Small (+ Strong) | `--px-text-body-small(-strong)` | 400/600 11/16 |
| Mono/Default | `--px-text-mono-default` | 400 12/18 |

### Shadows

| Variable | Value | Use |
|---|---|---|
| `--px-shadow-card` | 0/1/1 + 0/4/12/−6 (2% / 6%) + 1px lit top edge | Cards, tiles |
| `--px-shadow-popover` | 0/1/3 + 0/10/28/−10 (5% / 18%) + lit edge | Menus, sheets |
| `--px-shadow-primary` | 0/2/6/−2 indigo 14% + inner highlight | Primary button |
| `--px-focus-halo` | 3px indigo 20% | Focused inputs |

## 5. Components

| Component | React | Variants / props | Figma |
|---|---|---|---|
| Button | `<Button variant size icon iconRight full loading>` | primary · secondary · ghost · danger; sm 30 · md 36 | Actions → Button (32 variants) |
| Icon button | `<IconButton icon label size boxed>` | 30 / 24 | Actions → Icon button |
| Badge | `<Badge kind>` / `<ProBadge/>` (hidden when `ProContext` is true) | neutral · pro (purple) · brand · success · warning · danger · `.badge.sale` (green "25% off") | Content → Badge |
| Field + inputs | `<Field>`, `<TextInput>`, `<NumberInput>`, `<Select>`, `<Switch>`, `<Segmented>` | 30px, radius 8 · Segmented selected = `bg/selected` | Inputs |
| Slider | `<Slider label min max step unit value onChange>` | brand fill, white handle, editable value box | Inputs → Slider |
| Setting row | `<Setting title hint pro>` | | Components / Calfic → Setting row |
| Banner | `<Banner kind title actions art className>` | info · success · warning · danger · `art` = illustration instead of icon · `className="pop-in"` | Feedback → Banner |
| Help card | `.help-card` + an illustration | illustration · title · one line · link | Feedback → Help card |
| Illustrations | `<ProIllustration/>`, `<TrashIllustration/>` | inline SVG, theme tokens, animated (off for reduced motion) | Feedback → Illustrations |
| Empty state | `<EmptyState icon title action>` | | Feedback → Empty state |
| Sheet | `<Sheet title onClose footer>` | bottom sheet with Esc, scrim, focus trap and focus restore | Components / Calfic → Sheet header |
| Popover menu | `<Popover anchor>` + `<MenuItem icon label sub pro>` | | Components / Calfic → Menu item |
| Skeleton | `<Skeleton h w>` | | Components / Calfic → Skeleton block |
| Icons | `<Icon name size>` | 16px stroke, `currentColor` (`more` / `grip` are filled dots; `crown` for Pro CTAs) | Icon set · 16px |
| Hooks | `useScrollReveal()` (call once at root), `onTabKeys` (tablist `onKeyDown`), `useIsPro()` | | — |
| CSS-only | `.card`, `.hero`, `.help-tile`, `.plugin-card`, `.tabs`, `.footer`, `.chip`, `.list-row`, `.ai-field`, `.pricing`, `.kbd-table`, `.row.equal`, `.scroll-area` | clickable cards (`button.card` / `a.card`) lift on hover | Content, Navigation, Home tab |

**Pixelfic shell (every plugin):** tabs **Home | <work tab>** plus account icon · Home = Hero card + Help (Guide, Contact us, Changelog) + More from Pixelfic (siblings only) · footer "@Framefic ↗" + version (shown on list views only).

**Spacing rhythm:** 12px inside a section, 32px between sections. **Motion:** `--px-ease` (0.18s) for hovers, `--px-spring` for friendly pops. Everything animated stops for reduced motion. Use Framer's native header and `framer.setMenu` for the header menu.

## 6. Keeping every app in sync

```
Designer changes Figma (🎨 DS)
   └─ ds-sync agent proposes doc updates → designer approves
Developer
   1. Export tokens from Figma → tokens/figma-export.json
   2. node scripts/build-tokens.mjs        (regenerates css/, tokens.json, tokens.ts)
   3. Update react/ if a component changed
   4. Bump version in package.json + CHANGELOG.md (same number as the Figma changelog)
   5. Each app: update @pixelfic/ui, check light + dark, ship
```

**Versioning:** patch (0.3.x) for value tweaks, minor (0.x.0) for new tokens or components, major for renames or removals. Never rename a token without a deprecation note in the changelog.

**Export from Figma:** `tokens/figma-export.json` is produced by a read-only script run through the Figma MCP (`use_figma`). It lists every variable, mode and alias, plus text and effect styles. Ask Claude Code to "re-export Pixelfic tokens" to refresh it. A Tokens Studio sync is the long-term option (see suggestions).

## 7. Accessibility baseline (already met by the kit)
- Text contrast AA in both themes. Primary button label 5.28:1. Don't put `text/tertiary` on essential text.
- Focus is visible on every control (`--px-focus-halo` or the button focus ring).
- Hit targets of at least 30px (Framer default) and 36px for main actions.
- Respect `prefers-reduced-motion` (kit.css already does).

## 8. Known caveats
- `--framer-color-*` values come from Framer at runtime, so plugins can differ slightly from Figma (open item: verify Light-mode neutrals and tint-dark/extra-dark against live Framer).
- `react/kit.css` still contains a few Calfic-specific helpers (e.g. `.template-grid`, `.hero`, `[data-calfic]` rules). They're harmless for other apps. Moving them out is still an open item (planned for 0.4, not done in 0.4.0).
