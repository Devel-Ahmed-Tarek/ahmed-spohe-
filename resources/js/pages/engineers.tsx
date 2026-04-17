import { Head, Link } from '@inertiajs/react';
import { useMemo } from 'react';
import MarketingLayout from '@/components/marketing/marketing-layout';
import { RevealOnScroll } from '@/components/marketing/reveal-on-scroll';
import { useCms } from '@/hooks/use-cms';
import { useSiteConfig } from '@/hooks/use-site-config';
import { engineerGalleryExtended } from '@/data/engineers-content';

function normalizeWhatsappNumber(raw: string): string {
    return raw.replace(/[^\d]/g, '');
}

export default function Engineers() {
    const { t, locale } = useCms();
    const { whatsappNumber, waCanUse } = useSiteConfig();
    const normalized = normalizeWhatsappNumber(whatsappNumber);

    const marqueeItems = [...engineerGalleryExtended, ...engineerGalleryExtended];

    const bulletsAr = useMemo(
        () => [
            t('engineers.bullet.ar1', 'تنسيق قبل التصنيع', 'Pre-build coordination'),
            t('engineers.bullet.ar2', 'دقة المقاسات والتفاصيل', 'Precise measurements & details'),
            t('engineers.bullet.ar3', 'تنفيذ مطابق للستايل', 'On-style execution'),
            t('engineers.bullet.ar4', 'تسليم منظم وبمواعيد', 'Organized delivery & timelines'),
        ],
        [t],
    );

    const bulletsEn = useMemo(
        () => [
            t(
                'engineers.bullet.en1',
                'Built to spec (drawings & details).',
                'Built to spec (drawings & details).',
            ),
            t('engineers.bullet.en2', 'Precise measurement control.', 'Precise measurement control.'),
            t(
                'engineers.bullet.en3',
                'Clear schedule & organized installation.',
                'Clear schedule & organized installation.',
            ),
            t(
                'engineers.bullet.en4',
                'Material coordination before manufacturing.',
                'Material coordination before manufacturing.',
            ),
        ],
        [t],
    );

    return (
        <>
            <Head title={t('engineers.meta.title', 'للمهندسين', 'Engineers')} />
            <MarketingLayout>
                <section className="mx-auto max-w-6xl px-4 pt-10 pb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
                        <RevealOnScroll>
                            <div className="relative min-h-[280px] lg:min-h-[360px] rounded-[32px] overflow-hidden border border-[#D9D9D9] shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                                <img
                                    src="/images/projects/kitchen-09.png"
                                    alt={t('engineers.hero.imageAlt', 'تنفيذ للمهندسين', 'Build for engineers')}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1702]/90 via-[#2B1702]/25 to-transparent" />
                                <div className="relative z-10 p-8 flex flex-col justify-end h-full min-h-[280px] lg:min-h-[360px]">
                                    <span
                                        className={`text-[#F8B803] text-xs font-bold ${
                                            locale === 'en'
                                                ? 'uppercase tracking-[0.14em]'
                                                : 'tracking-wide'
                                        }`}
                                    >
                                        {t(
                                            'engineers.hero.badge',
                                            'للمهندسين والمقاولين',
                                            'For engineers & contractors',
                                        )}
                                    </span>
                                    <p className="mt-2 text-white/90 text-[14px] leading-7 max-w-md">
                                        {t(
                                            'engineers.hero.lead',
                                            'تنفيذ مطابق للمخططات بمستوى تشطيب فخم—وبتنسيق واضح قبل ما تبدأ التصنيع.',
                                            'Drawing-accurate execution with premium finish — clear coordination before manufacturing.',
                                        )}
                                    </p>
                                </div>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delayMs={90}>
                            <div className="rounded-[32px] bg-[#2B1702] text-[#F5F5F5] p-8 sm:p-10 h-full flex flex-col justify-center">
                                <h1 className="text-3xl sm:text-4xl font-black leading-tight">
                                    {t('engineers.panel.title', 'للمهندسين', 'For engineers')}
                                </h1>
                                <p className="mt-3 text-[14px] leading-7 text-[#F5F5F5]/85">
                                    {t(
                                        'engineers.panel.intro',
                                        'نشتغل معاكم على التفاصيل قبل التصنيع، وننفّذ بمقاسات دقيقة ومواعيد واضحة.',
                                        'We work through details before manufacturing, with accurate dimensions and clear schedules.',
                                    )}
                                </p>

                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {(locale === 'en' ? bulletsEn : bulletsAr).map((line) => (
                                        <div
                                            key={line}
                                            className="rounded-2xl bg-white/5 border border-white/10 p-4 text-[13px] font-semibold"
                                            dir={locale === 'en' ? 'ltr' : 'rtl'}
                                        >
                                            {line}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-4 pb-14">
                    <RevealOnScroll className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="text-2xl sm:text-3xl font-black text-[#2B1702]">
                            {t('engineers.gallery.title', 'جودة تنفيذ في الصور', 'Execution quality in photos')}
                        </h2>
                        <p className="mt-3 text-[14px] leading-7 text-[#2B1702]/80">
                            {t(
                                'engineers.gallery.subtitle',
                                'لقطات من مشاريع تعكس الالتزام بالمخطط، التشطيب، والتنسيق.',
                                'Project shots reflecting drawings, finishing, and coordination.',
                            )}
                        </p>
                        <p
                            className="mt-1 text-[12px] text-[#553B1E]/65"
                            dir={locale === 'en' ? 'ltr' : 'rtl'}
                        >
                            {t(
                                'engineers.gallery.subline',
                                'مشاريع حقيقية — تشطيب وتنسيق واضحين.',
                                'Real projects — finish & coordination you can see.',
                            )}
                        </p>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {engineerGalleryExtended.map((item, index) => (
                            <RevealOnScroll key={item.src + item.labelAr} delayMs={index * 55}>
                                <article className="group rounded-3xl overflow-hidden border border-[#D9D9D9] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.08)]">
                                    <div className="relative aspect-[16/11] overflow-hidden">
                                        <img
                                            src={item.src}
                                            alt={locale === 'en' ? item.labelEn : item.labelAr}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#2B1702]/80 via-transparent to-transparent opacity-90" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3
                                                className="text-white font-black text-[15px]"
                                                dir={locale === 'en' ? 'ltr' : 'rtl'}
                                            >
                                                {locale === 'en' ? item.labelEn : item.labelAr}
                                            </h3>
                                        </div>
                                    </div>
                                </article>
                            </RevealOnScroll>
                        ))}
                    </div>
                </section>

                <section className="border-y border-[#D9D9D9] bg-[#F5F5F5]/90 py-10">
                    <div className="mx-auto max-w-6xl px-4">
                        <RevealOnScroll className="text-center mb-8">
                            <h2 className="text-lg sm:text-xl font-black text-[#2B1702]">
                                {t(
                                    'engineers.marquee.title',
                                    'معرض متحرك — تفاصيل التنفيذ',
                                    'Animated strip — execution details',
                                )}
                            </h2>
                            <p
                                className="mt-1 text-[12px] text-[#553B1E]/70"
                                dir={locale === 'en' ? 'ltr' : 'rtl'}
                            >
                                {t(
                                    'engineers.marquee.hint',
                                    'شريط متحرّك — مرّر المؤشر للإيقاف المؤقت',
                                    'Animated strip — hover to pause',
                                )}
                            </p>
                        </RevealOnScroll>
                    </div>

                    <div className="relative w-full min-w-0 overflow-hidden" dir="ltr">
                        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-16 bg-gradient-to-r from-[#F5F5F5] to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-16 bg-gradient-to-l from-[#F5F5F5] to-transparent" />

                        <div className="engineers-marquee-track flex w-max flex-nowrap items-stretch gap-4 sm:gap-5 will-change-transform">
                            {marqueeItems.map((item, idx) => (
                                <div
                                    key={`${item.src}-${idx}`}
                                    className="flex w-[260px] shrink-0 sm:w-[300px] flex-col overflow-hidden rounded-2xl border border-[#D9D9D9] bg-white shadow-sm"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={item.src}
                                            alt=""
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div
                                        className="px-3 py-2.5 text-[11px] font-semibold text-[#553B1E] text-center"
                                        dir={locale === 'en' ? 'ltr' : 'rtl'}
                                    >
                                        {locale === 'en' ? item.labelEn : item.labelAr}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <style>{`
                            .engineers-marquee-track {
                                animation: engineersMarquee 28s linear infinite;
                            }
                            .engineers-marquee-track:hover {
                                animation-play-state: paused;
                            }
                            @keyframes engineersMarquee {
                                0% {
                                    transform: translate3d(0, 0, 0);
                                }
                                100% {
                                    transform: translate3d(-50%, 0, 0);
                                }
                            }
                            @media (prefers-reduced-motion: reduce) {
                                .engineers-marquee-track {
                                    animation: none;
                                    flex-wrap: wrap;
                                    justify-content: center;
                                    row-gap: 1rem;
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
                </section>

                <section className="mx-auto max-w-6xl px-4 py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <RevealOnScroll>
                            <div className="rounded-[32px] border border-[#D9D9D9] bg-white p-8 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.05)]">
                                <h2 className="text-2xl sm:text-3xl font-black text-[#2B1702]" dir={locale === 'en' ? 'ltr' : 'rtl'}>
                                    {t(
                                        'engineers.delivery.title',
                                        'تسليم مناسب للمهندسين',
                                        'Engineer-friendly delivery',
                                    )}
                                </h2>
                                <div className="mt-6 space-y-3">
                                    {(locale === 'en' ? bulletsEn : bulletsAr).map((line) => (
                                        <div
                                            key={line}
                                            className="flex items-start gap-3 rounded-2xl bg-[#F5F5F5] border border-[#D9D9D9] p-4"
                                        >
                                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#A67C52]" />
                                            <span
                                                className="text-[13px] font-semibold text-[#2B1702]/90"
                                                dir={locale === 'en' ? 'ltr' : 'rtl'}
                                            >
                                                {line}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delayMs={100}>
                            <div
                                id="engineers-contact"
                                className="scroll-mt-28 rounded-[32px] bg-[#2B1702] text-[#F5F5F5] p-8 sm:p-10 h-full flex flex-col justify-center"
                            >
                                <div className="text-[#F8B803] font-extrabold text-[12px]">
                                    {t('engineers.contact.kicker', 'تواصل معنا', 'Contact us')}
                                </div>
                                <h2 className="mt-2 text-2xl sm:text-3xl font-black leading-tight">
                                    {t(
                                        'engineers.contact.title',
                                        'جاهزين ننسّق مع فريقك قبل التصنيع',
                                        'Ready to coordinate with your team before manufacturing',
                                    )}
                                </h2>
                                <p className="mt-3 text-[14px] leading-7 text-[#F5F5F5]/85">
                                    {t(
                                        'engineers.contact.lead',
                                        'اطلب مكالمة أو تواصل كتابي — نرجع لك بخطوات واضحة ومقترح تنفيذ.',
                                        'Request a call or message — we reply with clear steps and an execution plan.',
                                    )}
                                </p>
                                <p
                                    className="mt-2 text-[12px] text-[#C4A484] leading-6"
                                    dir={locale === 'en' ? 'ltr' : 'rtl'}
                                >
                                    {t(
                                        'engineers.contact.subline',
                                        'تواصل معنا للتنسيق، مراجعة المخططات، وخطة التنفيذ.',
                                        'Contact us for coordination, drawings review, and execution plan.',
                                    )}
                                </p>

                                <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                                    <Link
                                        href="/contact"
                                        className="inline-flex justify-center rounded-xl px-6 py-3 text-sm font-semibold bg-[#A67C52] text-[#1B1B18] hover:brightness-[1.05] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {t('engineers.contact.ctaFull', 'صفحة التواصل', 'Contact page')}
                                    </Link>
                                    <a
                                        href="/#contact"
                                        className="inline-flex justify-center rounded-xl px-6 py-3 text-sm font-semibold border border-white/25 bg-white/5 hover:bg-white/10 transition-all duration-300"
                                    >
                                        {t(
                                            'engineers.contact.ctaQuick',
                                            'نموذج سريع (الرئيسية)',
                                            'Quick form (home)',
                                        )}
                                    </a>
                                </div>
                                {waCanUse && (
                                    <a
                                        href={`https://wa.me/${normalized}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-flex text-[13px] font-semibold text-[#C4A484] hover:text-[#A67C52] transition-colors"
                                        dir="ltr"
                                    >
                                        {t('engineers.whatsappPrefix', 'WhatsApp:', 'WhatsApp:')} +{normalized}
                                    </a>
                                )}
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>
            </MarketingLayout>
        </>
    );
}
