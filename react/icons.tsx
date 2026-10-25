// 16px stroke icons (Pixelfic icon set). Colour follows currentColor.

import type { SVGProps } from "react"

const P: Record<string, string> = {
    plus: "M8 3.5v9M3.5 8h9",
    sparkles: "M8 2.5l1.1 3.4L12.5 7 9.1 8.1 8 11.5 6.9 8.1 3.5 7l3.4-1.1L8 2.5ZM12.5 10.5l.45 1.05L14 12l-1.05.45-.45 1.05-.45-1.05L11 12l1.05-.45.45-1.05Z",
    close: "M4 4l8 8M12 4l-8 8",
    check: "M3.5 8.5l3 3 6-7",
    checkCircle: "M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12ZM5.5 8.2l1.8 1.8 3.2-3.8",
    search: "M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10ZM10.7 10.7L14 14",
    copy: "M5.5 5.5V3.8c0-.7.6-1.3 1.3-1.3h5.4c.7 0 1.3.6 1.3 1.3v5.4c0 .7-.6 1.3-1.3 1.3h-1.7M3.8 5.5h5.4c.7 0 1.3.6 1.3 1.3v5.4c0 .7-.6 1.3-1.3 1.3H3.8c-.7 0-1.3-.6-1.3-1.3V6.8c0-.7.6-1.3 1.3-1.3Z",
    lock: "M4.5 7.5V5.5a3.5 3.5 0 0 1 7 0v2M3.8 7.5h8.4c.4 0 .8.4.8.8v4.9c0 .4-.4.8-.8.8H3.8c-.4 0-.8-.4-.8-.8V8.3c0-.4.4-.8.8-.8Z",
    more: "M3.5 8h.01M8 8h.01M12.5 8h.01",
    grip: "M6 4h.01M10 4h.01M6 8h.01M10 8h.01M6 12h.01M10 12h.01",
    trash: "M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.3c0 .4.4.7.8.7h4.2c.4 0 .8-.3.8-.7l.6-8.3",
    chevronDown: "M4 6l4 4 4-4",
    chevronUp: "M4 10l4-4 4 4",
    chevronLeft: "M10 4L6 8l4 4",
    chevronRight: "M6 4l4 4-4 4",
    arrowUpRight: "M5 11l6-6M6 5h5v5",
    user: "M8 8a2.75 2.75 0 1 0 0-5.5A2.75 2.75 0 0 0 8 8ZM3 13.5c.6-2.3 2.6-3.5 5-3.5s4.4 1.2 5 3.5",
    file: "M9 2.5H5c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h6c.6 0 1-.4 1-1v-7L9 2.5ZM9 2.5v3h3M6 9h4M6 11h3",
    mail: "M2.5 4.5h11v7h-11v-7ZM2.5 4.5L8 9l5.5-4.5",
    list: "M5.5 4.5h8M5.5 8h8M5.5 11.5h8M2.5 4.5h.01M2.5 8h.01M2.5 11.5h.01",
    calculator: "M4.5 2.5h7c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1h-7c-.6 0-1-.4-1-1v-9c0-.6.4-1 1-1ZM5.5 4.5h5v2h-5v-2ZM5.5 9h.01M8 9h.01M10.5 9h.01M5.5 11.5h.01M8 11.5h.01M10.5 11.5h.01",
    tag: "M2.5 8.5V3.3c0-.4.4-.8.8-.8h5.2l5 5-6 6-5-5ZM5.5 5.5h.01",
    percent: "M12 4L4 12M5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM11 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
    hash: "M3 6h10M3 10h10M6.5 2.5l-1 11M10.5 2.5l-1 11",
    chart: "M3 13.5V8M6.5 13.5V4M10 13.5V9.5M13.5 13.5V2.5",
    users: "M6 7.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5ZM2 13c.4-2 2-3 4-3s3.6 1 4 3M10.5 3.2a2.2 2.2 0 0 1 0 4.1M12 10.2c1 .4 1.7 1.4 2 2.8",
    bank: "M2.5 6L8 2.5 13.5 6M3.5 6v6M6.5 6v6M9.5 6v6M12.5 6v6M2.5 13.5h11",
    home: "M2.5 7L8 2.5 13.5 7v6.5h-4V10h-3v3.5h-4V7Z",
    target: "M8 13.5A5.5 5.5 0 1 0 8 2.5a5.5 5.5 0 0 0 0 11ZM8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM8 8h.01",
    box: "M2.5 5L8 2.5 13.5 5v6L8 13.5 2.5 11V5ZM2.5 5L8 7.5 13.5 5M8 7.5v6",
    coffee: "M3 6h8v4.5A3 3 0 0 1 8 13.5H6a3 3 0 0 1-3-3V6ZM11 7h1a1.5 1.5 0 0 1 0 3h-1M5 2.5v1.5M8 2.5v1.5",
    heart: "M8 13S2.5 10 2.5 6.3A2.8 2.8 0 0 1 8 5a2.8 2.8 0 0 1 5.5 1.3C13.5 10 8 13 8 13Z",
    info: "M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12ZM8 7.5v3.5M8 5.2h.01",
    alert: "M8 2.5l6 10.5H2L8 2.5ZM8 6.5v3M8 11.3h.01",
    refresh: "M13 8a5 5 0 1 1-1.5-3.6M13 2.5v3h-3",
    eye: "M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    send: "M13.5 2.5L2.5 7l4.5 1.5L8.5 13l5-10.5ZM7 8.5l6.5-6",
    sliders: "M3 4.5h6M11.5 4.5H13M3 11.5h1.5M7 11.5h6M9 3v3M5 10v3",
    palette: "M8 13.5a5.5 5.5 0 1 1 5.5-5.5c0 1.5-1.2 2-2.2 2H10a1.3 1.3 0 0 0-1 2.2c.3.4.1 1.3-1 1.3ZM5 7.5h.01M6.5 5h.01M9.5 5h.01",
    inbox: "M2.5 9l1.5-5.5h8L13.5 9v3.5c0 .6-.4 1-1 1h-9c-.6 0-1-.4-1-1V9ZM2.5 9h3l1 1.5h3l1-1.5h3",
    layers: "M8 2.5L13.5 5.5 8 8.5 2.5 5.5 8 2.5ZM2.5 8.5L8 11.5l5.5-3M2.5 11L8 14l5.5-3",
    code: "M6 4.5L2.5 8 6 11.5M10 4.5L13.5 8 10 11.5",
    external: "M9.5 2.5h4v4M13.5 2.5L8 8M11.5 9.5v3c0 .6-.4 1-1 1h-7c-.6 0-1-.4-1-1v-7c0-.6.4-1 1-1h3",
    collapse: "M5 6.5L8 3.5l3 3M5 9.5L8 12.5l3-3",
    calendar: "M3.5 3.5h9c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1h-9c-.6 0-1-.4-1-1v-8c0-.6.4-1 1-1ZM2.5 6.5h11M5.5 2v3M10.5 2v3",
    toggle: "M5.5 4.5h5a3.5 3.5 0 0 1 0 7h-5a3.5 3.5 0 0 1 0-7ZM10.5 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    split: "M2.5 3.5h11v9h-11v-9ZM8 3.5v9",
    minus: "M3.5 8h9",
    divide: "M3.5 8h9M8 4.5h.01M8 11.5h.01",
    x: "M4.5 4.5l7 7M11.5 4.5l-7 7",
    step: "M2.5 12.5h3.5V9.5H9V6.5h3.5V3.5",
    print: "M4.5 6V2.5h7V6M4.5 11.5H3c-.3 0-.5-.2-.5-.5V7c0-.6.4-1 1-1h9c.6 0 1 .4 1 1v4c0 .3-.2.5-.5.5h-1.5M4.5 9.5h7v4h-7v-4Z",
    pin: "M6 2.5h4l-.5 4 2 2v1H4.5v-1l2-2-.5-4ZM8 9.5v4",
    play: "M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12ZM6.75 5.75v4.5L10.5 8 6.75 5.75Z",
    crown: "M2.5 5.5l3 2.5L8 4l2.5 4 3-2.5-1 6.5h-9l-1-6.5ZM4 13.5h8",
}

/** Dot glyphs are drawn as filled circles so they stay legible at 16px. */
const DOTS: Record<string, [number, number][]> = {
    more: [[3.5, 8], [8, 8], [12.5, 8]],
    grip: [[6, 4], [10, 4], [6, 8], [10, 8], [6, 12], [10, 12]],
}

export type IconName = keyof typeof P

export function Icon({ name, size = 16, ...rest }: { name: IconName | string; size?: number } & SVGProps<SVGSVGElement>) {
    const dots = DOTS[name as string]
    if (dots) {
        return (
            <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" {...rest}>
                {dots.map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r={1.3} />
                ))}
            </svg>
        )
    }
    const d = P[name] ?? P.calculator
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
            <path d={d} />
        </svg>
    )
}

export function Spinner({ size = 14 }: { size?: number }) {
    return (
        <svg className="spin" width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
            <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}
