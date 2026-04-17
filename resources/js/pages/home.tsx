import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react';
import MarketingLayout from '@/components/marketing/marketing-layout';
import { RevealOnScroll } from '@/components/marketing/reveal-on-scroll';
import { engineerShowcaseHome } from '@/data/engineers-content';
import { marketingServices, type MarketingService } from '@/data/marketing-services';
import { useCms } from '@/hooks/use-cms';
import { useSiteConfig } from '@/hooks/use-site-config';
import { cn } from '@/lib/utils';

const SLIDE_INTERVAL_MS = 6500;
/** محيط الدائرة في مؤشر السلايدر (r=16 في viewBox 36) */
const HERO_DOT_RING_C = 2 * Math.PI * 16;

type HeroSlide = {
    image: string;
    titleAr: string;
    titleEn?: string;
    subtitleAr: string;
    subtitleEn?: string;
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

const defaultHeroSlides: HeroSlide[] = [
    {
        image: projectImages[8],
        titleAr: 'خلّي مطبخك قطعة فنية في بيتك',
        titleEn: 'Turn your kitchen into art',
        subtitleAr:
            'تصميمات مودرن فخمة، خامات مختارة، وتنفيذ دقيق للشقق والفلل والمهندسين.',
        subtitleEn:
            'Premium modern designs with curated materials and precise execution.',
    },
    {
        image: projectImages[4],
        titleAr: 'مساحات واسعة… تشطيب يليق بالذوق',
        titleEn: 'Spacious feel, elegant finish',
        subtitleAr: 'جزيرة رخام، إضاءة مدروسة، وتفاصيل تخلّي المطبخ قلب البيت.',
        subtitleEn: 'Marble islands, thoughtful lighting, and premium details.',
    },
    {
        image: projectImages[10],
        titleAr: 'ستايلات مختلفة لنفس الجودة',
        titleEn: 'Different styles, same quality',
        subtitleAr: 'من الداكن للفاتح—نفس مستوى التشطيب والالتزام بالمقاسات.',
        subtitleEn: 'From dark to light themes with consistent quality and fit.',
    },
];

type PartnerBrand = { name: string; hint: string; logo: string };

const defaultPartnerBrands: PartnerBrand[] = [
    { name: 'Blum', hint: 'Hardware', logo: '/images/brands/blum.svg' },
    { name: 'Hettich', hint: 'Systems', logo: '/images/brands/hettich.svg' },
    { name: 'EGGER', hint: 'Surfaces', logo: '/images/brands/egger.svg' },
    { name: 'BLANCO', hint: 'Sinks', logo: '/images/brands/blanco.svg' },
    { name: 'Kessebohmer', hint: 'Storage', logo: '/images/brands/kessebohmer.svg' },
    { name: 'Hafele', hint: 'Accessories', logo: '/images/brands/hafele.svg' },
];

function normalizeWhatsappNumber(raw: string): string {
    return raw.replace(/[^\d]/g, '');
}

function HeroSlider({ slides }: { slides: HeroSlide[] }) {
    const { t, locale } = useCms();
    const isEn = locale === 'en';
    const [active, setActive] = useState(0);
    const count = slides.length;

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
                {slides.map((slide, i) => (
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
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 p-2.5 text-white hover:bg-black/55 transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 md:opacity-100"
                aria-label={t('home.hero.ariaPrev', 'الشريحة السابقة', 'Previous slide')}
            >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                type="button"
                onClick={goNext}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 p-2.5 text-white hover:bg-black/55 transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 md:opacity-100"
                aria-label={t('home.hero.ariaNext', 'الشريحة التالية', 'Next slide')}
            >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <div className="relative z-10 flex min-h-[min(70svh,920px)] flex-col justify-end px-6 py-10 pb-12 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
                <div className="max-w-2xl marketing-hero-animate">
                    <div className="mh-badge inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white">
                        {t(
                            'home.hero.badge',
                            'تصميم وتنفيذ مطابخ فاخرة',
                            'Premium Kitchen Design & Build',
                        )}
                    </div>
                    <h1
                        key={active}
                        className="mh-title mt-6 text-white font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.08]"
                        dir={isEn ? 'ltr' : 'rtl'}
                    >
                        {isEn && slides[active]?.titleEn?.trim()
                            ? slides[active].titleEn
                            : slides[active]?.titleAr}
                    </h1>
                    <p
                        key={`${active}-sub`}
                        className="mh-sub mt-5 text-white/90 text-[15px] sm:text-[17px] leading-7 max-w-xl"
                        dir={isEn ? 'ltr' : 'rtl'}
                    >
                        {isEn && slides[active]?.subtitleEn?.trim()
                            ? slides[active].subtitleEn
                            : slides[active]?.subtitleAr}
                    </p>

                    <div className="mh-cta mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold bg-[#A67C52] text-[#1B1B18] hover:brightness-[1.05] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {t('home.hero.ctaPrimary', 'اطلب تصميم مبدئي', 'Request a design draft')}
                        </Link>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold border border-white/40 bg-white/10 text-white hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {t('home.hero.ctaQuick', 'نموذج سريع', 'Quick form')}
                        </a>
                        <Link
                            href="/gallery"
                            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold border border-white/40 bg-white/10 text-white hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {t('home.hero.ctaGallery', 'شوف معرض الأعمال', 'View portfolio')}
                        </Link>
                    </div>

                    <div
                        className="mh-dots mt-10 flex items-center justify-center gap-2 sm:gap-3 pb-2"
                        role="tablist"
                        aria-label={t('home.hero.dotsAria', 'شرائح الهيرو', 'Hero slides')}
                        style={
                            {
                                '--hero-slide-ms': `${SLIDE_INTERVAL_MS}ms`,
                                '--hero-ring-len': `${HERO_DOT_RING_C}`,
                            } as CSSProperties
                        }
                    >
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                role="tab"
                                aria-selected={i === active}
                                aria-label={`${t('home.hero.slidePrefix', 'شريحة', 'Slide')} ${i + 1} ${t('home.hero.slideOf', 'من', 'of')} ${count}`}
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

const footerNavItems = [
    { href: '/about', key: 'nav.about', fbAr: 'عن الشركة', fbEn: 'About' },
    { href: '/services', key: 'nav.services', fbAr: 'الخدمات', fbEn: 'Services' },
    { href: '/gallery', key: 'nav.gallery', fbAr: 'المعرض', fbEn: 'Gallery' },
    { href: '/process', key: 'nav.process', fbAr: 'طريقة العمل', fbEn: 'Process' },
    { href: '/engineers', key: 'nav.engineers', fbAr: 'للمهندسين', fbEn: 'Engineers' },
    { href: '/contact', key: 'nav.contact', fbAr: 'تواصل', fbEn: 'Contact' },
] as const;

type PropertyKind = 'apt' | 'villa' | 'any';

export default function Home() {
    const { t, locale } = useCms();
    const { companyName, cityName, whatsappNumber, waCanUse, logoUrl } = useSiteConfig();
    const { props } = usePage<{
        flash?: { success?: string };
        heroSlides?: Array<Record<string, string | null>>;
        brands?: Array<{ name: string; logo: string; hint: string | null }>;
        marketingServices?: Array<{
            id: number;
            ar: string;
            en: string;
            descAr: string;
            descEn: string;
            image: string;
            imageAlt: string;
        }>;
        galleryItems?: Array<{
            id: number;
            image: string;
            labelAr: string | null;
            labelEn: string | null;
            taglineAr: string | null;
            taglineEn: string | null;
            homePosition: number | null;
            engineerHomePosition: number | null;
        }>;
    }>();

    const contactForm = useForm({
        name: '',
        phone: '',
        email: '',
        property_kind: 'apt' as PropertyKind,
        area: '',
        message: '',
        source: 'home' as const,
    });

    const image2 = projectImages[1];
    const heroSlides = useMemo<HeroSlide[]>(() => {
        const fromDb = (props.heroSlides ?? [])
            .map((slide) => ({
                image: String(slide.image ?? '').trim(),
                titleAr: String(slide.title_ar ?? '').trim(),
                titleEn: String(slide.title_en ?? '').trim(),
                subtitleAr: String(slide.subtitle_ar ?? '').trim(),
                subtitleEn: String(slide.subtitle_en ?? '').trim(),
            }))
            .filter((slide) => slide.image && slide.titleAr);

        return fromDb.length > 0 ? fromDb : defaultHeroSlides;
    }, [props.heroSlides]);

    const partnerBrands = useMemo<PartnerBrand[]>(() => {
        const fromDb = (props.brands ?? [])
            .map((b) => ({
                name: String(b.name ?? '').trim(),
                logo: String(b.logo ?? '').trim(),
                hint: String(b.hint ?? '').trim(),
            }))
            .filter((b) => b.name && b.logo);

        return fromDb.length > 0 ? fromDb : defaultPartnerBrands;
    }, [props.brands]);

    const partnerBrandsSlider = useMemo(() => [...partnerBrands, ...partnerBrands], [partnerBrands]);

    const serviceCards = useMemo<MarketingService[]>(() => {
        const rows = props.marketingServices ?? [];
        const mapped = rows
            .filter((s) => s.ar?.trim() && s.image?.trim())
            .map((s) => ({
                id: s.id,
                ar: s.ar,
                en: s.en,
                descAr: s.descAr,
                descEn: s.descEn,
                image: s.image,
                imageAlt: s.imageAlt,
            }));
        return mapped.length > 0 ? mapped : marketingServices;
    }, [props.marketingServices]);

    /** صور قسم "Explore our kitchen designs" — من المعرض حسب خانة 1–6 في لوحة التحكم */
    const homeDesignSpotlight = useMemo(() => {
        const rows = props.galleryItems ?? [];
        const picked = rows
            .filter(
                (g) =>
                    g.image?.trim() &&
                    g.homePosition != null &&
                    g.homePosition >= 1 &&
                    g.homePosition <= 6,
            )
            .sort((a, b) => (a.homePosition ?? 0) - (b.homePosition ?? 0));
        if (picked.length === 0) {
            return null;
        }
        return picked.map((g) => {
            const slot = g.homePosition ?? 1;
            const pad = String(slot).padStart(2, '0');
            const title =
                g.labelAr?.trim() ||
                g.labelEn?.trim() ||
                `${t('home.kitchens.fallbackTitle', 'Kitchen Project', 'Kitchen Project')} ${pad}`;
            const subtitle =
                g.taglineAr?.trim() ||
                g.taglineEn?.trim() ||
                t('home.kitchens.fallbackSubtitle', 'Modern / Top sellers', 'Modern / Top sellers');
            const alt =
                g.labelAr?.trim() ||
                g.labelEn?.trim() ||
                `${t('home.kitchens.fallbackTitle', 'Kitchen Project', 'Kitchen Project')} ${pad}`;
            return { id: g.id, image: g.image, title, subtitle, alt };
        });
    }, [props.galleryItems, t]);

    /** بطاقات «للمهندسين عندنا» — من المعرض حسب خانة 1–4؛ وإلا البيانات الثابتة */
    const engineerSectionCards = useMemo(() => {
        const rows = props.galleryItems ?? [];
        const picked = rows
            .filter(
                (g) =>
                    g.image?.trim() &&
                    g.engineerHomePosition != null &&
                    g.engineerHomePosition >= 1 &&
                    g.engineerHomePosition <= 4,
            )
            .sort((a, b) => (a.engineerHomePosition ?? 0) - (b.engineerHomePosition ?? 0));
        if (picked.length === 0) {
            return engineerShowcaseHome.map((item) => ({
                keyId: item.src,
                src: item.src,
                labelAr: item.labelAr,
                labelEn: item.labelEn,
            }));
        }
        return picked.map((g) => {
            const slot = g.engineerHomePosition ?? 1;
            const pad = String(slot).padStart(2, '0');
            const labelAr =
                g.labelAr?.trim() ||
                g.taglineAr?.trim() ||
                `${t('home.gallery.fallbackEngineerTitle', 'مشروع', 'Project')} ${pad}`;
            const labelEn =
                g.labelEn?.trim() ||
                g.taglineEn?.trim() ||
                t('home.gallery.fallbackEngineerEn', 'Engineering showcase', 'Engineering showcase');
            return {
                keyId: `gallery-${g.id}`,
                src: g.image,
                labelAr,
                labelEn,
            };
        });
    }, [props.galleryItems, t]);

    const normalized = normalizeWhatsappNumber(whatsappNumber);

    const whatsappHref = useMemo(() => {
        if (!waCanUse) return '';
        const propertyLabel =
            contactForm.data.property_kind === 'apt'
                ? t('home.contact.property.apt', 'شقة', 'Apartment')
                : contactForm.data.property_kind === 'villa'
                  ? t('home.contact.property.villa', 'فيلا', 'Villa')
                  : t('home.contact.property.any', 'أي مشروع', 'Any project');
        const safeName = contactForm.data.name?.trim()
            ? contactForm.data.name.trim()
            : t('home.contact.waNameFallback', 'عميل', 'Client');
        const safeArea = contactForm.data.area?.trim()
            ? contactForm.data.area.trim()
            : t('home.contact.waAreaFallback', 'حسب المساحة', 'Per area');
        const extra = contactForm.data.message?.trim()
            ? `\n${t('home.contact.waDetailsPrefix', 'تفاصيل', 'Details')}: ${contactForm.data.message.trim()}`
            : '';
        const phoneLine = contactForm.data.phone.trim()
            ? `\n${t('home.contact.waPhoneLine', 'جوال', 'Mobile')}: ${contactForm.data.phone.trim()}`
            : '';
        const emailLine = contactForm.data.email.trim()
            ? `\n${t('home.contact.waEmailLine', 'البريد', 'Email')}: ${contactForm.data.email.trim()}`
            : '';
        const hi = t('home.contact.waHi', 'مرحبًا، أنا', 'Hi, I am');
        const proj = t('home.contact.waProject', 'نوع المشروع', 'Project type');
        const areaLine = t('home.contact.waArea', 'المقاس/المساحة', 'Size / area');
        const closing = t(
            'home.contact.waClosing',
            'أريد تصميم وتنفيذ مطبخ مودرن فخم.',
            'I want a modern luxury kitchen design & build.',
        );
        const text = encodeURIComponent(
            `${hi} ${safeName}.${phoneLine}${emailLine}\n${proj}: ${propertyLabel}.\n${areaLine}: ${safeArea}.${extra}\n${closing}`,
        );
        return `https://wa.me/${normalized}?text=${text}`;
    }, [
        contactForm.data.name,
        contactForm.data.phone,
        contactForm.data.email,
        contactForm.data.property_kind,
        contactForm.data.area,
        contactForm.data.message,
        normalized,
        waCanUse,
        t,
    ]);

    const canSubmitContact = Boolean(contactForm.data.phone.trim());

    return (
        <>
            <Head title={t('home.meta.title', 'الرئيسية', 'Home')} />
            <MarketingLayout hideDefaultFooter>
                <section className="mx-auto max-w-6xl px-4 pt-6 pb-10">
                    <HeroSlider slides={heroSlides} />
                </section>

                <section className="border-y border-[#D9D9D9] bg-[#F5F5F5]/80 py-10">
                    <div className="mx-auto max-w-6xl px-4">
                        <RevealOnScroll className="text-center mb-8">
                            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#2B1702]">
                                {t('home.brands.title', 'براندات وشركاء نثق فيهم', 'Trusted brands and partners')}
                            </h2>
                            <div className="marketing-accent-line mt-3" aria-hidden />
                            <p className="mt-4 text-[13px] sm:text-[14px] text-[#553B1E]/75 max-w-xl mx-auto">
                                {t(
                                    'home.brands.subtitle',
                                    'نستخدم مكونات وخامات من موردين معتمدين عشان التشطيب يفضل ثابت مع الوقت.',
                                    'We use components and materials from trusted suppliers so the finish stays consistent over time.',
                                )}
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
                                {t('home.services.title', 'خدماتنا', 'Our Services')}
                            </h2>
                            <div className="marketing-accent-line mt-4" aria-hidden />
                            <p className="mt-5 text-[14px] leading-7 text-[#2B1702]/80">
                                {locale === 'ar' ? (
                                    <>
                                        {t(
                                            'home.services.lead',
                                            'تصميم وتصنيع وتركيب بخطوات واضحة، مع خامات مختارة وتشطيب',
                                            'Design • Build • Install — curated materials & premium finish.',
                                        )}
                                        <span className="text-[#A67C52] font-semibold">
                                            {' '}
                                            {t(
                                                'home.services.leadHighlight',
                                                'يليق بالذوق الراقي',
                                                '',
                                            )}
                                        </span>
                                        .
                                    </>
                                ) : (
                                    t(
                                        'home.services.lead',
                                        'تصميم وتصنيع وتركيب بخطوات واضحة، مع خامات مختارة وتشطيب',
                                        'Design • Build • Install — curated materials & premium finish.',
                                    )
                                )}
                            </p>
                            {locale === 'ar' ? (
                                <p className="mt-1 text-[12px] text-[#553B1E]/65" dir="rtl">
                                    {t(
                                        'home.services.subline',
                                        'تصميم • تصنيع • تركيب — خامات مختارة وتشطيب فاخر.',
                                        'Design • Build • Install — curated materials & premium finish.',
                                    )}
                                </p>
                            ) : null}
                        </RevealOnScroll>

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {serviceCards.map((s, index) => (
                                <RevealOnScroll key={s.id ?? s.en} delayMs={index * 55}>
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
                                                <h3
                                                    className="text-white font-black text-lg leading-snug"
                                                    dir={locale === 'en' ? 'ltr' : 'rtl'}
                                                >
                                                    {locale === 'en' && s.en?.trim() ? s.en : s.ar}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="p-5 bg-white/90">
                                            <p
                                                className="text-[13px] leading-6 text-[#2B1702]/85"
                                                dir={locale === 'en' ? 'ltr' : 'rtl'}
                                            >
                                                {locale === 'en' && s.descEn?.trim() ? s.descEn : s.descAr}
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
                                {t('home.services.cta', 'عرض تفاصيل الخدمات', 'View Service Details')}
                            </Link>
                        </RevealOnScroll>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-4 py-14">
                    <RevealOnScroll className="text-center">
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#2B1702]">
                            {t(
                                'home.kitchens.title',
                                'استكشف تصاميم مطابخنا',
                                'Explore our kitchen designs',
                            )}
                        </h2>
                        <div className="marketing-accent-line mt-4" aria-hidden />
                        <p className="mt-5 text-[#2B1702]/70 text-[14px] max-w-2xl mx-auto">
                            {t(
                                'home.kitchens.subtitle',
                                'صور حقيقية تعكس جودة التنفيذ، تنوع الستايلات، ولمسة التشطيب النهائية.',
                                'Real photos that reflect build quality, style variety, and finishing.',
                            )}
                        </p>
                    </RevealOnScroll>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {homeDesignSpotlight
                            ? homeDesignSpotlight.map((card, index) => (
                                  <RevealOnScroll key={card.id} delayMs={index * 70}>
                                      <article className="rounded-3xl overflow-hidden border border-[#D9D9D9] bg-white/80 shadow-[0_24px_60px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.08)]">
                                          <img
                                              src={card.image}
                                              alt={card.alt}
                                              className="h-56 w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                                          />
                                          <div className="p-5">
                                              <h3 className="font-black text-[#2B1702]">{card.title}</h3>
                                              <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#553B1E]/70">
                                                  {card.subtitle}
                                              </p>
                                          </div>
                                      </article>
                                  </RevealOnScroll>
                              ))
                            : projectImages.slice(0, 6).map((img, index) => (
                                  <RevealOnScroll key={img} delayMs={index * 70}>
                                      <article className="rounded-3xl overflow-hidden border border-[#D9D9D9] bg-white/80 shadow-[0_24px_60px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.08)]">
                                          <img
                                              src={img}
                                              alt={`${t('home.kitchens.fallbackTitle', 'Kitchen Project', 'Kitchen Project')} ${index + 1}`}
                                              className="h-56 w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                                          />
                                          <div className="p-5">
                                              <h3 className="font-black text-[#2B1702]">
                                                  {t('home.kitchens.fallbackTitle', 'Kitchen Project', 'Kitchen Project')}{' '}
                                                  {String(index + 1).padStart(2, '0')}
                                              </h3>
                                              <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#553B1E]/70">
                                                  {t(
                                                      'home.kitchens.fallbackSubtitle',
                                                      'Modern / Top sellers',
                                                      'Modern / Top sellers',
                                                  )}
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
                            <span
                                className={[
                                    'inline-block text-[#F8B803] text-xs font-bold tracking-[0.14em]',
                                    locale === 'en' ? 'uppercase' : '',
                                ].join(' ')}
                            >
                                {t(
                                    'home.engineers.badge',
                                    'مهندسون ومقاولون',
                                    'Engineers & contractors',
                                )}
                            </span>
                            <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-[#F5F5F5]">
                                {t('home.engineers.title', 'للمهندسين عندنا', 'For engineers')}
                            </h2>
                            <div className="marketing-accent-line marketing-accent-line--light mt-4" aria-hidden />
                            <p className="mt-5 text-[14px] leading-7 text-[#F5F5F5]/85">
                                {locale === 'ar' ? (
                                    <>
                                        {t(
                                            'home.engineers.lead',
                                            'تنسيق قبل التصنيع، مقاسات دقيقة، وتنفيذ مطابق للمخططات — بمستوى تشطيب',
                                            '',
                                        )}
                                        <span className="text-[#A67C52] font-semibold">
                                            {' '}
                                            {t('home.engineers.leadHighlight', 'فخم وواضح', '')}
                                            {' '}
                                        </span>
                                        .
                                    </>
                                ) : (
                                    t(
                                        'home.engineers.subtitle',
                                        'تنسيق • مواصفات دقيقة • تسليم موثوق في الموقع.',
                                        'Coordination • specs • on-site delivery you can trust.',
                                    )
                                )}
                            </p>
                            {locale === 'ar' ? (
                                <p className="mt-1 text-[12px] text-[#C4A484]/90" dir="rtl">
                                    {t(
                                        'home.engineers.subtitle',
                                        'تنسيق • مواصفات دقيقة • تسليم موثوق في الموقع.',
                                        'Coordination • specs • on-site delivery you can trust.',
                                    )}
                                </p>
                            ) : null}
                        </RevealOnScroll>

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {engineerSectionCards.map((item, index) => (
                                <RevealOnScroll key={item.keyId} delayMs={index * 60}>
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
                                                <h3
                                                    className="text-white font-bold text-[13px] sm:text-sm leading-snug"
                                                    dir={locale === 'en' ? 'ltr' : 'rtl'}
                                                >
                                                    {locale === 'en' && item.labelEn?.trim()
                                                        ? item.labelEn
                                                        : item.labelAr}
                                                </h3>
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
                                {t('home.engineers.ctaPage', 'صفحة المهندسين', 'Engineers page')}
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold border border-white/25 bg-white/5 text-[#F5F5F5] hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {t('home.engineers.ctaContact', 'تواصل معنا', 'Contact us')}
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
                                    alt={t(
                                        'home.premium.imageAlt',
                                        'Kitchen detail',
                                        'Kitchen detail',
                                    )}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                                <div className="relative z-10 p-7 flex h-full items-end">
                                    <div>
                                        <div className="text-[#F8B803] text-xs font-semibold uppercase tracking-[0.13em]">
                                            {t(
                                                'home.premium.badge',
                                                'For Premium Clients',
                                                'For Premium Clients',
                                            )}
                                        </div>
                                        <h3 className="mt-2 whitespace-pre-line text-white text-3xl font-black leading-tight">
                                            {t(
                                                'home.premium.title',
                                                'تشطيب يليق\nبالطبقة الراقية',
                                                'Finishing that fits\na refined clientele',
                                            )}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delayMs={100}>
                            <div className="rounded-[30px] bg-[#2B1702] p-8 sm:p-10 text-[#F5F5F5]">
                                <h3 className="text-3xl font-black leading-tight whitespace-pre-line">
                                    {t(
                                        'home.process.title',
                                        'من الفكرة\nللتنفيذ الكامل',
                                        'From concept\nto full delivery',
                                    )}
                                </h3>
                                <p className="mt-4 text-[14px] leading-7 text-[#F5F5F5]/85">
                                    {t(
                                        'home.process.body',
                                        'بنشتغل بخطوات واضحة: مقاسات دقيقة، تصميم مقترح، تصنيع منظم، وتسليم نهائي بمستوى جودة ثابت.',
                                        'Clear steps: accurate measurements, proposed design, organized manufacturing, and final handover with consistent quality.',
                                    )}
                                </p>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    {(
                                        [
                                            ['home.process.step.measure', 'قياس', 'Measure'],
                                            ['home.process.step.design', 'تصميم', 'Design'],
                                            ['home.process.step.build', 'تصنيع', 'Build'],
                                            ['home.process.step.install', 'تركيب', 'Install'],
                                        ] as const
                                    ).map(([key, ar, en]) => (
                                        <div
                                            key={key}
                                            className="rounded-xl border border-white/15 bg-white/5 p-3 text-sm font-semibold"
                                        >
                                            {t(key, ar, en)}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-7">
                                    <Link
                                        href="/process"
                                        className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold bg-[#A67C52] text-[#1B1B18] hover:brightness-[1.05] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {t('home.process.cta', 'شوف طريقة العمل', 'See how we work')}
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
                                {t('home.contact.title', 'تواصل معنا', 'Contact Us')}
                            </h2>
                            <div className="marketing-accent-line mt-4" aria-hidden />
                            <p className="mt-5 text-[14px] leading-7 text-[#2B1702]/80">
                                {t(
                                    'home.contact.lead',
                                    'املأ البيانات التالية وسيفتح واتساب برسالة جاهزة.',
                                    'Fill in the fields and WhatsApp will open with a prefilled message.',
                                )}
                                <span className="text-[#A67C52] font-semibold">
                                    {' '}
                                    {t('home.contact.leadHighlight', 'أسرع رد', 'Faster reply')}
                                    {' '}
                                </span>
                                {t(
                                    'home.contact.leadEnd',
                                    'للاستفسار والتصميم المبدئي.',
                                    'for questions and a first design pass.',
                                )}
                            </p>
                            <p
                                className="mt-1 text-[12px] text-[#553B1E]/65"
                                dir={locale === 'en' ? 'ltr' : 'rtl'}
                            >
                                {t(
                                    'home.contact.subline',
                                    'تواصل سريع — نفس خطوات صفحة التواصل الكاملة.',
                                    'Quick contact — same flow as the full contact page.',
                                )}
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
                                        {t(
                                            'home.contact.intro',
                                            'نركّز على مطابخ مودرن فخمة للأفراد والمهندسين، بخطوات واضحة من القياس حتى التسليم.',
                                            'Modern luxury kitchens for homeowners and engineers — clear steps from measure to handover.',
                                        )}
                                    </p>
                                    <div className="mt-6 space-y-3">
                                        <Link
                                            href="/contact"
                                            className="block rounded-2xl border border-[#D9D9D9] bg-white p-4 text-sm font-semibold text-[#553B1E] hover:border-[#A67C52]/50 transition-colors"
                                        >
                                            {t(
                                                'home.contact.fullPageLink',
                                                'صفحة التواصل الكاملة ←',
                                                'Full contact page ←',
                                            )}
                                        </Link>
                                        {waCanUse && (
                                            <a
                                                href={`https://wa.me/${normalized}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block rounded-2xl border border-[#A67C52]/40 bg-[#553B1E]/5 p-4 text-sm font-semibold text-[#553B1E] hover:bg-[#553B1E]/10 transition-colors"
                                                dir="ltr"
                                            >
                                                {t('home.contact.whatsappLine', 'واتساب', 'WhatsApp')}: +{normalized}
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (!canSubmitContact) return;
                                        const waUrl = whatsappHref;
                                        contactForm.post('/contact-requests', {
                                            preserveScroll: true,
                                            onSuccess: () => {
                                                if (waCanUse && waUrl) {
                                                    window.open(waUrl, '_blank', 'noopener,noreferrer');
                                                }
                                                contactForm.reset();
                                            },
                                        });
                                    }}
                                    className="w-full"
                                >
                                    {props.flash?.success ? (
                                        <div className="mb-4 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                                            {props.flash.success}
                                        </div>
                                    ) : null}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <label className="block">
                                            <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                                {t('home.contact.form.nameLabel', 'اسمك', 'Your name')}
                                            </div>
                                            <input
                                                value={contactForm.data.name}
                                                onChange={(e) =>
                                                    contactForm.setData('name', e.target.value)
                                                }
                                                className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                                placeholder={t(
                                                    'home.contact.form.namePlaceholder',
                                                    'اكتب اسمك',
                                                    'Your name',
                                                )}
                                            />
                                        </label>
                                        <label className="block">
                                            <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                                {t(
                                                    'home.contact.form.propertyLabel',
                                                    'نوع العقار',
                                                    'Property type',
                                                )}
                                            </div>
                                            <select
                                                value={contactForm.data.property_kind}
                                                onChange={(e) =>
                                                    contactForm.setData(
                                                        'property_kind',
                                                        e.target.value as PropertyKind,
                                                    )
                                                }
                                                className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                            >
                                                <option value="apt">
                                                    {t('home.contact.property.apt', 'شقة', 'Apartment')}
                                                </option>
                                                <option value="villa">
                                                    {t('home.contact.property.villa', 'فيلا', 'Villa')}
                                                </option>
                                                <option value="any">
                                                    {t(
                                                        'home.contact.property.any',
                                                        'أي مشروع',
                                                        'Any project',
                                                    )}
                                                </option>
                                            </select>
                                        </label>
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <label className="block">
                                            <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                                {t(
                                                    'home.contact.form.phoneLabel',
                                                    'رقم الموبايل',
                                                    'Mobile number',
                                                )}
                                                <span className="text-red-600"> *</span>
                                            </div>
                                            <input
                                                type="tel"
                                                required
                                                value={contactForm.data.phone}
                                                onChange={(e) =>
                                                    contactForm.setData('phone', e.target.value)
                                                }
                                                className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                                placeholder={t(
                                                    'home.contact.form.phonePlaceholder',
                                                    '01xxxxxxxxx',
                                                    '01xxxxxxxxx',
                                                )}
                                            />
                                            {contactForm.errors.phone ? (
                                                <p className="mt-1 text-xs text-red-600">
                                                    {contactForm.errors.phone}
                                                </p>
                                            ) : null}
                                        </label>
                                        <label className="block">
                                            <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                                {t(
                                                    'home.contact.form.emailLabel',
                                                    'البريد الإلكتروني (اختياري)',
                                                    'Email (optional)',
                                                )}
                                            </div>
                                            <input
                                                type="email"
                                                value={contactForm.data.email}
                                                onChange={(e) =>
                                                    contactForm.setData('email', e.target.value)
                                                }
                                                className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                                placeholder={t(
                                                    'home.contact.form.emailPlaceholder',
                                                    'name@example.com',
                                                    'name@example.com',
                                                )}
                                            />
                                            {contactForm.errors.email ? (
                                                <p className="mt-1 text-xs text-red-600">
                                                    {contactForm.errors.email}
                                                </p>
                                            ) : null}
                                        </label>
                                    </div>

                                    <div className="mt-4">
                                        <label className="block">
                                            <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                                {t(
                                                    'home.contact.form.areaLabel',
                                                    'المقاس/المساحة (اختياري)',
                                                    'Size / area (optional)',
                                                )}
                                            </div>
                                            <input
                                                value={contactForm.data.area}
                                                onChange={(e) =>
                                                    contactForm.setData('area', e.target.value)
                                                }
                                                className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                                placeholder={t(
                                                    'home.contact.form.areaPlaceholder',
                                                    'مثال: 4x3 / عدد قطع',
                                                    'e.g. 4x3 m',
                                                )}
                                            />
                                        </label>
                                    </div>

                                    <div className="mt-4">
                                        <label className="block">
                                            <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                                {t(
                                                    'home.contact.form.detailsLabel',
                                                    'تفاصيل سريعة (اختياري)',
                                                    'Quick details (optional)',
                                                )}
                                            </div>
                                            <textarea
                                                value={contactForm.data.message}
                                                onChange={(e) =>
                                                    contactForm.setData('message', e.target.value)
                                                }
                                                className="min-h-[88px] w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                                placeholder={t(
                                                    'home.contact.form.detailsPlaceholder',
                                                    'ذوقك؟ خامة؟ توقيت التنفيذ؟',
                                                    'Style? Materials? Timeline?',
                                                )}
                                            />
                                        </label>
                                    </div>

                                    <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                                        <button
                                            type="submit"
                                            disabled={!canSubmitContact || contactForm.processing}
                                            className={[
                                                'rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200',
                                                canSubmitContact && !contactForm.processing
                                                    ? 'bg-[#A67C52] text-[#1B1B18] hover:-translate-y-[1px]'
                                                    : 'bg-[#D9D9D9] text-[#5c5c5c] cursor-not-allowed',
                                            ].join(' ')}
                                        >
                                            {contactForm.processing
                                                ? '…'
                                                : t(
                                                      'home.contact.submitRequest',
                                                      'إرسال الطلب',
                                                      'Send request',
                                                  )}
                                        </button>
                                        <div
                                            className="text-[12px] text-[#2B1702]/70 leading-5"
                                            dir={locale === 'en' ? 'ltr' : 'rtl'}
                                        >
                                            {t(
                                                'home.contact.formHint',
                                                'رسالة جاهزة — يفتح واتساب.',
                                                'Prefilled message — opens WhatsApp.',
                                            )}
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
                                <div className="flex items-start">
                                    {logoUrl ? (
                                        <img
                                            src={logoUrl}
                                            alt=""
                                            className="h-11 w-auto max-h-14 max-w-[min(100%,16rem)] object-contain object-start sm:h-12"
                                        />
                                    ) : (
                                        <div className="h-11 w-11 shrink-0 rounded-xl bg-[#A67C52] grid place-items-center text-[#1B1B18] text-sm font-bold sm:h-12 sm:w-12">
                                            K
                                        </div>
                                    )}
                                </div>
                                <p className="mt-4 text-[13px] leading-6 text-[#F5F5F5]/75">
                                    {t(
                                        'home.footer.about',
                                        'مطابخ مودرن فخمة — تصميم وتنفيذ بجودة ثابتة للشقق والفلل والمهندسين.',
                                        'Modern luxury kitchens — consistent design & build for apartments, villas, and engineers.',
                                    )}
                                </p>
                            </div>

                            <div>
                                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#C4A484] mb-4">
                                    {t('home.footer.quickLinks', 'روابط سريعة', 'Quick links')}
                                </div>
                                <ul className="space-y-2.5 text-[13px]">
                                    {footerNavItems.map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className="text-[#F5F5F5]/90 hover:text-[#A67C52] transition-colors"
                                            >
                                                {t(item.key, item.fbAr, item.fbEn)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#C4A484] mb-4">
                                    {t('home.footer.contactHeading', 'تواصل', 'Contact')}
                                </div>
                                <ul className="space-y-2.5 text-[13px] text-[#F5F5F5]/85">
                                    <li>
                                        <Link href="/contact" className="hover:text-[#A67C52] transition-colors">
                                            {t(
                                                'home.footer.contactForm',
                                                'نموذج التواصل',
                                                'Contact form',
                                            )}
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="#contact" className="hover:text-[#A67C52] transition-colors">
                                            {t(
                                                'home.footer.quickForm',
                                                'نموذج سريع (هذه الصفحة)',
                                                'Quick form (this page)',
                                            )}
                                        </a>
                                    </li>
                                    {waCanUse && (
                                        <li>
                                            <a
                                                href={`https://wa.me/${normalized}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 hover:text-[#A67C52] transition-colors"
                                                dir="ltr"
                                            >
                                                <span dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                                                    {t('home.footer.whatsapp', 'واتساب', 'WhatsApp')}
                                                </span>
                                                <span className="tabular-nums font-medium">+{normalized}</span>
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                <div className="text-[13px] font-bold text-[#F5F5F5]">
                                    {t(
                                        'home.footer.readyTitle',
                                        'جاهز لمطبخ جديد؟',
                                        'Ready for a new kitchen?',
                                    )}
                                </div>
                                <p className="mt-2 text-[12px] leading-6 text-[#F5F5F5]/70">
                                    {t(
                                        'home.footer.readyBody',
                                        'اطلب تصميم مبدئي أو راجع معرض الأعمال.',
                                        'Request a first design or browse the gallery.',
                                    )}
                                </p>
                                <div className="mt-4 flex flex-col gap-2">
                                    <Link
                                        href="/contact"
                                        className="inline-flex justify-center rounded-xl bg-[#A67C52] px-4 py-2.5 text-sm font-semibold text-[#1B1B18] hover:brightness-[1.05] transition-all"
                                    >
                                        {t('home.footer.ctaDesign', 'اطلب تصميم', 'Request design')}
                                    </Link>
                                    <Link
                                        href="/gallery"
                                        className="inline-flex justify-center rounded-xl border border-white/25 px-4 py-2.5 text-sm font-semibold text-[#F5F5F5] hover:bg-white/10 transition-all"
                                    >
                                        {t('home.footer.ctaGallery', 'المعرض', 'Gallery')}
                                    </Link>
                                </div>
                            </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-[11px] text-[#C4A484]/90">
                            <div>
                                © {new Date().getFullYear()}{' '}
                                {t('home.footer.rights', 'جميع الحقوق محفوظة.', 'All rights reserved.')}
                            </div>
                            <div dir="ltr">
                                {t(
                                    'home.footer.bottomLine',
                                    'Premium kitchens • Design & build',
                                    'Premium kitchens • Design & build',
                                )}
                            </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </footer>
            </MarketingLayout>
        </>
    );
}
