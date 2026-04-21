import { Head, Link } from '@inertiajs/react';
import { useMemo } from 'react';
import { Compass, Hammer, Sparkles } from 'lucide-react';
import MarketingLayout from '@/components/marketing/marketing-layout';
import { RevealOnScroll } from '@/components/marketing/reveal-on-scroll';
import { useCms } from '@/hooks/use-cms';
import { cn } from '@/lib/utils';

const HERO_IMAGE = '/images/kitchen-ref-1.png';

export default function About() {
    const { t, locale } = useCms();
    const isEn = locale === 'en';
    const dir = isEn ? 'ltr' : 'rtl';

    const cards = useMemo(
        () =>
            [
                {
                    Icon: Sparkles,
                    title: t('about.card1.title', 'تشطيب فخم', 'Premium Finishing'),
                    body: t(
                        'about.card1.body',
                        'تفاصيل دقيقة وخامات مختارة عشان شكل نهائي يستمر.',
                        'Careful details and curated materials for a lasting finish.',
                    ),
                },
                {
                    Icon: Compass,
                    title: t('about.card2.title', 'تصميم واضح قبل التصنيع', 'Concept Before Cut'),
                    body: t(
                        'about.card2.body',
                        'بنجهز تصور يطمنك: ستايل + ألوان + توزيع قبل ما نبدأ تصنيع.',
                        'A clear concept: style, colors, and layout before manufacturing.',
                    ),
                },
                {
                    Icon: Hammer,
                    title: t('about.card3.title', 'دقة تنفيذ', 'Build Precision'),
                    body: t(
                        'about.card3.body',
                        'تنفيذ مطابق مع المتابعة لحد التسليم النهائي.',
                        'Built to match with full follow-up until final delivery.',
                    ),
                },
            ] as const,
        [t],
    );

    const steps = useMemo(
        () => [
            {
                step: t('about.step1.label', '١', '1'),
                title: t('about.step1.title', 'قياس وتصور', 'Measure & concept'),
                desc: t(
                    'about.step1.desc',
                    'زيارة ميدانية وتوزيع يناسب استخدامك اليومي.',
                    'Site visit and layout tailored to how you live.',
                ),
            },
            {
                step: t('about.step2.label', '٢', '2'),
                title: t('about.step2.title', 'تصنيع وتنسيق', 'Build & coordinate'),
                desc: t(
                    'about.step2.desc',
                    'تصنيع دقيق وتنسيق مع باقي التشطيب في الموقع.',
                    'Precise fabrication coordinated with the rest of the fit-out.',
                ),
            },
            {
                step: t('about.step3.label', '٣', '3'),
                title: t('about.step3.title', 'تسليم وتجربة', 'Handover'),
                desc: t(
                    'about.step3.desc',
                    'تسليم منظم مع مراجعة نهائية قبل التسليم.',
                    'Structured handover with a final walkthrough.',
                ),
            },
        ],
        [t],
    );

    return (
        <>
            <Head title={t('about.page.metaTitle', 'عن الشركة', 'About')} />
            <MarketingLayout>
                {/* Hero */}
                <section className="mx-auto max-w-6xl px-4 pt-6 pb-2 sm:pt-8">
                    <div className="marketing-hero-frame relative overflow-hidden rounded-[28px] border border-[#2B1702]/20 sm:rounded-[32px]">
                        <div className="pointer-events-none absolute inset-0">
                            <img
                                src={HERO_IMAGE}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2B1702]/92 via-[#2B1702]/45 to-[#553B1E]/25" />
                            <div className="absolute inset-0 bg-gradient-to-l from-black/35 via-transparent to-black/40" />
                        </div>

                        <div className="relative z-10 flex min-h-[min(58svh,560px)] flex-col justify-end px-5 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
                            <div className="max-w-2xl marketing-hero-animate">
                                <div
                                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/95 sm:text-xs"
                                    dir="ltr"
                                >
                                    {t('about.hero.kicker', 'من الفكرة للتسليم', 'From idea to handover')}
                                </div>
                                <h1
                                    className="mh-title mt-5 text-3xl font-black leading-[1.12] text-white sm:text-4xl lg:text-5xl"
                                    dir={dir}
                                >
                                    {t('about.page.heroTitle', 'عن شركتنا', 'About us')}
                                </h1>
                                <p
                                    className="mh-sub mt-4 max-w-xl text-[15px] leading-7 text-white/88 sm:text-[16px]"
                                    dir={dir}
                                >
                                    {t(
                                        'about.page.heroLead',
                                        'تصميم وتنفيذ مطابخ فاخرة للشقق والفلل والمهندسين، بخطوات واضحة من القياس حتى التسليم.',
                                        'Premium kitchen design & build for apartments, villas, and engineers — clear steps from measure to handover.',
                                    )}
                                </p>
                                <div className="mh-cta mt-8 flex flex-wrap gap-3">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#C4A484] via-[#A67C52] to-[#8f6844] px-6 py-3 text-sm font-semibold text-[#1B1B18] shadow-[0_12px_32px_rgba(85,59,30,0.35)] transition duration-300 hover:brightness-[1.05] active:scale-[0.98]"
                                    >
                                        {t('about.hero.ctaPrimary', 'تواصل معنا', 'Get in touch')}
                                    </Link>
                                    <Link
                                        href="/gallery"
                                        className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-white/16 active:scale-[0.98]"
                                    >
                                        {t('about.hero.ctaSecondary', 'معرض الأعمال', 'Portfolio')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Story + badge */}
                <section className="marketing-section-ivory border-y border-[#D9D9D9]/50">
                    <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16 lg:py-20">
                        <RevealOnScroll>
                            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
                                <div className="min-w-0 flex-1 space-y-5" dir={dir}>
                                    <div className="marketing-accent-line marketing-accent-line--light max-w-[5rem] ms-0 me-auto lg:mx-0" />
                                    <h2 className="text-2xl font-black text-[#2B1702] sm:text-3xl">
                                        {t('about.story.title', 'قصتنا باختصار', 'Our story')}
                                    </h2>
                                    <p className="text-[15px] leading-8 text-[#2B1702]/85 sm:text-[16px]">
                                        {t(
                                            'about.story.p1',
                                            'نشتغل معاك من أول خطوة: نفهم المساحة، نحدد الستايل، ونحوّل الفكرة لمخطط واضح قبل أي تصنيع. الهدف مطبخ يخدمك يوميًا ويبقى أنيق مع الوقت.',
                                            'We work with you from day one: we understand the space, define the style, and turn the idea into a clear plan before any fabrication. The goal is a kitchen that serves you daily and stays elegant over time.',
                                        )}
                                    </p>
                                    <p className="text-[15px] leading-8 text-[#2B1702]/85 sm:text-[16px]">
                                        {t(
                                            'about.story.p2',
                                            'نركّز على خامات موثوقة، تفاصيل تشطيب نظيفة، ومتابعة لحد ما تشوف النتيجة النهائية قدامك.',
                                            'We focus on trusted materials, clean finishing details, and follow-through until you see the final result in place.',
                                        )}
                                    </p>
                                </div>

                                <aside
                                    className="shrink-0 rounded-[24px] border border-[#D9D9D9] bg-white/90 p-6 shadow-[0_24px_60px_-28px_rgba(43,23,2,0.12)] sm:p-8 lg:max-w-sm lg:self-stretch"
                                    dir={dir}
                                >
                                    <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#A67C52]">
                                        {t('about.side.badge', 'معايير فاخرة', 'Luxury standards')}
                                    </div>
                                    <div className="mt-2 text-xl font-black leading-tight text-[#553B1E] sm:text-2xl">
                                        {t('about.side.title', 'تصميم • تصنيع • تشطيب', 'Design • Build • Finish')}
                                    </div>
                                    <p className="mt-4 text-[13px] leading-6 text-[#2B1702]/75">
                                        {t(
                                            'about.side.note',
                                            'نفس منهج العمل للشقق والفلل والمشاريع مع المهندسين.',
                                            'The same workflow for apartments, villas, and engineer-led projects.',
                                        )}
                                    </p>
                                    <div className="mt-6 grid gap-3 border-t border-[#D9D9D9]/80 pt-6">
                                        {[
                                            t('about.pill1', 'مطابخ مودرن وكلاسيك', 'Modern & classic'),
                                            t('about.pill2', 'تنسيق مع باقي التشطيب', 'Fit-out coordination'),
                                            t('about.pill3', 'متابعة حتى التسليم', 'Follow-up to handover'),
                                        ].map((label) => (
                                            <div
                                                key={label}
                                                className="flex items-center gap-2 rounded-xl bg-[#F5F5F5]/90 px-3 py-2.5 text-[13px] font-semibold text-[#553B1E]"
                                            >
                                                <span
                                                    className="size-1.5 shrink-0 rounded-full bg-[#A67C52]"
                                                    aria-hidden
                                                />
                                                {label}
                                            </div>
                                        ))}
                                    </div>
                                </aside>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Values */}
                <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
                    <RevealOnScroll>
                        <div className="text-center" dir={dir}>
                            <h2 className="text-2xl font-black text-[#2B1702] sm:text-3xl">
                                {t('about.values.title', 'قيمنا في كل مشروع', 'What we stand for')}
                            </h2>
                            <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-7 text-[#2B1702]/75 sm:text-[15px]">
                                {t(
                                    'about.values.subtitle',
                                    'ثلاث ركائز نرجع لها في كل مرحلة من المشروع.',
                                    'Three pillars we return to at every stage.',
                                )}
                            </p>
                        </div>
                    </RevealOnScroll>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {cards.map(({ Icon, title, body }, i) => (
                            <RevealOnScroll key={title} delayMs={i * 90}>
                                <div
                                    className={cn(
                                        'marketing-card-glass flex h-full flex-col rounded-[24px] bg-white/85 p-6 sm:p-7',
                                    )}
                                    dir={dir}
                                >
                                    <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#553B1E] to-[#2B1702] text-[#F5F5F5] shadow-[0_14px_36px_-12px_rgba(85,59,30,0.45)]">
                                        <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                                    </div>
                                    <h3 className="text-lg font-black text-[#553B1E]">{title}</h3>
                                    <p className="mt-3 flex-1 text-[13px] leading-7 text-[#2B1702]/80 sm:text-[14px]">
                                        {body}
                                    </p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </section>

                {/* Steps */}
                <section className="border-t border-[#D9D9D9]/60 bg-[#FAFAF8]">
                    <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
                        <RevealOnScroll>
                            <div className="text-center" dir={dir}>
                                <h2 className="text-2xl font-black text-[#2B1702] sm:text-3xl">
                                    {t('about.steps.title', 'رحلة المشروع', 'How we work with you')}
                                </h2>
                                <p className="mx-auto mt-2 max-w-xl text-[14px] text-[#2B1702]/70">
                                    {t(
                                        'about.steps.lead',
                                        'خطوات بسيطة وواضحة—من أول زيارة لحد التسليم.',
                                        'Simple, clear steps—from first visit to handover.',
                                    )}
                                </p>
                            </div>
                        </RevealOnScroll>

                        <div className="relative mt-12">
                            <div
                                className="pointer-events-none absolute start-[12%] end-[12%] top-[22px] hidden h-px bg-gradient-to-r from-transparent via-[#A67C52]/45 to-transparent md:block"
                                aria-hidden
                            />
                            <div className="grid gap-8 md:grid-cols-3 md:gap-6">
                                {steps.map((s, i) => (
                                    <RevealOnScroll key={s.title} delayMs={i * 100}>
                                        <div
                                            className="relative rounded-[22px] border border-[#D9D9D9]/90 bg-white p-6 text-center shadow-[0_16px_44px_-28px_rgba(43,23,2,0.1)] sm:p-7"
                                            dir={dir}
                                        >
                                            <div className="mx-auto mb-4 flex size-11 items-center justify-center rounded-full border-2 border-[#A67C52]/55 bg-[#F5F5F5] text-sm font-black text-[#553B1E]">
                                                {s.step}
                                            </div>
                                            <h3 className="text-base font-black text-[#553B1E]">{s.title}</h3>
                                            <p className="mt-2 text-[13px] leading-6 text-[#2B1702]/78">
                                                {s.desc}
                                            </p>
                                        </div>
                                    </RevealOnScroll>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:pb-20">
                    <RevealOnScroll>
                        <div
                            className="relative overflow-hidden rounded-[28px] border border-[#553B1E]/25 bg-gradient-to-br from-[#553B1E] via-[#3d2812] to-[#2B1702] px-6 py-10 text-center shadow-[0_32px_80px_-24px_rgba(43,23,2,0.45)] sm:px-10 sm:py-12"
                            dir={dir}
                        >
                            <div
                                className="pointer-events-none absolute -start-20 -top-20 size-56 rounded-full bg-[#A67C52]/20 blur-3xl"
                                aria-hidden
                            />
                            <div
                                className="pointer-events-none absolute -end-16 bottom-0 size-48 rounded-full bg-[#C4A484]/15 blur-3xl"
                                aria-hidden
                            />
                            <div className="relative z-10 mx-auto max-w-xl">
                                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C4A484]">
                                    {t('about.footer.tagline', 'للطبقة الراقية', 'For premium clients')}
                                </p>
                                <p className="mt-3 text-lg font-bold text-white sm:text-xl">
                                    {t(
                                        'about.cta.title',
                                        'جاهز نبدأ مخطط مطبخك؟',
                                        'Ready to plan your kitchen?',
                                    )}
                                </p>
                                <p className="mt-2 text-[14px] leading-7 text-white/80">
                                    {t(
                                        'about.footer.line',
                                        'تصميم يخدم الأفراد والمهندسين.',
                                        'Designed for discerning individuals & engineers.',
                                    )}
                                </p>
                                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                    <Link
                                        href="/contact"
                                        className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-br from-[#C4A484] via-[#A67C52] to-[#8f6844] px-8 py-3.5 text-sm font-semibold text-[#1B1B18] shadow-[0_14px_36px_rgba(0,0,0,0.25)] transition hover:brightness-[1.06] active:scale-[0.98] sm:w-auto"
                                    >
                                        {t('about.footer.cta', 'اطلب تواصل الآن', 'Contact us now')}
                                    </Link>
                                    <Link
                                        href="/process"
                                        className="inline-flex w-full items-center justify-center rounded-xl border border-white/35 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/14 active:scale-[0.98] sm:w-auto"
                                    >
                                        {t('about.cta.secondary', 'طريقة العمل بالتفصيل', 'See our process')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </section>
            </MarketingLayout>
        </>
    );
}
