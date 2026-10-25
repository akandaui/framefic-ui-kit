// Pixelfic UI Kit components for Framer plugins (see docs/13-pixelfic-ui-kit-guide.md).

import { createContext, forwardRef, useContext, useEffect, useId, useRef, useState } from "react"
import type { ButtonHTMLAttributes, KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react"
import { Icon, Spinner } from "./icons"
import type { IconName } from "./icons"

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost" | "danger"
    size?: "sm" | "md" | "lg"
    icon?: IconName
    iconRight?: IconName
    full?: boolean
    loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, BtnProps>(function Button({ variant = "secondary", size = "sm", icon, iconRight, full, loading, children, className = "", ...rest }, ref) {
    return (
        <button ref={ref} type="button" className={`btn ${variant} ${size} ${full ? "full" : ""} ${className}`} {...rest} disabled={rest.disabled || loading}>
            {/* Stable wrappers: swapping the spinner/icon never touches a bare text node,
                so extensions that rewrite button text can't break React's updates. */}
            <span className="btn-ico" hidden={!loading && !icon}>
                {loading ? <Spinner /> : icon ? <Icon name={icon} size={size === "lg" ? 16 : 14} /> : null}
            </span>
            <span className="btn-label">{children}</span>
            {iconRight && <Icon name={iconRight} size={14} />}
        </button>
    )
})

export const IconButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { icon: IconName; label: string; size?: "sm"; boxed?: boolean }>(function IconButton({ icon, label, size, boxed, ...rest }, ref) {
    return (
        <button ref={ref} type="button" className={`icon-btn ${size ?? ""} ${boxed ? "boxed" : ""}`} aria-label={label} title={label} {...rest}>
            <Icon name={icon} size={size === "sm" ? 14 : 16} />
        </button>
    )
})

export function Badge({ kind = "neutral", children }: { kind?: "neutral" | "pro" | "brand" | "success" | "warning" | "danger"; children: ReactNode }) {
    return <span className={`badge ${kind === "neutral" ? "" : kind}`}>{children}</span>
}

/** True when the user has Pro: PRO badges and locks are hidden (doc 08 F9). */
export const ProContext = createContext(false)
export const useIsPro = () => useContext(ProContext)
export const ProBadge = () => (useIsPro() ? null : <Badge kind="pro">PRO</Badge>)

export function Field({ label, hint, error, children, htmlFor, extra }: { label: ReactNode; hint?: ReactNode; error?: string | null; children: ReactNode; htmlFor?: string; extra?: ReactNode }) {
    return (
        <div className="field">
            <label htmlFor={htmlFor}>
                {label}
                {extra}
            </label>
            {children}
            {error ? <p className="error-text" role="alert">{error}</p> : hint ? <p className="hint">{hint}</p> : null}
        </div>
    )
}

export function TextInput({ value, onChange, ...rest }: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & { value: string; onChange: (v: string) => void }) {
    return <input className="input" value={value} onChange={e => onChange(e.target.value)} {...rest} />
}

/** Number field that allows an empty or partial value while typing. */
export function NumberInput({
    value,
    onChange,
    allowEmpty,
    className = "input",
    ...rest
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & { value: number | null | undefined; onChange: (v: number | null) => void; allowEmpty?: boolean }) {
    const [text, setText] = useState(value === null || value === undefined ? "" : String(value))
    const last = useRef(value)
    useEffect(() => {
        if (value !== last.current) {
            last.current = value
            setText(value === null || value === undefined ? "" : String(value))
        }
    }, [value])
    return (
        <input
            className={className}
            inputMode="decimal"
            value={text}
            onChange={e => {
                const t = e.target.value.replace(",", ".")
                setText(e.target.value)
                if (t.trim() === "") {
                    if (allowEmpty) {
                        last.current = null
                        onChange(null)
                    }
                    return
                }
                const n = Number(t)
                if (Number.isFinite(n)) {
                    last.current = n
                    onChange(n)
                }
            }}
            onBlur={() => setText(value === null || value === undefined ? "" : String(value))}
            {...rest}
        />
    )
}

export function Select<T extends string>({ value, onChange, options, className = "select", ...rest }: { value: T; onChange: (v: T) => void; options: { value: T; label: string; disabled?: boolean }[]; className?: string } & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value">) {
    return (
        <select className={className} value={value} onChange={e => onChange(e.target.value as T)} {...rest}>
            {options.map(o => (
                <option key={o.value} value={o.value} disabled={o.disabled}>
                    {o.label}
                </option>
            ))}
        </select>
    )
}

export function Switch({ checked, onChange, label, disabled }: { checked: boolean; onChange: (v: boolean) => void; label: string; disabled?: boolean }) {
    return <button type="button" role="switch" className="switch" aria-checked={checked} aria-label={label} disabled={disabled} onClick={() => onChange(!checked)} />
}

export function Setting({ title, hint, children, pro }: { title: ReactNode; hint?: ReactNode; children: ReactNode; pro?: boolean }) {
    return (
        <div className="setting">
            <div className="text">
                <span className="row" style={{ gap: 6, fontSize: 12, fontWeight: 500 }}>
                    {title}
                    {pro && <ProBadge />}
                </span>
                {hint && <span className="hint">{hint}</span>}
            </div>
            {children}
        </div>
    )
}

export function Segmented<T extends string>({ value, onChange, options, label }: { value: T; onChange: (v: T) => void; options: { value: T; label: ReactNode; pro?: boolean }[]; label: string }) {
    return (
        <div className="segmented" role="group" aria-label={label}>
            {options.map(o => (
                <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
                    {o.label}
                    {o.pro && <Icon name="lock" size={11} />}
                </button>
            ))}
        </div>
    )
}

export function Banner({ kind = "info", title, children, actions, icon, art, className = "" }: { kind?: "info" | "warning" | "danger" | "success"; title?: ReactNode; children?: ReactNode; actions?: ReactNode; icon?: IconName; art?: ReactNode; className?: string }) {
    const ic: IconName = icon ?? (kind === "success" ? "checkCircle" : kind === "info" ? "info" : "alert")
    return (
        <div className={`banner ${kind} ${art ? "has-art" : ""} ${className}`} role={kind === "danger" ? "alert" : "status"}>
            {art ?? <Icon name={ic} />}
            <div className="grow">
                {title && <strong style={{ display: "block" }}>{title}</strong>}
                {children}
                {actions && <div className="actions">{actions}</div>}
            </div>
        </div>
    )
}

export function EmptyState({ icon = "calculator", title, children, action }: { icon?: IconName; title: ReactNode; children?: ReactNode; action?: ReactNode }) {
    return (
        <div className="empty card">
            <span className="icon-circle">
                <Icon name={icon} />
            </span>
            <p className="title-s">{title}</p>
            {children && <p className="muted" style={{ fontSize: 12 }}>{children}</p>}
            {action}
        </div>
    )
}

export function Skeleton({ h = 44, w = "100%" }: { h?: number; w?: number | string }) {
    return <div className="skeleton" style={{ height: h, width: w }} aria-hidden="true" />
}

export function Sheet({ title, onClose, children, footer }: { title: ReactNode; onClose: () => void; children: ReactNode; footer?: ReactNode }) {
    const id = useId()
    const dialog = useRef<HTMLDivElement>(null)
    // Move focus into the dialog, trap Tab, and restore focus on close.
    useEffect(() => {
        const prev = document.activeElement as HTMLElement | null
        const el = dialog.current
        const focusables = () => [...(el?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ?? [])].filter(n => !n.hasAttribute("disabled"))
        const first = focusables().find(n => !n.closest(".sheet-head")) ?? focusables()[0]
        first?.focus()
        const onTab = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return
            const f = focusables()
            if (!f.length) return
            if (e.shiftKey && document.activeElement === f[0]) {
                e.preventDefault()
                f[f.length - 1].focus()
            } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
                e.preventDefault()
                f[0].focus()
            }
        }
        el?.addEventListener("keydown", onTab)
        return () => {
            el?.removeEventListener("keydown", onTab)
            prev?.focus?.()
        }
    }, [])
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [onClose])
    return (
        <div className="scrim" onClick={onClose}>
            <div ref={dialog} className="sheet" role="dialog" aria-modal="true" aria-labelledby={id} onClick={e => e.stopPropagation()}>
                <div className="sheet-grip" />
                <div className="sheet-head">
                    <h2 id={id} className="title-m">
                        {title}
                    </h2>
                    <IconButton icon="close" label="Close" onClick={onClose} />
                </div>
                <div className="sheet-body">{children}</div>
                {footer && <div style={{ padding: "0 16px 16px" }}>{footer}</div>}
            </div>
        </div>
    )
}

/** Anchored popover menu. */
export function Popover({ anchor, onClose, children, align = "left" }: { anchor: HTMLElement | null; onClose: () => void; children: ReactNode; align?: "left" | "right" }) {
    const ref = useRef<HTMLDivElement>(null)
    const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
    useEffect(() => {
        if (!anchor) return
        const r = anchor.getBoundingClientRect()
        const w = 220
        const left = align === "right" ? Math.max(8, r.right - w) : Math.min(window.innerWidth - w - 8, r.left)
        const below = r.bottom + 4
        setPos({ top: below, left })
    }, [anchor, align])
    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node) && !anchor?.contains(e.target as Node)) onClose()
        }
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
        document.addEventListener("mousedown", onDown)
        window.addEventListener("keydown", onKey)
        return () => {
            document.removeEventListener("mousedown", onDown)
            window.removeEventListener("keydown", onKey)
        }
    }, [onClose, anchor])
    useEffect(() => {
        if (!pos || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        const top = Math.max(8, Math.floor(window.innerHeight - r.height - 8))
        if (r.bottom > window.innerHeight - 8 && Math.abs(top - pos.top) > 0.5) setPos(p => (p ? { ...p, top } : p))
    }, [pos])
    if (!pos) return null
    return (
        <div ref={ref} className="menu fade-in" role="menu" style={{ top: pos.top, left: pos.left, width: 220, position: "fixed", maxHeight: "70vh", overflow: "auto" }}>
            {children}
        </div>
    )
}

export function MenuItem({ icon, label, sub, onClick, pro, disabled }: { icon?: IconName; label: string; sub?: string; onClick: () => void; pro?: boolean; disabled?: boolean }) {
    return (
        <button type="button" role="menuitem" className="menu-item" onClick={onClick} disabled={disabled}>
            {icon && (
                <span className="icon-circle">
                    <Icon name={icon} size={14} />
                </span>
            )}
            <span className="grow">
                {label}
                {sub && <span className="sub">{sub}</span>}
            </span>
            {pro && <ProBadge />}
        </button>
    )
}

/** Arrow-key navigation between tabs (WAI-ARIA tabs pattern). */
export function onTabKeys(e: ReactKeyboardEvent<HTMLElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
    const tabs = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement)
    if (i < 0) return
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]
    next.focus()
    next.click()
}

/** Brand slider with an editable number box. The fill follows the value through the --pct custom property. */
export function Slider({ value, min, max, step = 1, unit = "px", label, onChange }: { value: number; min: number; max: number; step?: number; unit?: string; label: string; onChange: (v: number) => void }) {
    const [draft, setDraft] = useState<string | null>(null)
    const clamp = (n: number) => Math.min(max, Math.max(min, Math.round(n / step) * step))
    const pct = ((clamp(value) - min) / (max - min)) * 100
    const commit = () => {
        if (draft === null) return
        const n = Number(draft)
        if (draft.trim() !== "" && Number.isFinite(n)) onChange(clamp(n))
        setDraft(null)
    }
    return (
        <div className="slider-row">
            <input type="range" className="slider" min={min} max={max} step={step} value={value} aria-label={label} style={{ "--pct": `${pct}%` } as React.CSSProperties} onChange={e => onChange(Number(e.target.value))} />
            <label className="slider-num">
                <input
                    type="number"
                    inputMode="numeric"
                    min={min}
                    max={max}
                    step={step}
                    value={draft ?? String(value)}
                    aria-label={`${label} in ${unit}`}
                    onChange={e => {
                        setDraft(e.target.value)
                        const n = Number(e.target.value)
                        if (e.target.value.trim() !== "" && n >= min && n <= max) onChange(clamp(n))
                    }}
                    onBlur={commit}
                    onKeyDown={e => {
                        if (e.key === "Enter") commit()
                    }}
                />
                <span aria-hidden="true">{unit}</span>
            </label>
        </div>
    )
}

/** Shows the slim scrollbar while any area scrolls, then hides it ~0.9s after scrolling stops.
    Call once at the app root; pairs with the .is-scrolling rules in kit.css. */
export function useScrollReveal() {
    useEffect(() => {
        const timers = new WeakMap<Element, number>()
        const onScroll = (e: Event) => {
            const el = e.target
            if (!(el instanceof Element)) return
            el.classList.add("is-scrolling")
            window.clearTimeout(timers.get(el))
            timers.set(el, window.setTimeout(() => el.classList.remove("is-scrolling"), 900))
        }
        document.addEventListener("scroll", onScroll, { capture: true, passive: true })
        return () => document.removeEventListener("scroll", onScroll, { capture: true })
    }, [])
}
