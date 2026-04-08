import { Head, Link } from '@inertiajs/react';
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react';
import MarketingLayout from '@/components/marketing/marketing-layout';
import { RevealOnScroll } from '@/components/marketing/reveal-on-scroll';
import { engineerShowcaseHome } from '@/data/engineers-content';
import { marketingServices } from '@/data/marketing-services';
import { cn } from '@/lib/utils';

const SLIDE_INTERVAL_MS = 6500;
/** محيط الدائرة في مؤشر السلايدر (r=16 في viewBox 36) */
const HERO_DOT_RING_C = 2 * Math.PI * 16;

type HeroSlide = {
    image: string;
    titleAr: string;
    titleEn?: string;
    subtitleAr: string;
};

const projectImages = [
    '/images/projects/kitchen-01.png',
    '/images/projects/kitchen-02.png',
    '/images/projects/kitchen-03.png',
    '/images/projects/kitchen-04.png',
    '/images/projects/kitchen-05.png',
    '/images/projects/kitchen-06.png',
    '/images/projects/kitchen-07.png',
    '/images/projects/kitchen-08.png',
    '/images/projects/kitchen-09.png',
    '/images/projects/kitchen-10.png',
    '/images/projects/kitchen-11.png',
];

const heroSlides: HeroSlide[] = [
    {
        image: projectImages[8],
        titleAr: 'خلّي مطبخك قطعة فنية في بيتك',
        subtitleAr:
            'تصميمات مودرن فخمة، خامات مختارة، وتنفيذ دقيق للشقق والفلل والمهندسين.',
    },
    {
        image: projectImages[4],
        titleAr: 'مساحات واسعة… تشطيب يليق بالذوق',
        subtitleAr: 'جزيرة رخام، إضاءة مدروسة، وتفاصيل تخلّي المطبخ قلب البيت.',
    },
    {
        image: projectImages[10],
        titleAr: 'ستايلات مختلفة لنفس الجودة',
        subtitleAr: 'من الداكن للفاتح—نفس مستوى التشطيب والالتزام بالمقاسات.',
    },
];

const partnerBrands = [
    { name: 'Blum', hint: 'Hardware', logo: '/images/brands/blum.svg' },
    { name: 'Hettich', hint: 'Systems', logo: '/images/brands/hettich.svg' },
    { name: 'EGGER', hint: 'Surfaces', logo: '/images/brands/egger.svg' },
    { name: 'BLANCO', hint: 'Sinks', logo: '/images/brands/blanco.svg' },
    { name: 'Kessebohmer', hint: 'Storage', logo: '/images/brands/kessebohmer.svg' },
    { name: 'Hafele', hint: 'Accessories', logo: '/images/brands/hafele.svg' },
];

const partnerBrandsSlider = [...partnerBrands, ...partnerBrands];

function normalizeWhatsappNumber(raw: string): string {
    return raw.replace(/[^\d]/g, '');
}

function HeroSlider() {
    const [active, setActive] = useState(0);
    const count = heroSlides.length;

    const goNext = useCallback(() => {
        setActive((i) => (i + 1) % count);
    }, [count]);

    const goPrev = useCallback(() => {
        setActive((i) => (i - 1 + count) % count);
    }, [count]);

    useEffect(() => {
        const id = window.setInterval(goNext, SLIDE_INTERVAL_MS);
        return () => window.clearInterval(id);
    }, [goNext]);

    return (
        <div className="marketing-hero-frame relative rounded-[32px] border border-[#2B1702]/25 group">
            {/* الخلفيات فقط اللي عليها overflow-hidden عشان ما يتقصّش النص/الأزرار */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
                {heroSlides.map((slide, i) => (
                    <div
                        key={slide.image + i}
                        className={[
                            'absolute inset-0 transition-opacity duration-700 ease-out',
                            i === active ? 'opacity-100 z-0' : 'opacity-0 z-[1]',
                        ].join(' ')}
                        aria-hidden={i !== active}
                    >
                        <img
                            src={slide.image}
                            alt=""
                            className={cn(
                                'absolute inset-0 h-full w-full object-cover',
                                i === active && 'marketing-hero-slide-img is-active',
                            )}
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-[#2B1702]/18 to-black/58" />
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={goPrev}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/20 p-2.5 text-white backdrop-blur hover:bg-black/35 transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 md:opacity-100"
                aria-label="الشريحة السابقة"
            >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                type="button"
                onClick={goNext}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/20 p-2.5 text-white backdrop-blur hover:bg-black/35 transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 md:opacity-100"
                aria-label="الشريحة التالية"
            >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <div className="relative z-10 flex min-h-[min(70svh,920px)] flex-col justify-end px-6 py-10 pb-12 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
                <div className="max-w-2xl marketing-hero-animate">
                    <div className="mh-badge inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white">
                        Premium Kitchen Design & Build
                    </div>
                    <h1
                        key={active}
                        className="mh-title mt-6 text-white font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.08]"
                    >
                        {heroSlides[active]?.titleAr}
                    </h1>
                    {heroSlides[active]?.titleEn && (
                        <p
                            key={`${active}-en`}
                            className="mh-sub mt-2 text-white/80 text-sm font-medium"
                            dir="ltr"
                        >
                            {heroSlides[active].titleEn}
                        </p>
                    )}
                    <p
                        key={`${active}-sub`}
                        className="mh-sub mt-5 text-white/90 text-[15px] sm:text-[17px] leading-7 max-w-xl"
                    >
                        {heroSlides[active]?.subtitleAr}
                    </p>

                    <div className="mh-cta mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold bg-[#A67C52] text-[#1B1B18] hover:brightness-[1.05] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            اطلب تصميم مبدئي
                        </Link>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold border border-white/40 bg-white/10 text-white hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            نموذج سريع
                        </a>
                        <Link
                            href="/gallery"
                            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold border border-white/40 bg-white/10 text-white hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            شوف معرض الأعمال
                        </Link>
                    </div>

                    <div
                        className="mh-dots mt-10 flex items-center justify-center gap-2 sm:gap-3 pb-2"
                        role="tablist"
                        aria-label="شرائح الهيرو"
                        style={
                            {
                                '--hero-slide-ms': `${SLIDE_INTERVAL_MS}ms`,
                                '--hero-ring-len': `${HERO_DOT_RING_C}`,
                            } as CSSProperties
                        }
                    >
                        {heroSlides.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                role="tab"
                                aria-selected={i === active}
                                aria-label={`شريحة ${i + 1} من ${count}`}
                                onClick={() => setActive(i)}
                                className={cn(
                                    'relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300',
                                    i === active ? 'scale-100' : 'scale-90 hover:scale-100',
                                )}
                            >
                                {i === active ? (
                                    <>
                                        <svg
                                            key={active}
                                            className="pointer-events-none absolute inset-0 h-10 w-10 -rotate-90"
                                            viewBox="0 0 36 36"
                                            aria-hidden
                                        >
                                            <circle
                                                cx="18"
                                                cy="18"
                                                r="16"
                                                fill="none"
                                                stroke="rgba(255,255,255,0.28)"
                                                strokeWidth="2"
                                            />
                                            <circle
                                                cx="18"
                                                cy="18"
                                                r="16"
                                                fill="none"
                                                stroke="#A67C52"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                className="marketing-hero-dot-ring"
                                                style={{
                                                    strokeDasharray: HERO_DOT_RING_C,
                                                    strokeDashoffset: HERO_DOT_RING_C,
                                                }}
                                            />
                                        </svg>
                                        <span className="relative z-10 h-2.5 w-2.5 rounded-full bg-[#A67C52] shadow-[0_0_14px_rgba(166,124,82,0.75)] ring-2 ring-white/35" />
                                    </>
                                ) : (
                                    <span className="h-2.5 w-2.5 rounded-full border border-white/55 bg-white/15 shadow-sm transition-colors hover:border-white/80 hover:bg-white/35" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const footerNav = [
    { href: '/about', ar: 'عن الشركة', en: 'About' },
    { href: '/services', ar: 'الخدمات', en: 'Services' },
    { href: '/gallery', ar: 'المعرض', en: 'Gallery' },
    { href: '/process', ar: 'طريقة العمل', en: 'Process' },
    { href: '/engineers', ar: 'للمهندسين', en: 'Engineers' },
    { href: '/contact', ar: 'تواصل', en: 'Contact' },
];

export default function Home() {
    const image2 = projectImages[1];

    const companyName = String(import.meta.env.VITE_COMPANY_NAME || 'Ahmed Sophe');
    const cityName = String(import.meta.env.VITE_CITY_NAME || '');
    const whatsappNumber = String(import.meta.env.VITE_WHATSAPP_NUMBER || '');
    const normalized = normalizeWhatsappNumber(whatsappNumber);
    const waCanUse = Boolean(normalized);

    const [propertyType, setPropertyType] = useState<'شقة' | 'فيلا' | 'أي مشروع'>('شقة');
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [message, setMessage] = useState('');

    const whatsappHref = useMemo(() => {
        if (!waCanUse) return '';
        const safeName = name?.trim() ? name.trim() : 'عميل';
        const safeArea = area?.trim() ? area.trim() : 'حسب المساحة';
        const extra = message?.trim() ? `\nتفاصيل: ${message.trim()}` : '';
        const text = encodeURIComponent(
            `مرحبًا، أنا ${safeName}.\nنوع المشروع: ${propertyType}.\nالمقاس/المساحة: ${safeArea}.${extra}\nأريد تصميم وتنفيذ مطبخ مودرن فخم.`,
        );
        return `https://wa.me/${normalized}?text=${text}`;
    }, [area, message, name, propertyType, normalized, waCanUse]);

    return (
        <>
            <Head title="Home" />
            <MarketingLayout hideDefaultFooter>
                <section className="mx-auto max-w-6xl px-4 pt-6 pb-10">
                    <HeroSlider />
                </section>

                <section className="border-y border-[#D9D9D9] bg-[#F5F5F5]/80 py-10">
                    <div className="mx-auto max-w-6xl px-4">
                        <RevealOnScroll className="text-center mb-8">
                            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#2B1702]">
                                براندات وشركاء نثق فيهم
                            </h2>
                            <div className="marketing-accent-line mt-3" aria-hidden />
                            <p className="mt-4 text-[13px] sm:text-[14px] text-[#553B1E]/75 max-w-xl mx-auto">
                                نستخدم مكونات وخامات من موردين معتمدين عشان التشطيب يفضل ثابت مع
                                الوقت.
                            </p>
                            <p className="mt-1 text-[11px] text-[#2B1702]/55" dir="ltr">
                                Trusted suppliers & hardware partners
                            </p>
                        </RevealOnScroll>
                    </div>

                    <RevealOnScroll delayMs={90}>
                        <div className="relative mt-2 w-full min-w-0 overflow-hidden" dir="ltr">
                            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-16 bg-gradient-to-r from-[#F5F5F5] to-transparent" />
                            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-16 bg-gradient-to-l from-[#F5F5F5] to-transparent" />

                            <div className="brand-slider-track flex w-max flex-nowrap items-center gap-3 sm:gap-4 will-change-transform">
                                {partnerBrandsSlider.map((b, idx) => (
                                    <div
                                        key={`${b.name}-${idx}`}
                                        className="marketing-card-glass flex min-w-[250px] shrink-0 flex-col items-center justify-center rounded-2xl bg-white/95 px-4 py-3"
                                    >
                                        <img
                                            src={b.logo}
                                            alt={b.name}
                                            className="h-16 w-full max-h-16 object-contain object-center"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                ))}
                            </div>

                            <style>{`
                                .brand-slider-track {
                                    animation: brandMarquee 22s linear infinite;
                                }
                                .brand-slider-track:hover {
                                    animation-play-state: paused;
                                }
                                @keyframes brandMarquee {
                                    0% {
                                        transform: translate3d(0, 0, 0);
                                    }
                                    100% {
                                        transform: translate3d(-50%, 0, 0);
                                    }
                                }
                                @media (max-width: 768px) {
                                    .brand-slider-track {
                                        animation-duration: 16s;
                                    }
                                }
                                @media (prefers-reduced-motion: reduce) {
                                    .brand-slider-track {
                                        animation: none;
                                        flex-wrap: wrap;
                                        justify-content: center;
                                        row-gap: 0.75rem;
                                        width: 100%;
                                        max-width: min(100%, 72rem);
                                        margin-left: auto;
                                        margin-right: auto;
                                        padding-left: 1rem;
                                        padding-right: 1rem;
                                    }
                                }
                            `}</style>
                        </div>
                    </RevealOnScroll>
                </section>

                <section
                    id="services"
                    className="marketing-section-ivory scroll-mt-28 border-t border-[#D9D9D9]/80 py-14 sm:py-16"
                >
                    <div className="mx-auto max-w-6xl px-4">
                        <RevealOnScroll className="text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#2B1702]">
                                خدماتنا
                            </h2>
                            <div className="marketing-accent-line mt-4" aria-hidden />
                            <p className="mt-5 text-[14px] leading-7 text-[#2B1702]/80">
                                تصميم وتصنيع وتركيب بخطوات واضحة، مع خامات مختارة وتشطيب
                                <span className="text-[#A67C52] font-semibold"> يليق بالذوق الراقي</span>.
                            </p>
                            <p className="mt-1 text-[12px] text-[#553B1E]/65" dir="ltr">
                                Design • Build • Install — curated materials & premium finish.
                            </p>
                        </RevealOnScroll>

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {marketingServices.map((s, index) => (
                                <RevealOnScroll key={s.en} delayMs={index * 55}>
                                    <article className="group rounded-3xl overflow-hidden border border-[#D9D9D9] bg-[#F5F5F5]/50 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.08)]">
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <img
                                                src={s.image}
                                                alt={s.imageAlt}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#2B1702]/75 via-[#2B1702]/15 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                                                <h3 className="text-white font-black text-lg leading-snug">
                                                    {s.ar}
                                                </h3>
                                                <p
                                                    className="mt-1 text-[11px] sm:text-[12px] text-white/85 font-semibold"
                                                    dir="ltr"
                                                >
                                                    {s.en}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-5 bg-white/90">
                                            <p className="text-[13px] leading-6 text-[#2B1702]/85">
                                                {s.descAr}
                                            </p>
                                        </div>
                                    </article>
                                </RevealOnScroll>
                            ))}
                        </div>

                        <RevealOnScroll delayMs={100} className="mt-10 flex justify-center">
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold bg-[#553B1E] text-[#F5F5F5] hover:bg-[#2B1702] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_16px_40px_rgba(85,59,30,0.2)]"
                            >
                                عرض تفاصيل الخدمات
                            </Link>
                        </RevealOnScroll>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-4 py-14">
                    <RevealOnScroll className="text-center">
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#2B1702]">
                            Explore our kitchen designs
                        </h2>
                        <div className="marketing-accent-line mt-4" aria-hidden />
                        <p className="mt-5 text-[#2B1702]/70 text-[14px] max-w-2xl mx-auto">
                            صور حقيقية تعكس جودة التنفيذ، تنوع الستايلات، ولمسة التشطيب
                            النهائية.
                        </p>
                    </RevealOnScroll>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {projectImages.slice(0, 6).map((img, index) => (
                            <RevealOnScroll key={img} delayMs={index * 70}>
                                <article className="rounded-3xl overflow-hidden border border-[#D9D9D9] bg-white/80 shadow-[0_24px_60px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.08)]">
                                    <img
                                        src={img}
                                        alt={`Kitchen Project ${index + 1}`}
                                        className="h-56 w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                                    />
                                    <div className="p-5">
                                        <h3 className="font-black text-[#2B1702]">
                                            Kitchen Project {String(index + 1).padStart(2, '0')}
                                        </h3>
                                        <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#553B1E]/70">
                                            Modern / Top sellers
                                        </p>
                                    </div>
                                </article>
                            </RevealOnScroll>
                        ))}
                    </div>
                </section>

                <section
                    id="engineers"
                    className="scroll-mt-28 border-t border-[#553B1E]/25 bg-gradient-to-b from-[#2B1702] via-[#2B1702] to-[#1f1308] pt-14 pb-20 sm:pt-16 sm:pb-24 relative z-0"
                >
                    <div className="mx-auto max-w-6xl px-4">
                        <RevealOnScroll className="text-center max-w-2xl mx-auto">
                            <span className="inline-block text-[#F8B803] text-xs font-bold uppercase tracking-[0.14em]">
                                Engineers & contractors
                            </span>
                            <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-[#F5F5F5]">
                                للمهندسين عندنا
                            </h2>
                            <div className="marketing-accent-line marketing-accent-line--light mt-4" aria-hidden />
                            <p className="mt-5 text-[14px] leading-7 text-[#F5F5F5]/85">
                                تنسيق قبل التصنيع، مقاسات دقيقة، وتنفيذ مطابق للمخططات — بمستوى تشطيب
                                <span className="text-[#A67C52] font-semibold"> فخم وواضح </span>.
                            </p>
                            <p className="mt-1 text-[12px] text-[#C4A484]/90" dir="ltr">
                                Coordination • specs • on-site delivery you can trust.
                            </p>
                        </RevealOnScroll>

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {engineerShowcaseHome.map((item, index) => (
                                <RevealOnScroll key={item.src} delayMs={index * 60}>
                                    <article className="group rounded-2xl overflow-hidden border border-white/15 bg-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-[#A67C52]/40 hover:shadow-[0_24px_50px_rgba(0,0,0,0.35)]">
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={item.src}
                                                alt={item.labelAr}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                                                <h3 className="text-white font-bold text-[13px] sm:text-sm leading-snug">
                                                    {item.labelAr}
                                                </h3>
                                                <p
                                                    className="mt-0.5 text-[10px] sm:text-[11px] text-white/80 font-semibold"
                                                    dir="ltr"
                                                >
                                                    {item.labelEn}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                </RevealOnScroll>
                            ))}
                        </div>

                        <RevealOnScroll
                            delayMs={120}
                            className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 pb-2"
                        >
                            <Link
                                href="/engineers"
                                className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold bg-[#A67C52] text-[#1B1B18] hover:brightness-[1.06] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_16px_40px_rgba(166,124,82,0.35)]"
                            >
                                صفحة المهندسين
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold border border-white/25 bg-white/5 text-[#F5F5F5] hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                تواصل معنا
                            </Link>
                        </RevealOnScroll>
                    </div>
                </section>

                <section className="relative z-10 -mt-10 sm:-mt-14 rounded-t-[32px] bg-[#F5F5F5] pt-14 sm:pt-20 pb-14 shadow-[0_-16px_48px_-28px_rgba(43,23,2,0.18)]">
                    <div className="mx-auto max-w-6xl px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
                        <RevealOnScroll>
                            <div className="rounded-[30px] overflow-hidden border border-[#D9D9D9]/90 bg-[#1a120a] min-h-[320px] relative shadow-[0_24px_60px_-20px_rgba(43,23,2,0.15)]">
                                <img
                                    src={image2}
                                    alt="Kitchen detail"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                                <div className="relative z-10 p-7 flex h-full items-end">
                                    <div>
                                        <div className="text-[#F8B803] text-xs font-semibold uppercase tracking-[0.13em]">
                                            For Premium Clients
                                        </div>
                                        <h3 className="mt-2 text-white text-3xl font-black leading-tight">
                                            تشطيب يليق
                                            <br />
                                            بالطبقة الراقية
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delayMs={100}>
                            <div className="rounded-[30px] bg-[#2B1702] p-8 sm:p-10 text-[#F5F5F5]">
                                <h3 className="text-3xl font-black leading-tight">
                                    من الفكرة
                                    <br />
                                    للتنفيذ الكامل
                                </h3>
                                <p className="mt-4 text-[14px] leading-7 text-[#F5F5F5]/85">
                                    بنشتغل بخطوات واضحة: مقاسات دقيقة، تصميم مقترح، تصنيع منظم،
                                    وتسليم نهائي بمستوى جودة ثابت.
                                </p>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    {['Measure', 'Design', 'Build', 'Install'].map((step) => (
                                        <div
                                            key={step}
                                            className="rounded-xl border border-white/15 bg-white/5 p-3 text-sm font-semibold"
                                        >
                                            {step}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-7">
                                    <Link
                                        href="/process"
                                        className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold bg-[#A67C52] text-[#1B1B18] hover:brightness-[1.05] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        شوف طريقة العمل
                                    </Link>
                                </div>
                            </div>
                        </RevealOnScroll>
                        </div>
                    </div>
                </section>

                <section
                    id="contact"
                    className="marketing-section-ivory scroll-mt-28 border-t border-[#D9D9D9]/80 py-14 sm:py-16"
                >
                    <div className="mx-auto max-w-6xl px-4">
                        <RevealOnScroll className="text-center max-w-2xl mx-auto mb-10">
                            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#2B1702]">
                                تواصل معنا
                            </h2>
                            <div className="marketing-accent-line mt-4" aria-hidden />
                            <p className="mt-5 text-[14px] leading-7 text-[#2B1702]/80">
                                املأ البيانات التالية وسيفتح واتساب برسالة جاهزة.
                                <span className="text-[#A67C52] font-semibold"> أسرع رد </span>
                                للاستفسار والتصميم المبدئي.
                            </p>
                            <p className="mt-1 text-[12px] text-[#553B1E]/65" dir="ltr">
                                Quick contact — same flow as the full contact page.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll delayMs={80}>
                            <div className="rounded-[32px] border border-[#D9D9D9]/90 bg-gradient-to-br from-[#FDFCFA] via-[#F5F5F5] to-[#F0EDE8] p-6 sm:p-10 shadow-[0_32px_80px_-24px_rgba(43,23,2,0.1),0_0_0_1px_rgba(166,124,82,0.08)]">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                                <div>
                                    <h3 className="text-xl font-black text-[#2B1702]">
                                        {companyName}
                                        {cityName ? (
                                            <span className="text-[#553B1E] font-semibold text-base mr-2">
                                                — {cityName}
                                            </span>
                                        ) : null}
                                    </h3>
                                    <p className="mt-3 text-[13px] leading-7 text-[#2B1702]/75">
                                        نركّز على مطابخ مودرن فخمة للأفراد والمهندسين، بخطوات واضحة
                                        من القياس حتى التسليم.
                                    </p>
                                    <div className="mt-6 space-y-3">
                                        <Link
                                            href="/contact"
                                            className="block rounded-2xl border border-[#D9D9D9] bg-white p-4 text-sm font-semibold text-[#553B1E] hover:border-[#A67C52]/50 transition-colors"
                                        >
                                            صفحة التواصل الكاملة ←
                                        </Link>
                                        {waCanUse && (
                                            <a
                                                href={`https://wa.me/${normalized}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block rounded-2xl border border-[#A67C52]/40 bg-[#553B1E]/5 p-4 text-sm font-semibold text-[#553B1E] hover:bg-[#553B1E]/10 transition-colors"
                                                dir="ltr"
                                            >
                                                WhatsApp: +{normalized}
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (!waCanUse) return;
                                        window.open(whatsappHref, '_blank', 'noopener,noreferrer');
                                    }}
                                    className="w-full"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <label className="block">
                                            <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                                اسمك
                                            </div>
                                            <input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                                placeholder="اكتب اسمك"
                                            />
                                        </label>
                                        <label className="block">
                                            <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                                نوع العقار
                                            </div>
                                            <select
                                                value={propertyType}
                                                onChange={(e) =>
                                                    setPropertyType(
                                                        e.target.value as 'شقة' | 'فيلا' | 'أي مشروع',
                                                    )
                                                }
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
                                                placeholder="مثال: 4x3 / عدد قطع"
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
                                                className="min-h-[88px] w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                                placeholder="ذوقك؟ خامة؟ توقيت التنفيذ؟"
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
                                            {waCanUse ? 'ارسل على واتساب' : 'حدّد رقم واتساب في .env'}
                                        </button>
                                        <div className="text-[12px] text-[#2B1702]/70 leading-5" dir="ltr">
                                            Prefilled message — opens WhatsApp.
                                        </div>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                <footer className="w-full bg-[#2B1702] text-[#F5F5F5] pt-12 pb-10 sm:pt-14 sm:pb-12">
                    <div className="mx-auto max-w-6xl px-4">
                        <RevealOnScroll>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-[#A67C52] grid place-items-center text-[#1B1B18] font-bold">
                                        K
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-[#F5F5F5]">{companyName}</div>
                                        {cityName ? (
                                            <div className="text-[12px] text-[#C4A484]">{cityName}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <p className="mt-4 text-[13px] leading-6 text-[#F5F5F5]/75">
                                    مطابخ مودرن فخمة — تصميم وتنفيذ بجودة ثابتة للشقق والفلل والمهندسين.
                                </p>
                            </div>

                            <div>
                                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#C4A484] mb-4">
                                    روابط سريعة
                                </div>
                                <ul className="space-y-2.5 text-[13px]">
                                    {footerNav.map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className="text-[#F5F5F5]/90 hover:text-[#A67C52] transition-colors"
                                            >
                                                {item.ar}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#C4A484] mb-4">
                                    تواصل
                                </div>
                                <ul className="space-y-2.5 text-[13px] text-[#F5F5F5]/85">
                                    <li>
                                        <Link href="/contact" className="hover:text-[#A67C52] transition-colors">
                                            نموذج التواصل
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="#contact" className="hover:text-[#A67C52] transition-colors">
                                            نموذج سريع (هذه الصفحة)
                                        </a>
                                    </li>
                                    {waCanUse && (
                                        <li dir="ltr">
                                            <a
                                                href={`https://wa.me/${normalized}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-[#A67C52] transition-colors"
                                            >
                                                WhatsApp
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                <div className="text-[13px] font-bold text-[#F5F5F5]">
                                    جاهز لمطبخ جديد؟
                                </div>
                                <p className="mt-2 text-[12px] leading-6 text-[#F5F5F5]/70">
                                    اطلب تصميم مبدئي أو راجع معرض الأعمال.
                                </p>
                                <div className="mt-4 flex flex-col gap-2">
                                    <Link
                                        href="/contact"
                                        className="inline-flex justify-center rounded-xl bg-[#A67C52] px-4 py-2.5 text-sm font-semibold text-[#1B1B18] hover:brightness-[1.05] transition-all"
                                    >
                                        اطلب تصميم
                                    </Link>
                                    <Link
                                        href="/gallery"
                                        className="inline-flex justify-center rounded-xl border border-white/25 px-4 py-2.5 text-sm font-semibold text-[#F5F5F5] hover:bg-white/10 transition-all"
                                    >
                                        المعرض
                                    </Link>
                                </div>
                            </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-[11px] text-[#C4A484]/90">
                            <div>
                                © {new Date().getFullYear()} {companyName}. جميع الحقوق محفوظة.
                            </div>
                            <div dir="ltr">Premium kitchens • Design & build</div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </footer>
            </MarketingLayout>
        </>
    );
}
