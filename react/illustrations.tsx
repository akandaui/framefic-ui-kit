// Shared Pixelfic illustrations (inline SVG, theme tokens, animations in kit.css). Synced from Calfic v2 on 2026-10-07.

/** Pro gate: a feature card with a violet lock that clicks open, sparkles and a passing shimmer. */
export function ProIllustration() {
    return (
        <div className="pro-hero" aria-hidden="true">
            <svg className="illo pro-illo" width="132" height="76" viewBox="0 0 132 76" fill="none" focusable="false">
                <defs>
                    <linearGradient id="pro-lock" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#a78bfa" />
                        <stop offset="1" stopColor="#6d28d9" />
                    </linearGradient>
                    <linearGradient id="pro-shine" x1="0" y1="0" x2="1" y2="0">
                        <stop stopColor="#fff" stopOpacity="0" />
                        <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
                        <stop offset="1" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                    <clipPath id="pro-card-clip">
                        <rect x="22" y="10" width="78" height="56" rx="10" />
                    </clipPath>
                </defs>
                {/* feature card */}
                <rect x="22" y="10" width="78" height="56" rx="10" fill="var(--px-raised)" stroke="var(--px-pro-border)" />
                <rect x="31" y="20" width="30" height="4" rx="2" fill="var(--framer-color-text-tertiary)" opacity="0.6" />
                <rect x="31" y="30" width="52" height="8" rx="3" fill="var(--framer-color-bg-tertiary)" />
                <rect x="31" y="44" width="20" height="12" rx="6" fill="var(--px-pro-bg)" />
                <circle className="pro-illo-knob" cx="38" cy="50" r="4" fill="var(--px-pro-text)" />
                <g clipPath="url(#pro-card-clip)">
                    <rect className="pro-illo-shine" x="0" y="0" width="30" height="76" fill="url(#pro-shine)" transform="skewX(-18)" />
                </g>
                {/* lock */}
                <g transform="translate(86 34)">
                    <path className="pro-illo-shackle" d="M8 13V9a7 7 0 0 1 14 0v4" stroke="url(#pro-lock)" strokeWidth="3" strokeLinecap="round" />
                    <rect x="3" y="12" width="24" height="20" rx="6" fill="url(#pro-lock)" />
                    <circle cx="15" cy="21" r="2.4" fill="#fff" />
                    <rect x="14" y="22" width="2" height="5" rx="1" fill="#fff" />
                </g>
                {/* sparkles */}
                <path className="pro-illo-spark" d="M112 8l1.6 4.4L118 14l-4.4 1.6L112 20l-1.6-4.4L106 14l4.4-1.6L112 8Z" fill="#a78bfa" />
                <path className="pro-illo-spark pro-illo-spark-2" d="M12 46l1 2.8 2.8 1-2.8 1L12 53.6l-1-2.8-2.8-1 2.8-1L12 46Z" fill="#8b5cf6" />
                <path className="pro-illo-spark pro-illo-spark-3" d="M122 52l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" fill="var(--px-brand)" />
            </svg>
        </div>
    )
}

/** Delete confirmation: the bin lid lifts and a small card drops in. */
export function TrashIllustration() {
    return (
        <svg className="illo trash-illo" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
            <circle cx="20" cy="20" r="19" fill="var(--px-danger-subtle)" />
            {/* card dropping in */}
            <rect className="trash-illo-card" x="15" y="6" width="10" height="8" rx="2" fill="var(--px-raised)" stroke="var(--px-border-strong)" />
            {/* bin */}
            <path d="M13.5 17h13l-1.1 12.2a2 2 0 0 1-2 1.8h-6.8a2 2 0 0 1-2-1.8L13.5 17Z" fill="var(--px-raised)" stroke="var(--px-danger)" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M18 21v6M22 21v6" stroke="var(--px-danger)" strokeWidth="1.5" strokeLinecap="round" />
            {/* lid */}
            <g className="trash-illo-lid">
                <path d="M12 15h16" stroke="var(--px-danger)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M17.5 15v-1.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V15" stroke="var(--px-danger)" strokeWidth="1.5" strokeLinejoin="round" />
            </g>
        </svg>
    )
}
