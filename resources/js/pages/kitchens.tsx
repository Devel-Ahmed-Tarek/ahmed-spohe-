import { Head } from '@inertiajs/react';
import type { FormEvent, ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import MarketingLayout from '@/components/marketing/marketing-layout';

function normalizeWhatsappNumber(raw: string): string {
    return raw.replace(/[^\d]/g, '');
}

function WhatsAppCta({
    children,
    whatsappNumber,
    propertyType,
    name,
    area,
}: {
    children: ReactNode;
    whatsappNumber: string;
    propertyType: string;
    name: string;
    area: string;
}) {
    const normalized = normalizeWhatsappNumber(whatsappNumber);

    const message = useMemo(() => {
        const safeName = name?.trim() ? name.trim() : 'عميل';
        const safeArea = area?.trim() ? area.trim() : 'حسب المساحة';
        return `مرحبًا، أنا ${safeName}.\nنوع المشروع: ${propertyType}.\nالمقاس/المساحة: ${safeArea}.\nأريد تصميم وتنفيذ مطبخ مودرن فخم.`;
    }, [area, name, propertyType]);

    const href = useMemo(() => {
        if (!normalized) return '';
        const text = encodeURIComponent(message);
        return `https://wa.me/${normalized}?text=${text}`;
    }, [message, normalized]);

    return (
        <a
            href={href || undefined}
            target="_blank"
            rel="noreferrer noopener"
            className={[
                'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold',
                'transition-all duration-200',
                href
                    ? 'bg-[#A67C52] text-[#1B1B18] shadow-[0_16px_40px_rgba(166,124,82,0.25)] hover:brightness-[1.03] hover:-translate-y-[1px]'
                    : 'bg-[#D9D9D9] text-[#5c5c5c] cursor-not-allowed',
            ].join(' ')}
            aria-disabled={!href}
        >
            {children}
        </a>
    );
}

function KitchenAssemblyHero() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [animate, setAnimate] = useState(false);
    const [step, setStep] = useState(0);
    const videoMp4 = String(import.meta.env.VITE_KITCHEN_ASSEMBLY_VIDEO || '');
    const videoWebm = String(import.meta.env.VITE_KITCHEN_ASSEMBLY_VIDEO_WEBM || '');
    const videoPoster = String(import.meta.env.VITE_KITCHEN_ASSEMBLY_POSTER || '');
    const hasVideo = Boolean(videoMp4 || videoWebm);
    const [videoOk, setVideoOk] = useState(hasVideo);

    const steps = useMemo(
        () => [
            {
                ar: 'تجهيز المقاسات',
                en: 'Measure & Prepare',
                descAr: 'استلام دقيق للمقاسات والزوايا عشان كل تفصيلة تركب “من أول مرة”.',
                descEn: 'Exact measurements & angles so every detail fits perfectly.',
            },
            {
                ar: 'تركيب الهياكل',
                en: 'Assemble Framework',
                descAr: 'تجهيز الهيكل وتثبيت القواعد قبل التشطيبات—ثبات وجودة من البداية.',
                descEn: 'Build the structure and secure the base before finishing.',
            },
            {
                ar: 'إضافة التفاصيل',
                en: 'Add Details',
                descAr: 'الأبواب/الواجهات والدرج والاكسسوارات—تشطيب راقي بمستوى مختلف.',
                descEn: 'Doors, drawers, and hardware—premium finishing.',
            },
            {
                ar: 'الكونتر النهائي',
                en: 'Final Countertop',
                descAr: 'الكونتر والسينك واللمسات الأخيرة—شكل نهائي فخم وتسليم مرتب.',
                descEn: 'Countertop, sink, and final touches—premium result and clean handover.',
            },
        ],
        [],
    );

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry?.isIntersecting) {
                    setAnimate(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.25 },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!animate) return;

        setStep(0);
        let i = 0;
        const id = window.setInterval(() => {
            i += 1;
            setStep(i);
            if (i >= steps.length - 1) window.clearInterval(id);
        }, 900);

        return () => window.clearInterval(id);
    }, [animate, steps.length]);

    const atLeast = (n: number) => step >= n;
    const current = steps[Math.min(step, steps.length - 1)];

    // We "explode" the kitchen parts in step 0, then assemble them step-by-step.
    const wallTransform = atLeast(1)
        ? 'translate(0px, 0px) rotate(0deg) scale(1)'
        : 'translate(-55px, -72px) rotate(-14deg) scale(0.94)';
    const baseTransform = atLeast(1)
        ? 'translate(0px, 0px) rotate(0deg) scale(1)'
        : 'translate(55px, 20px) rotate(10deg) scale(0.95)';
    const doorsTransform = atLeast(2)
        ? 'translate(0px, 0px) rotate(0deg) scale(1)'
        : 'translate(-95px, 36px) rotate(-10deg) scale(0.93)';
    const drawerTransform = atLeast(2)
        ? 'translate(0px, 0px) rotate(0deg) scale(1)'
        : 'translate(95px, 26px) rotate(12deg) scale(0.93)';
    const counterTransform = atLeast(3)
        ? 'translate(0px, 0px) rotate(0deg) scale(1)'
        : 'translate(0px, 84px) rotate(0deg) scale(0.95)';

    return (
        <div ref={ref} className="w-full">
            <style>{`
                .k-hero {
                    position: relative;
                    height: 460px;
                    width: 100%;
                    max-width: 460px;
                    margin: 0 auto;
                    overflow: hidden;
                    border-radius: 28px;
                    background:
                        radial-gradient(900px 320px at 50% 112%, rgba(166,124,82,0.22), transparent 58%),
                        radial-gradient(520px 220px at 22% 22%, rgba(85,59,30,0.16), transparent 58%),
                        linear-gradient(180deg, rgba(245,245,245,0.92), rgba(217,217,217,0.35));
                    border: 1px solid rgba(85,59,30,0.10);
                    box-shadow:
                        0 30px 90px rgba(0,0,0,0.08),
                        inset 0 1px 0 rgba(255,255,255,0.65);
                }
                .k-glow {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background:
                        radial-gradient(300px 200px at 50% 42%, rgba(166,124,82,0.42), transparent 66%);
                    opacity: ${animate ? 0.95 : 0.55};
                    transition: opacity 400ms ease;
                }
                .k-video {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: saturate(1.02) contrast(1.02);
                }
                .k-video-fade {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background: radial-gradient(520px 220px at 50% 42%, rgba(166,124,82,0.16), transparent 60%);
                    opacity: 0.9;
                }
                .k-svg {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: block;
                    padding: 18px;
                }
                .k-part {
                    transition:
                        transform 1000ms cubic-bezier(.2,.9,.2,1),
                        opacity 650ms ease,
                        filter 900ms ease;
                    transform-box: fill-box;
                    transform-origin: center;
                    filter: drop-shadow(0 16px 26px rgba(0,0,0,0.12));
                }
                .k-part.hidden {
                    opacity: 0.0;
                    filter: drop-shadow(0 10px 18px rgba(0,0,0,0.06));
                }
                @media (prefers-reduced-motion: reduce) {
                    .k-part { transition: none !important; }
                }
            `}</style>

            <div className="k-hero">
                <div className="k-glow" />

                {/* Prefer real video (mp4/webm) if provided. Fallback to SVG animation. */}
                {videoOk && (
                    <>
                        <video
                            className="k-video"
                            muted
                            playsInline
                            autoPlay
                            loop
                            preload="metadata"
                            poster={videoPoster || undefined}
                            onError={() => setVideoOk(false)}
                        >
                            {videoMp4 ? (
                                <source src={videoMp4} type="video/mp4" />
                            ) : null}
                            {videoWebm ? (
                                <source src={videoWebm} type="video/webm" />
                            ) : null}
                        </video>
                        <div className="k-video-fade" />
                    </>
                )}

                {!videoOk && (
                    <svg
                        className="k-svg"
                        viewBox="0 0 420 420"
                        role="img"
                        aria-label="Kitchen assembly animation"
                    >
                        <defs>
                        <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#C4A484" stopOpacity="1" />
                            <stop offset="45%" stopColor="#A67C52" stopOpacity="0.96" />
                            <stop offset="100%" stopColor="#553B1E" stopOpacity="0.98" />
                        </linearGradient>
                        <linearGradient id="woodDark" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2B1702" stopOpacity="0.98" />
                            <stop offset="100%" stopColor="#553B1E" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id="counter" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#2B1702" stopOpacity="0.88" />
                            <stop offset="45%" stopColor="#553B1E" stopOpacity="0.96" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.96" />
                        </linearGradient>
                        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#C4A484" stopOpacity="0.72" />
                            <stop offset="55%" stopColor="#A67C52" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#A67C52" stopOpacity="0.18" />
                        </linearGradient>
                        <pattern id="woodLines" width="10" height="4" patternUnits="userSpaceOnUse">
                            <path d="M0 3 L10 1" stroke="#FFFFFF" strokeOpacity="0.09" strokeWidth="1" />
                            <path d="M-3 1 L7 -1" stroke="#000000" strokeOpacity="0.06" strokeWidth="1" />
                        </pattern>
                        <filter id="softInner" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                            <feComposite in="blur" in2="SourceAlpha" operator="in" result="inner" />
                            <feColorMatrix
                                in="inner"
                                type="matrix"
                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .35 0"
                            />
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                        {/* Backdrop (makes it feel like a real kitchen) */}
                        <rect
                            x="44"
                            y="62"
                            width="332"
                            height="270"
                            rx="28"
                            fill="#F5F5F5"
                            fillOpacity="0.42"
                            stroke="#D9D9D9"
                            strokeOpacity="0.55"
                        />
                        <ellipse cx="210" cy="362" rx="138" ry="34" fill="#000000" fillOpacity="0.08" />

                        {/* Wall cabinets */}
                        <g
                            className="k-part"
                            style={{ transform: wallTransform, opacity: atLeast(1) ? 1 : 0.6 }}
                        >
                            <rect x="78" y="96" width="264" height="84" rx="14" fill="url(#wood)" stroke="#2B1702" strokeOpacity="0.18" />
                            <rect x="78" y="112" width="264" height="14" rx="7" fill="#FFFFFF" fillOpacity="0.10" />
                            <rect x="78" y="96" width="264" height="84" rx="14" fill="url(#woodLines)" fillOpacity="0.25" />

                            <g opacity="0.92">
                                {/* Left door */}
                                <rect x="92" y="110" width="92" height="52" rx="12" fill="url(#woodDark)" stroke="#2B1702" strokeOpacity="0.2" />
                                <rect x="100" y="118" width="76" height="36" rx="10" fill="url(#glass)" stroke="#A67C52" strokeOpacity="0.18" />
                                {/* Right door */}
                                <rect x="210" y="110" width="92" height="52" rx="12" fill="url(#woodDark)" stroke="#2B1702" strokeOpacity="0.2" />
                                <rect x="218" y="118" width="76" height="36" rx="10" fill="url(#glass)" stroke="#A67C52" strokeOpacity="0.18" />
                            </g>
                        </g>

                        {/* Base cabinets */}
                        <g
                            className="k-part"
                            style={{ transform: baseTransform, opacity: atLeast(1) ? 1 : 0.6 }}
                        >
                            {/* Left tall cabinet */}
                            <rect x="78" y="210" width="118" height="118" rx="16" fill="url(#wood)" stroke="#2B1702" strokeOpacity="0.18" />
                            <rect x="92" y="228" width="90" height="74" rx="12" fill="url(#woodDark)" stroke="#2B1702" strokeOpacity="0.22" />
                            <rect x="95" y="231" width="84" height="68" rx="10" fill="url(#woodLines)" fillOpacity="0.25" />
                            <rect x="132" y="300" width="10" height="14" rx="5" fill="#D9D9D9" fillOpacity="0.85" />

                        {/* Right tall cabinet */}
                        <rect x="224" y="210" width="118" height="118" rx="16" fill="url(#wood)" stroke="#2B1702" strokeOpacity="0.18" />
                        <rect x="238" y="228" width="90" height="74" rx="12" fill="url(#woodDark)" stroke="#2B1702" strokeOpacity="0.22" />
                        <rect x="241" y="231" width="84" height="68" rx="10" fill="url(#woodLines)" fillOpacity="0.25" />
                        <rect x="278" y="300" width="10" height="14" rx="5" fill="#D9D9D9" fillOpacity="0.85" />

                        {/* Middle frame (drawer cavity) */}
                        <rect x="140" y="210" width="68" height="118" rx="16" fill="url(#wood)" stroke="#2B1702" strokeOpacity="0.18" />
                        <rect x="154" y="228" width="40" height="74" rx="12" fill="url(#woodDark)" stroke="#2B1702" strokeOpacity="0.22" />
                        <rect x="157" y="231" width="34" height="68" rx="10" fill="url(#woodLines)" fillOpacity="0.25" />
                    </g>

                        {/* Doors / glass panels (step 2) */}
                        <g
                            className="k-part"
                            style={{
                                transform: doorsTransform,
                                opacity: atLeast(2) ? 1 : 0.1,
                            }}
                        >
                            <rect x="98" y="224" width="100" height="40" rx="12" fill="url(#glass)" stroke="#A67C52" strokeOpacity="0.25" />
                            <rect x="222" y="224" width="100" height="40" rx="12" fill="url(#glass)" stroke="#A67C52" strokeOpacity="0.25" />
                            <path
                                d="M122 244 H172"
                                stroke="#F5F5F5"
                                strokeOpacity="0.55"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M246 244 H296"
                                stroke="#F5F5F5"
                                strokeOpacity="0.55"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </g>

                        {/* Drawer (step 2) */}
                        <g
                            className="k-part"
                            style={{
                                transform: drawerTransform,
                                opacity: atLeast(2) ? 1 : 0.15,
                            }}
                        >
                            <rect x="145" y="248" width="58" height="72" rx="14" fill="url(#woodDark)" stroke="#2B1702" strokeOpacity="0.22" />
                            <rect x="150" y="253" width="48" height="26" rx="10" fill="url(#wood)" fillOpacity="0.18" />
                            <rect x="158" y="284" width="32" height="14" rx="7" fill="#D9D9D9" fillOpacity="0.9" />
                            <path
                                d="M150 280 H198"
                                stroke="#F5F5F5"
                                strokeOpacity="0.25"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </g>

                        {/* Countertop + sink + cooktop (step 3) */}
                        <g
                            className="k-part"
                            style={{
                                transform: counterTransform,
                                opacity: atLeast(3) ? 1 : 0.08,
                            }}
                        >
                            <rect x="62" y="292" width="296" height="92" rx="26" fill="url(#counter)" stroke="#2B1702" strokeOpacity="0.22" />

                        {/* Stone highlights */}
                        <path
                            d="M92 310 C120 292, 172 300, 204 310 C236 320, 260 340, 288 332"
                            stroke="#C4A484"
                            strokeOpacity="0.18"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />

                        {/* Sink */}
                        <g filter="url(#softInner)">
                            <ellipse cx="210" cy="336" rx="38" ry="22" fill="#000000" fillOpacity="0.55" />
                            <ellipse cx="210" cy="334" rx="32" ry="18" fill="#F5F5F5" fillOpacity="0.12" />
                            <path
                                d="M210 322 V346"
                                stroke="#FFFFFF"
                                strokeOpacity="0.22"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <circle cx="210" cy="320" r="5" fill="#D9D9D9" fillOpacity="0.65" />
                        </g>

                        {/* Cooktop */}
                        <g opacity="0.95">
                            <rect x="120" y="340" width="180" height="28" rx="14" fill="#000000" fillOpacity="0.35" />
                            <circle cx="158" cy="354" r="9" fill="#000000" fillOpacity="0.55" />
                            <circle cx="210" cy="354" r="9" fill="#000000" fillOpacity="0.55" />
                            <circle cx="262" cy="354" r="9" fill="#000000" fillOpacity="0.55" />
                        </g>

                        {/* Counter edge */}
                        <rect x="62" y="292" width="296" height="12" rx="12" fill="#F5F5F5" fillOpacity="0.08" />
                        </g>
                    </svg>
                )}
            </div>

            <div className="mt-4 mx-auto w-full max-w-[460px]">
                <div className="rounded-[28px] bg-white/70 border border-[#D9D9D9] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.04)]">
                    <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0">
                            <div className="text-[#A67C52] font-extrabold text-[12px]">{current.en}</div>
                            <div className="mt-1 text-[#2B1702] font-black text-[18px] leading-7">
                                {current.ar}
                            </div>
                            <div className="mt-2 text-[13px] leading-6 text-[#2B1702]/80">
                                {current.descAr}
                            </div>
                            <div className="mt-2 text-[11px] leading-5 text-[#2B1702]/60" dir="ltr">
                                {current.descEn}
                            </div>
                        </div>

                        <div className="shrink-0">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#A67C52]/30 bg-[#A67C52]/10 px-4 py-2">
                                <span className="h-2 w-2 rounded-full bg-[#A67C52]" />
                                <span className="text-[#553B1E] font-extrabold text-[12px]">
                                    {String(step + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-3 flex gap-2 items-center">
                    {steps.map((s, idx) => {
                        const active = idx <= step;
                        return (
                            <div
                                key={s.en}
                                className={[
                                    'h-2 flex-1 rounded-full transition-all duration-300',
                                    active ? 'bg-[#A67C52]' : 'bg-[#D9D9D9]',
                                ].join(' ')}
                                aria-label={`step-${idx}`}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function Kitchens() {
    const companyName = import.meta.env.VITE_COMPANY_NAME || 'Ahmed Sophe';
    const cityName = import.meta.env.VITE_CITY_NAME || '';
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '';

    const [propertyType, setPropertyType] = useState<'شقة' | 'فيلا' | 'أي مشروع'>('شقة');
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [message, setMessage] = useState('');
    const [submitState, setSubmitState] = useState<'idle' | 'sent'>('idle');

    useEffect(() => {
        if (submitState !== 'sent') return;
        const id = window.setTimeout(() => setSubmitState('idle'), 3500);
        return () => window.clearTimeout(id);
    }, [submitState]);

    const waNumberNormalized = normalizeWhatsappNumber(whatsappNumber);
    const waCanUse = Boolean(waNumberNormalized);

    const whatsappHref = useMemo(() => {
        if (!waCanUse) return '';

        const safeName = name?.trim() ? name.trim() : 'عميل';
        const safeArea = area?.trim() ? area.trim() : 'حسب المساحة';
        const extra = message?.trim() ? `\nتفاصيل: ${message.trim()}` : '';
        const text = encodeURIComponent(
            `مرحبًا، أنا ${safeName}.\nنوع المشروع: ${propertyType}.\nالمقاس/المساحة: ${safeArea}.${extra}\nأريد تصميم وتنفيذ مطبخ مودرن فخم.`,
        );
        return `https://wa.me/${waNumberNormalized}?text=${text}`;
    }, [area, message, name, propertyType, waCanUse, waNumberNormalized]);

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (!waCanUse) return;

        // Open WhatsApp with prefilled message (fastest lead capture).
        window.open(whatsappHref, '_blank', 'noopener,noreferrer');
        setSubmitState('sent');
    }

    return (
        <>
            <Head title="Kitchen" />
            <MarketingLayout>
                <style>{`html { scroll-behavior: smooth; }`}</style>

                {/* Hero */}
                <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#A67C52]/25 bg-white/70 px-4 py-2 text-xs font-semibold text-[#553B1E]">
                                <span className="h-2 w-2 rounded-full bg-[#A67C52]" />
                                <span>Luxury Design • Premium Build</span>
                            </div>

                            <h1 className="mt-5 font-black text-[#2B1702] text-3xl sm:text-4xl lg:text-5xl leading-[1.1]">
                                <span className="block">مطبخك بيتصنع…</span>
                                <span className="block text-[#553B1E]">كأنه بيتجمع قدّام عينيك</span>
                            </h1>

                            <p className="mt-4 text-[#2B1702]/85 text-[15px] sm:text-[16px] leading-7 max-w-[520px]">
                                تصميم مودرن، خامات مختارة، وتشطيب راقي لكل تفصيلة. مناسب للشقق والفلل
                                <span className="text-[#A67C52] font-semibold"> لمستوى أعلى</span> في الجودة.
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <a
                                    href={waCanUse ? whatsappHref : undefined}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className={[
                                        'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200',
                                        waCanUse
                                            ? 'bg-[#A67C52] text-[#1B1B18] shadow-[0_16px_40px_rgba(166,124,82,0.25)] hover:-translate-y-[1px]'
                                            : 'bg-[#D9D9D9] text-[#5c5c5c] cursor-not-allowed',
                                    ].join(' ')}
                                    aria-disabled={!waCanUse}
                                >
                                    اطلب تصميم مبدئي
                                </a>
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold border border-[#D9D9D9] bg-white/70 hover:border-[#A67C52]/40 hover:-translate-y-[1px] transition-all duration-200"
                                >
                                    تواصل الآن
                                </a>
                            </div>

                            <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {[
                                    { ar: '3D Design', en: 'تصميم ثلاثي الأبعاد' },
                                    { ar: 'Made-to-Size', en: 'تفصيل على المقاس' },
                                    { ar: 'Premium Finish', en: 'تشطيب فخم' },
                                ].map((b) => (
                                    <div
                                        key={b.ar}
                                        className="rounded-2xl bg-white/70 border border-[#D9D9D9] p-4"
                                    >
                                        <div className="text-[#A67C52] font-extrabold text-[13px]">
                                            <span dir="ltr">{b.ar}</span>
                                        </div>
                                        <div className="text-[#2B1702]/80 text-[12px] mt-1">
                                            {b.en}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-7">
                                <div className="text-[12px] text-[#553B1E]/80">
                                    <span className="font-bold">English:</span>
                                    <span dir="ltr"> Your kitchen is built with a premium finish from A to Z.</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:pl-6">
                            <KitchenAssemblyHero />
                        </div>
                    </div>
                </section>

                {/* How we work */}
                <section id="how" className="mx-auto max-w-6xl px-4 pb-14">
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-[#2B1702]">كيف بنشتغل؟</h2>
                            <p className="mt-2 text-[#2B1702]/80 text-[14px]">
                                <span className="font-semibold">English:</span>{' '}
                                <span dir="ltr">A process built for clients who expect precision.</span>
                            </p>
                        </div>
                        <div className="hidden sm:block text-right">
                            <div className="text-[12px] text-[#A67C52] font-bold">Step-by-step</div>
                            <div className="text-[12px] text-[#2B1702]/70">Measure • Design • Build</div>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            {
                                n: '01',
                                ar: 'استلام المقاسات',
                                en: 'Measure on-site',
                                descAr: 'تفاصيل دقيقة للمساحة والزوايا—عشان التركيب يطلع مظبوط.',
                                descEn: 'Exact dimensions to ensure a seamless installation.',
                            },
                            {
                                n: '02',
                                ar: 'تصميم وموديل',
                                en: '3D Concept',
                                descAr: 'نقترح ستايل مودرن وتجهيز خاماتك قبل التصنيع.',
                                descEn: 'Pick a style and materials before we start cutting.',
                            },
                            {
                                n: '03',
                                ar: 'تصنيع وتشطيب وتسليم',
                                en: 'Premium Build',
                                descAr: 'تشطيب فخم مع متابعة للتركيب وتسليم نهائي.',
                                descEn: 'Premium finishing with on-site completion.',
                            },
                        ].map((s) => (
                            <div
                                key={s.n}
                                className="rounded-3xl bg-white/80 border border-[#D9D9D9] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.05)]"
                            >
                                <div className="text-[#A67C52] font-extrabold text-lg">{s.n}</div>
                                <div className="mt-3 text-[#553B1E] font-black text-[16px]">
                                    {s.ar}
                                </div>
                                <div className="mt-2 text-[12px] text-[#2B1702]/70 font-semibold">
                                    <span dir="ltr">{s.en}</span>
                                </div>
                                <div className="mt-3 text-[13px] leading-6 text-[#2B1702]/80">
                                    {s.descAr}
                                </div>
                                <div className="mt-2 text-[12px] leading-5 text-[#2B1702]/70">
                                    <span dir="ltr">{s.descEn}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Styles */}
                <section id="styles" className="mx-auto max-w-6xl px-4 pb-14">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#2B1702]">الستايلات اللي تناسب ذوقك</h2>
                        <p className="mt-2 text-[#2B1702]/80 text-[14px]">
                            <span className="font-semibold">English:</span>{' '}
                            <span dir="ltr">Curated designs for apartments and villas.</span>
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { nameAr: 'مودرن فلات', nameEn: 'Modern Flat', tag: 'Clean Lines' },
                            { nameAr: 'فخم خشب', nameEn: 'Wood Luxury', tag: 'Warm Premium' },
                            { nameAr: 'لاكيه مات', nameEn: 'Matte Lacquer', tag: 'Soft Touch' },
                            { nameAr: 'كلاسيك راقي', nameEn: 'Classic Elegant', tag: 'Timeless' },
                            { nameAr: 'ستانلس ميت', nameEn: 'Stainless Matte', tag: 'Contemporary' },
                            { nameAr: 'وود + زجاج', nameEn: 'Wood + Glass', tag: 'Signature' },
                        ].map((s, idx) => (
                            <div
                                key={s.nameEn}
                                className="rounded-3xl bg-white/80 border border-[#D9D9D9] p-6"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="text-[#553B1E] font-black text-[16px]">
                                            {s.nameAr}
                                        </div>
                                        <div className="mt-1 text-[12px] text-[#2B1702]/70 font-semibold">
                                            <span dir="ltr">{s.nameEn}</span>
                                        </div>
                                    </div>
                                    <div className="text-[#A67C52] font-extrabold text-lg">{String(idx + 1).padStart(2, '0')}</div>
                                </div>
                                <div className="mt-4 inline-flex rounded-full border border-[#A67C52]/25 bg-[#A67C52]/10 px-3 py-1 text-[12px] font-semibold text-[#553B1E]">
                                    {s.tag}
                                </div>
                                <div className="mt-5 h-20 rounded-2xl bg-gradient-to-r from-[#F5F5F5] to-[#D9D9D9] border border-[#D9D9D9] flex items-center justify-center text-[12px] text-[#553B1E]/80">
                                    Gallery / Photo Placeholder
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Engineers */}
                <section id="engineers" className="mx-auto max-w-6xl px-4 pb-14">
                    <div className="rounded-[32px] bg-[#2B1702] text-[#F5F5F5] p-8 sm:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div dir="rtl">
                                <h2 className="text-2xl sm:text-3xl font-black">للمهندسين</h2>
                                <p className="mt-3 text-[14px] leading-7 text-[#F5F5F5]/85">
                                    لما يكون المطلوب تنفيذ مطابق للمخططات، وبمستوى تشطيب يليق بالطبقة الرقية في المجتمع.
                                </p>
                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        'تنفيذ مطابق للمخططات',
                                        'دقة بالمقاسات والتفاصيل',
                                        'مواعيد ملتزمة وتسليم منظم',
                                        'تنسيق قبل التصنيع',
                                    ].map((t) => (
                                        <div key={t} className="rounded-2xl bg-white/5 border border-white/10 p-4 text-[13px] font-semibold">
                                            {t}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div dir="ltr" className="text-left">
                                <h3 className="text-xl sm:text-2xl font-black text-[#F8B803]">Engineer-friendly delivery</h3>
                                <p className="mt-3 text-[14px] leading-7 text-[#F5F5F5]/85">
                                    Exact measurements, structured build process, and premium finishing that matches the design intent.
                                </p>
                                <div className="mt-6 space-y-3">
                                    {[
                                        'Built to spec (drawings & details).',
                                        'Precise measurement control.',
                                        'Clear schedule & organized installation.',
                                        'Material coordination before manufacturing.',
                                    ].map((t) => (
                                        <div key={t} className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 p-4">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-[#A67C52]" />
                                            <span className="text-[13px] font-semibold">{t}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200"
                            >
                                Request Engineer Coordination
                            </a>
                            <div className="text-[12px] text-[#F5F5F5]/80">
                                <span className="font-semibold" dir="rtl">للأفراد أيضًا:</span>{' '}
                                <span dir="ltr">premium finish from day one.</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Materials */}
                <section id="materials" className="mx-auto max-w-6xl px-4 pb-14">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#2B1702]">الخامات اللي بتفرق</h2>
                        <p className="mt-2 text-[#2B1702]/80 text-[14px]">
                            <span className="font-semibold">English:</span>{' '}
                            <span dir="ltr">Premium materials with long-term durability.</span>
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { ar: 'خشب عالي الجودة', en: 'Premium Wood', color: '#A67C52' },
                            { ar: 'دهانات فاخرة', en: 'Luxury Coatings', color: '#D9D9D9' },
                            { ar: 'مقابض واكسسوارات', en: 'Hardware & Accessories', color: '#F8B803' },
                            { ar: 'مفصلات/نظام فتح', en: 'Hinges & Systems', color: '#A67C52' },
                            { ar: 'كونتر فاخر', en: 'Premium Countertop', color: '#553B1E' },
                            { ar: 'تشطيب نهائي راقي', en: 'Final Finishing', color: '#2B1702' },
                        ].map((m) => (
                            <div key={m.en} className="rounded-3xl bg-white/80 border border-[#D9D9D9] p-6">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <div className="text-[#553B1E] font-black text-[16px]">{m.ar}</div>
                                        <div className="mt-1 text-[12px] text-[#2B1702]/70 font-semibold">
                                            <span dir="ltr">{m.en}</span>
                                        </div>
                                    </div>
                                    <div className="h-10 w-10 rounded-2xl grid place-items-center border border-[#A67C52]/20 bg-[#A67C52]/10">
                                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: m.color }} />
                                    </div>
                                </div>
                                <div className="mt-4 text-[13px] leading-6 text-[#2B1702]/80">
                                    تصميم مودرن + خامات مختارة عشان تدي شكل راقي وثبات.
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Gallery placeholder */}
                <section className="mx-auto max-w-6xl px-4 pb-14">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#2B1702]">نماذج أعمال (قريبًا)</h2>
                        <p className="mt-2 text-[#2B1702]/80 text-[14px]">
                            <span className="font-semibold">English:</span>{' '}
                            <span dir="ltr">Your portfolio will live here.</span>
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {new Array(6).fill(null).map((_, idx) => (
                            <div key={idx} className="rounded-3xl bg-white/80 border border-[#D9D9D9] p-4">
                                <div className="h-44 rounded-2xl bg-gradient-to-br from-[#F5F5F5] to-[#D9D9D9] border border-[#D9D9D9] flex items-center justify-center">
                                    <span className="text-[12px] font-semibold text-[#553B1E]/80">Kitchen Photo {idx + 1}</span>
                                </div>
                                <div className="mt-3 text-[13px] font-semibold text-[#2B1702]">Premium Finish</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials + FAQ */}
                <section className="mx-auto max-w-6xl px-4 pb-14">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-[#2B1702]">آراء العملاء</h2>
                            <div className="mt-8 space-y-4">
                                {[
                                    {
                                        ar: 'تشطيب فخم والدقة كانت في كل تفصيلة.',
                                        en: 'Premium finishing and high precision.',
                                    },
                                    {
                                        ar: 'التواصل ممتاز والمواعيد ملتزمة.',
                                        en: 'Great communication and committed schedule.',
                                    },
                                    {
                                        ar: 'شكل المطبخ طلع أعلى من توقعاتي.',
                                        en: 'The final result exceeded expectations.',
                                    },
                                ].map((t, i) => (
                                    <div key={i} className="rounded-3xl bg-white/80 border border-[#D9D9D9] p-6">
                                        <div className="text-[#A67C52] font-extrabold">★★★★★</div>
                                        <div className="mt-2 text-[14px] font-semibold text-[#2B1702]">
                                            {t.ar}
                                        </div>
                                        <div className="mt-2 text-[12px] text-[#2B1702]/70" dir="ltr">
                                            {t.en}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-[#2B1702]">الأسئلة الشائعة</h2>
                            <div className="mt-8 space-y-3">
                                <details className="rounded-3xl bg-white/80 border border-[#D9D9D9] p-6">
                                    <summary className="font-semibold text-[#553B1E] cursor-pointer">
                                        كم مدة التنفيذ؟
                                    </summary>
                                    <p className="mt-3 text-[13px] leading-6 text-[#2B1702]/80">
                                        بتختلف حسب المقاسات والموديل. بعد المقاسات والتصميم بنحدد مدة واضحة
                                        وتفاصيل الجدول من البداية.
                                    </p>
                                </details>
                                <details className="rounded-3xl bg-white/80 border border-[#D9D9D9] p-6">
                                    <summary className="font-semibold text-[#553B1E] cursor-pointer">
                                        هل في تصميم 3D قبل التصنيع؟
                                    </summary>
                                    <p className="mt-3 text-[13px] leading-6 text-[#2B1702]/80">
                                        نعم، بنعرض لك تصور نهائي (3D concept) قبل ما نبدأ تصنيع عشان تراجع
                                        الستايل والخامات.
                                    </p>
                                </details>
                                <details className="rounded-3xl bg-white/80 border border-[#D9D9D9] p-6">
                                    <summary className="font-semibold text-[#553B1E] cursor-pointer">
                                        مناسب للشقق والفلل؟
                                    </summary>
                                    <p className="mt-3 text-[13px] leading-6 text-[#2B1702]/80">
                                        أكيد. سواء شقة أو فيلا أو أي مشروع—المهم الدقة بالمقاسات وتجهيز
                                        التشطيب بمستوى فخم.
                                    </p>
                                </details>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section id="contact" className="mx-auto max-w-6xl px-4 pb-16">
                    <div className="rounded-[32px] bg-[#FFFFFF] border border-[#D9D9D9] p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.05)]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-[#2B1702]">
                                    اطلب عرض سعر أو تصميم مبدئي
                                </h2>
                                <p className="mt-3 text-[14px] leading-7 text-[#2B1702]/80">
                                    اكتب بياناتك وسيتم فتح محادثة واتساب برسالة جاهزة. أسرع طريق للتواصل للطبقة الرقية
                                    اللي بتدور على تنفيذ مطابق.
                                </p>

                                <div className="mt-6 space-y-3">
                                    <div className="rounded-2xl border border-[#D9D9D9] bg-[#F5F5F5] p-4">
                                        <div className="font-bold text-[#553B1E] text-[13px]">WhatsApp</div>
                                        <div className="text-[12px] text-[#2B1702]/70 mt-1">
                                            <span dir="ltr">Fast reply • Premium coordination</span>
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-[#D9D9D9] bg-[#F5F5F5] p-4">
                                        <div className="font-bold text-[#553B1E] text-[13px]">Engineering Mode</div>
                                        <div className="text-[12px] text-[#2B1702]/70 mt-1">
                                            <span dir="ltr">Drawings → Matching build</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={onSubmit} className="w-full">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className="block">
                                        <div className="text-[12px] font-semibold text-[#553B1E] mb-2">اسمك</div>
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                            placeholder="اكتب اسمك"
                                            required={false}
                                        />
                                    </label>
                                    <label className="block">
                                        <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                            نوع العقار
                                        </div>
                                        <select
                                            value={propertyType}
                                            onChange={(e) => setPropertyType(e.target.value as any)}
                                            className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                        >
                                            <option value="شقة">شقة</option>
                                            <option value="فيلا">فيلا</option>
                                            <option value="أي مشروع">أي مشروع</option>
                                        </select>
                                    </label>
                                </div>

                                <div className="mt-4">
                                    <label className="block">
                                        <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                            المقاس/المساحة (اختياري)
                                        </div>
                                        <input
                                            value={area}
                                            onChange={(e) => setArea(e.target.value)}
                                            className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                            placeholder="مثال: 4x3 / عدد قطع / مطبخ صغير أو كبير"
                                        />
                                    </label>
                                </div>

                                <div className="mt-4">
                                    <label className="block">
                                        <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                            تفاصيل سريعة (اختياري)
                                        </div>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="min-h-[92px] w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                            placeholder="ذوقك؟ خامة مفضلة؟ هل التنفيذ خلال مدة معينة؟"
                                        />
                                    </label>
                                </div>

                                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                                    <button
                                        type="submit"
                                        disabled={!waCanUse}
                                        className={[
                                            'rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200',
                                            waCanUse
                                                ? 'bg-[#A67C52] text-[#1B1B18] hover:-translate-y-[1px]'
                                                : 'bg-[#D9D9D9] text-[#5c5c5c] cursor-not-allowed',
                                        ].join(' ')}
                                    >
                                        {submitState === 'sent' ? 'تم فتح واتساب' : 'ارسل على واتساب'}
                                    </button>

                                    <div className="text-[12px] text-[#2B1702]/70 leading-5">
                                        <span dir="ltr">No backend needed.</span>
                                        <br />
                                        <span>محادثة واتساب برسالة جاهزة.</span>
                                    </div>
                                </div>

                                {!waCanUse && (
                                    <div className="mt-4 rounded-2xl border border-[#D9D9D9] bg-[#F5F5F5] p-4 text-[12px] text-[#2B1702]/80">
                                        لإظهار زر واتساب بشكل فعلي، حدّث قيمة `VITE_WHATSAPP_NUMBER` في ملف
                                        <span className="font-semibold"> .env</span> أو <span className="font-semibold">.env.example</span>.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </section>

            </MarketingLayout>
        </>
    );
}

