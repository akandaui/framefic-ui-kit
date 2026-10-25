// Builds every token output from tokens/figma-export.json (the single source).
//   css/tokens.css          --px-* variables: primitives, size, type, effects, theme (light/dark), brand modes, kit aliases
//   css/framer-fallback.css  --framer-color-* values for previews OUTSIDE Framer (Framer injects these inside plugins)
//   tokens/tokens.json       W3C Design Tokens (DTCG) format, for Style Dictionary / Tokens Studio / other stacks
//   tokens/tokens.ts         typed constants for JS/TS
// Run: node scripts/build-tokens.mjs

import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const src = JSON.parse(await readFile(path.join(root, "tokens/figma-export.json"), "utf8"))
const banner = `/* Pixelfic UI Kit v${src.$meta.kitVersion} — generated from tokens/figma-export.json. Do not edit by hand. */\n`

const prim = Object.fromEntries(src.primitives.map(p => [p.name, p]))
const isAlias = v => typeof v === "string" && v.startsWith("{")
const aliasName = v => v.slice(1, -1)
const cssRef = v => (isAlias(v) ? `var(${prim[aliasName(v)].css})` : v)
const resolve = v => (isAlias(v) ? prim[aliasName(v)].value : v)
const themeByName = Object.fromEntries(src.theme.tokens.map(t => [t.name, t]))

// Theme tokens named --framer-color-* belong to Framer. Inside plugins we never redefine them;
// we expose a --px-* alias that points at Framer's variable.
const pxNameFor = t => (t.css.startsWith("--framer-") ? t.css.replace("--framer-color-", "--px-color-") : t.css)
const themeValue = (t, mode) => cssRef(t[mode])

const lines = [banner]

// 1. Primitives, size, typography, effects
lines.push(":root {")
lines.push("  /* Primitives (raw palette — prefer semantic tokens in components) */")
for (const p of src.primitives) lines.push(`  ${p.css}: ${p.value};`)
lines.push("\n  /* Size */")
for (const s of src.size) lines.push(`  ${s.css}: ${s.value}px;`)
lines.push("\n  /* Typography */")
lines.push(`  --px-font-sans: "Inter", system-ui, -apple-system, sans-serif;`)
lines.push(`  --px-font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;`)
for (const t of src.typography) {
    const k = t.name.toLowerCase().replace(/[/ ]+/g, "-")
    const fam = t.family === "Inter" ? "var(--px-font-sans)" : "var(--px-font-mono)"
    lines.push(`  --px-text-${k}: ${t.weight} ${t.size}px/${t.lineHeight}px ${fam};`)
    lines.push(`  --px-text-${k}-tracking: ${t.letterSpacing === "0%" ? "0" : (parseFloat(t.letterSpacing) / 100).toFixed(3) + "em"};`)
}
lines.push("\n  /* Effects (colours follow the theme) */")
for (const e of src.effects) {
    const k = e.name.toLowerCase().replace(/[/ ]+/g, "-")
    const parts = e.layers.map(l => {
        const t = themeByName[l.color]
        const color = t ? `var(${pxNameFor(t)})` : `var(${prim[l.color].css})`
        return `${l.type === "INNER_SHADOW" ? "inset " : ""}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${color}`
    })
    lines.push(`  --px-${k}: ${parts.join(", ")};`)
}
lines.push("}\n")

// 2. Theme (Framer sets data-framer-theme on <body> inside plugins)
const themeBlock = (sel, mode) => {
    lines.push(`${sel} {`)
    for (const t of src.theme.tokens) {
        if (t.css.startsWith("--framer-")) lines.push(`  ${pxNameFor(t)}: var(${t.css}, ${themeValue(t, mode)});`)
        else lines.push(`  ${t.css}: ${themeValue(t, mode)};`)
    }
    lines.push("}\n")
}
themeBlock(':root,\n[data-framer-theme="light"]', "light")
themeBlock('[data-framer-theme="dark"]', "dark")

// 3. Brand modes (default = Pixelfic). Set data-px-brand on <html> or a wrapper.
for (const mode of src.brand.modes) {
    const sel = mode === "pixelfic" ? ':root,\n[data-px-brand="pixelfic"]' : `[data-px-brand="${mode}"]`
    lines.push(`${sel} {`)
    for (const t of src.brand.tokens) lines.push(`  ${t.css}: ${cssRef(t[mode])};`)
    lines.push("}\n")
}

await writeFile(path.join(root, "css/tokens.css"), lines.join("\n"))

// framer-fallback.css — only for docs, Storybook or tests outside Framer.
const fb = [banner, "/* Load this ONLY outside Framer. Inside a plugin Framer provides these values at runtime. */"]
for (const [sel, mode] of [[':root,\n[data-framer-theme="light"]', "light"], ['[data-framer-theme="dark"]', "dark"]]) {
    fb.push(`${sel} {`)
    for (const t of src.theme.tokens.filter(t => t.css.startsWith("--framer-"))) fb.push(`  ${t.css}: ${resolve(t[mode])};`)
    fb.push("}\n")
}
await writeFile(path.join(root, "css/framer-fallback.css"), fb.join("\n"))

// DTCG JSON
const set = (obj, keys, val) => {
    let o = obj
    keys.slice(0, -1).forEach(k => (o = o[k] ??= {}))
    o[keys[keys.length - 1]] = val
}
const dtcg = { $description: `Pixelfic UI Kit v${src.$meta.kitVersion}` }
for (const p of src.primitives) set(dtcg, ["primitive", ...p.name.split("/")], { $type: "color", $value: p.value })
for (const mode of src.theme.modes) for (const t of src.theme.tokens) set(dtcg, ["theme", mode, ...t.name.split("/")], { $type: "color", $value: isAlias(t[mode]) ? `{primitive.${aliasName(t[mode]).replace(/\//g, ".")}}` : t[mode], $extensions: { "com.pixelfic.css": pxNameFor(t) } })
for (const mode of src.brand.modes) for (const t of src.brand.tokens) set(dtcg, ["brand", mode, ...t.name.split("/")], { $type: "color", $value: `{primitive.${aliasName(t[mode]).replace(/\//g, ".")}}` })
for (const s of src.size) set(dtcg, ["size", ...s.name.split("/")], { $type: "dimension", $value: `${s.value}px` })
for (const t of src.typography) set(dtcg, ["typography", ...t.name.toLowerCase().split("/")], { $type: "typography", $value: { fontFamily: t.family, fontWeight: t.weight, fontSize: `${t.size}px`, lineHeight: `${t.lineHeight}px`, letterSpacing: t.letterSpacing } })
for (const e of src.effects) set(dtcg, ["shadow", ...e.name.toLowerCase().split("/")], { $type: "shadow", $value: e.layers.map(l => ({ inset: l.type === "INNER_SHADOW", offsetX: `${l.x}px`, offsetY: `${l.y}px`, blur: `${l.blur}px`, spread: `${l.spread}px`, color: themeByName[l.color] ? `{theme.light.${l.color.replace(/\//g, ".")}}` : `{primitive.${l.color.replace(/\//g, ".")}}` })) })
await writeFile(path.join(root, "tokens/tokens.json"), JSON.stringify(dtcg, null, 2) + "\n")

// TS constants (CSS variable references, so values stay theme-aware)
const ts = [banner.replace("/*", "//").replace(" */", ""), "export const tokens = {"]
ts.push(`  color: {`)
for (const t of src.theme.tokens) ts.push(`    ${JSON.stringify(t.name)}: "var(${pxNameFor(t)})",`)
for (const t of src.brand.tokens) ts.push(`    ${JSON.stringify(t.name)}: "var(${t.css})",`)
ts.push("  },\n  size: {")
for (const s of src.size) ts.push(`    ${JSON.stringify(s.name)}: ${s.value},`)
ts.push("  },\n  shadow: {")
for (const e of src.effects) ts.push(`    ${JSON.stringify(e.name)}: "var(--px-${e.name.toLowerCase().replace(/[/ ]+/g, "-")})",`)
ts.push("  },\n} as const\n")
ts.push(`export const KIT_VERSION = ${JSON.stringify(src.$meta.kitVersion)}\n`)
await writeFile(path.join(root, "tokens/tokens.ts"), ts.join("\n"))

console.log(`Pixelfic UI v${src.$meta.kitVersion}: ${src.primitives.length} primitives, ${src.theme.tokens.length} theme, ${src.brand.tokens.length} brand, ${src.size.length} size, ${src.typography.length} type, ${src.effects.length} effects`)
