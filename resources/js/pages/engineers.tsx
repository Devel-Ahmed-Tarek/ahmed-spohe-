import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '@/components/marketing/marketing-layout';
import { RevealOnScroll } from '@/components/marketing/reveal-on-scroll';
import { engineerGalleryExtended } from '@/data/engineers-content';

function normalizeWhatsappNumber(raw: string): string {
    return raw.replace(/[^\d]/g, '');
}

const engineerBulletsAr = [
    'تنسيق قبل التصنيع',
    'دقة المقاسات والتفاصيل',
    'تنفيذ مطابق للستايل',
    'تسليم منظم وبمواعيد',
];

const engineerBulletsEn = [
    'Built to spec (drawings & details).',
    'Precise measurement control.',
    'Clear schedule & organized installation.',
    'Material coordination before manufacturing.',
];

export default function Engineers() {
    const whatsappNumber = String(import.meta.env.VITE_WHATSAPP_NUMBER || '');
    const normalized = normalizeWhatsappNumber(whatsappNumber);
    const waCanUse = Boolean(normalized);

    const marqueeItems = [...engineerGalleryExtended, ...engineerGalleryExtended];

    return (
        <>
            <Head title="Engineers" />
            <MarketingLayout>
                <section className="mx-auto max-w-6xl px-4 pt-10 pb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
                        <RevealOnScroll>
                            <div className="relative min-h-[280px] lg:min-h-[360px] rounded-[32px] overflow-hidden border border-[#D9D9D9] shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                                <img
                                    src="/images/projects/kitchen-09.png"
                                    alt="تنفيذ للمهندسين"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1702]/90 via-[#2B1702]/25 to-transparent" />
                                <div className="relative z-10 p-8 flex flex-col justify-end h-full min-h-[280px] lg:min-h-[360px]">
                                    <span className="text-[#F8B803] text-xs font-bold uppercase tracking-[0.14em]">
                                        For engineers & contractors
                                    </span>
                                    <p className="mt-2 text-white/90 text-[14px] leading-7 max-w-md">
                                        تنفيذ مطابق للمخططات بمستوى تشطيب فخم—وبتنسيق واضح قبل ما تبدأ
                                        التصنيع.
                                    </p>
                                </div>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delayMs={90}>
                            <div className="rounded-[32px] bg-[#2B1702] text-[#F5F5F5] p-8 sm:p-10 h-full flex flex-col justify-center">
                                <h1 className="text-3xl sm:text-4xl font-black leading-tight">للمهندسين</h1>
                                <p className="mt-3 text-[14px] leading-7 text-[#F5F5F5]/85">
                                    نشتغل معاكم على التفاصيل قبل التصنيع، وننفّذ بمقاسات دقيقة ومواعيد
                                    واضحة.
                                </p>

                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {engineerBulletsAr.map((t) => (
                                        <div
                                            key={t}
                                            className="rounded-2xl bg-white/5 border border-white/10 p-4 text-[13px] font-semibold"
                                        >
                                            {t}
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
                            جودة تنفيذ في الصور
                        </h2>
                        <p className="mt-3 text-[14px] leading-7 text-[#2B1702]/80">
                            لقطات من مشاريع تعكس الالتزام بالمخطط، التشطيب، والتنسيق.
                        </p>
                        <p className="mt-1 text-[12px] text-[#553B1E]/65" dir="ltr">
                            Real projects — finish & coordination you can see.
                        </p>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {engineerGalleryExtended.map((item, index) => (
                            <RevealOnScroll key={item.src + item.labelAr} delayMs={index * 55}>
                                <article className="group rounded-3xl overflow-hidden border border-[#D9D9D9] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.08)]">
                                    <div className="relative aspect-[16/11] overflow-hidden">
                                        <img
                                            src={item.src}
                                            alt={item.labelAr}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#2B1702]/80 via-transparent to-transparent opacity-90" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="text-white font-black text-[15px]">{item.labelAr}</h3>
                                            <p
                                                className="text-[11px] text-white/85 font-semibold mt-0.5"
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
                </section>

                <section className="border-y border-[#D9D9D9] bg-[#F5F5F5]/90 py-10">
                    <div className="mx-auto max-w-6xl px-4">
                        <RevealOnScroll className="text-center mb-8">
                            <h2 className="text-lg sm:text-xl font-black text-[#2B1702]">
                                معرض متحرك — تفاصيل التنفيذ
                            </h2>
                            <p className="mt-1 text-[12px] text-[#553B1E]/70" dir="ltr">
                                Animated strip — hover to pause
                            </p>
                        </RevealOnScroll>
                    </div>

                    {/* عرض كامل للشريط (خارج max-w-6xl) حتى ما يظهر فراغ على الجانب */}
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
                                    <div className="px-3 py-2.5 text-[11px] font-semibold text-[#553B1E] text-center">
                                        {item.labelAr}
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
                                <h2 className="text-2xl sm:text-3xl font-black text-[#2B1702]">
                                    Engineer-friendly delivery
                                </h2>
                                <div className="mt-6 space-y-3">
                                    {engineerBulletsEn.map((t) => (
                                        <div
                                            key={t}
                                            className="flex items-start gap-3 rounded-2xl bg-[#F5F5F5] border border-[#D9D9D9] p-4"
                                        >
                                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#A67C52]" />
                                            <span className="text-[13px] font-semibold text-[#2B1702]/90" dir="ltr">
                                                {t}
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
                                <div className="text-[#F8B803] font-extrabold text-[12px]">تواصل معنا</div>
                                <h2 className="mt-2 text-2xl sm:text-3xl font-black leading-tight">
                                    جاهزين ننسّق مع فريقك قبل التصنيع
                                </h2>
                                <p className="mt-3 text-[14px] leading-7 text-[#F5F5F5]/85">
                                    اطلب مكالمة أو تواصل كتابي — نرجع لك بخطوات واضحة ومقترح تنفيذ.
                                </p>
                                <p className="mt-2 text-[12px] text-[#C4A484] leading-6" dir="ltr">
                                    Contact us for coordination, drawings review, and execution plan.
                                </p>

                                <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                                    <Link
                                        href="/contact"
                                        className="inline-flex justify-center rounded-xl px-6 py-3 text-sm font-semibold bg-[#A67C52] text-[#1B1B18] hover:brightness-[1.05] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        صفحة التواصل
                                    </Link>
                                    <a
                                        href="/#contact"
                                        className="inline-flex justify-center rounded-xl px-6 py-3 text-sm font-semibold border border-white/25 bg-white/5 hover:bg-white/10 transition-all duration-300"
                                    >
                                        نموذج سريع (الرئيسية)
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
                                        WhatsApp: +{normalized}
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
