# Changelog

Versions match the Figma kit (Calfic working file → 🎨 DS → Actions doc frame changelog).

## 0.4.0 · 2026-10-07
**Dark theme matches what Framer really renders** (measured live):
- **Panel and text:** `bg/default` #101010, `bg/secondary` #181818, `bg/tertiary` #202020. `text/primary` #FFFFFF, `text/secondary` #CBCBCB, `text/tertiary` #777777. These were previously blue-grey assumptions.
- **Cards and edges:** cards (`bg/raised`) are #18191B. Card borders (`border/divider`) are white 4%, and the top highlight (`border/highlight`) is white 3%.
- **Removed:** `neutral/50 · 500 · 600 · 900` (unused). `neutral/800` is now #2A2A2A.

**New tokens**
- `bg/selected` + `border/selected`: the selected segment is lighter than its track in both themes (WCAG 1.4.11). Never reuse `bg/raised` for selection.
- `control/track`: the empty part of a slider (black 8% / white 12%).
- `ai/blue · violet · pink · cyan`: the AI palette, only for AI surfaces.
- `status/info*` and `focus/ring` now use the brand scale (#4761DB / #8FA3FF, focus #5271FF).

**Components** (`react/kit.tsx`, identical to Calfic's)
- **Button:** stable icon and label wrappers (`.btn-ico` / `.btn-label`). Fixes a crash when extensions (Grammarly, translate) rewrite button text. Primary hover now fades: the gradient sits on `::before`.
- **Banner:** an `art` prop (an illustration instead of the icon) and `className`. Use `.pop-in` for an entrance.
- **Slider (new):** brand fill, white handle, editable value box.
- **Segmented:** labels are 500, or 600 when selected. The selected segment uses `bg/selected`.
- **Also added:** `ProContext` / `useIsPro` / `ProBadge` (hidden for Pro users), `onTabKeys` (arrow keys for tabs), a Sheet focus trap with focus restore, a fix for a Popover re-position loop, and `useScrollReveal()`.
- `react/illustrations.tsx`: `ProIllustration` (Pro gate) and `TrashIllustration` (delete confirm).
- Icons: `crown`, and filled-dot `more` / `grip`.

**Patterns** (`kit.css`)
- **Spacing:** 12px inside a section, 32px between sections (`.page`).
- **Scrollbars:** a slim 6px bar that shows on hover or while scrolling and fades in and out. The gutter is reserved, so content stays 16px from both edges.
- **Friendly card hover:** the card lifts 2px, its icon pops, and the chevron nudges. Easing tokens: `--px-ease` and `--px-spring`.
- **Help card:** an illustration with a title, one line and a link. **AI field:** an animated gradient border.
- **Pricing:** sale badge (`.badge.sale`) and struck-through price (`.pricing .was`).
- **Lists:** divided lists drop the last divider. `.row.equal` gives equal-width buttons.
- Everything animated is off for reduced motion.

## 0.3.10 · 2026-10-06
- **Fix (live bug):** Framer's `framer.css` styled every button and input (30px height, 100% width, grey hover), which collapsed tabs, tiles and cards. Added `css/base.css` (framer.css in a `framer` cascade layer) and a control reset in `kit.css`. **Apps must import `@pixelfic/ui/base.css` instead of framer.css.**

## 0.3.9 · 2026-10-06
- **One brand colour: #5271FF.** Indigo scale rebuilt from it: 300 #8FA3FF (dark-mode brand text) · 500 #5271FF · 600 #4761DB (hover, light-mode brand text) · 700 #3B51B8 (pressed). Tints alpha-8 · 14 · 16 · 20 are all #5271FF. Removed #3358FF, #2442CC, #6A86FF, #708AFF and indigo/400 · 800.
- **One gradient everywhere:** `--px-brand-gradient-start` → `--px-brand-gradient-end` (#5271FF → #3B51B8) for Primary buttons, logo tiles and the tab indicator. `brand/logo-*` tokens were removed.
- **Primary button:** hover `--px-brand-primary-hover`, pressed `--px-brand-primary-pressed`.

## 0.3.8 · 2026-10-06
- **Hero card:** plain raised card. The aurora gradient and the 5 `--px-aurora-*` tokens were removed (theme now has 35 tokens).

## 0.3.7 · 2026-10-06
- **Cleanup:** removed 24 unused primitives (89 → 65). All 40 theme tokens are in use.
- **Borders:** `border/divider` is now black 5% / white 7%. The kit's card hairline (`--px-border`) uses these values inside Framer too.
- **Card shadow** (`--px-shadow-card`): 0/1/1 + 0/4/12/−6 at 2% (light) / 6% (dark).
- **Buttons:** reverted to the original design. Primary = indigo gradient (brand/gradient-start → end) + `--px-shadow-primary`. Radius 8 (Small 30) and 10 (Medium 36). The Ocean style, the Large size and the Site type were removed.
- **First developer handoff:** tokens.css, framer-fallback.css, tokens.json (DTCG), tokens.ts and React components.
