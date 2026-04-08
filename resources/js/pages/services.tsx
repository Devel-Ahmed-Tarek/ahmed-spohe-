import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '@/components/marketing/marketing-layout';
import { RevealOnScroll } from '@/components/marketing/reveal-on-scroll';
import { marketingServices } from '@/data/marketing-services';

export default function Services() {
    return (
        <>
            <Head title="Services" />
            <MarketingLayout>
                <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
                    <RevealOnScroll>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-black text-[#2B1702]">خدماتنا</h1>
                            <p className="mt-3 text-[14px] leading-7 text-[#2B1702]/80">
                                تصميم + تصنيع + تركيب مطابخ فخمة، مناسب للشقق والفلل
                                <span className="text-[#A67C52] font-semibold"> بمستوى مختلف </span>
                                من التفاصيل.
                            </p>
                        </div>
                    </RevealOnScroll>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {marketingServices.map((s, index) => (
                            <RevealOnScroll key={s.en} delayMs={index * 55}>
                                <article className="group rounded-3xl overflow-hidden bg-white/80 border border-[#D9D9D9] shadow-[0_24px_60px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.07)]">
                                    <div className="relative aspect-[16/11] overflow-hidden">
                                        <img
                                            src={s.image}
                                            alt={s.imageAlt}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                                        <div className="absolute bottom-3 right-3 left-3">
                                            <div className="text-white font-black text-[15px] drop-shadow-sm">
                                                {s.ar}
                                            </div>
                                            <div className="mt-0.5 text-[11px] text-white/90 font-semibold" dir="ltr">
                                                {s.en}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 pt-5">
                                        <div className="text-[13px] leading-6 text-[#2B1702]/85">{s.descAr}</div>
                                        <div
                                            className="mt-3 text-[12px] leading-5 text-[#2B1702]/60"
                                            dir="ltr"
                                        >
                                            {s.descEn}
                                        </div>
                                    </div>
                                </article>
                            </RevealOnScroll>
                        ))}
                    </div>

                    <RevealOnScroll delayMs={120}>
                        <div className="mt-10 rounded-[32px] bg-[#2B1702] text-[#F5F5F5] p-8 sm:p-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                <div>
                                    <div className="text-[#F8B803] font-extrabold text-[12px]">Premium Start</div>
                                    <div className="mt-2 text-2xl sm:text-3xl font-black leading-tight">
                                        ابدأ بتصميم مبدئي وخطة تنفيذ واضحة
                                    </div>
                                    <div className="mt-3 text-[14px] leading-7 text-[#F5F5F5]/85">
                                        English:{' '}
                                        <span dir="ltr">Get a concept + clear build plan.</span>
                                    </div>
                                </div>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    اطلب تواصل الآن
                                </Link>
                            </div>
                        </div>
                    </RevealOnScroll>
                </section>
            </MarketingLayout>
        </>
    );
}
