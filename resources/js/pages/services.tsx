import { Head } from '@inertiajs/react';
import MarketingLayout from '@/components/marketing/marketing-layout';

export default function Services() {
    return (
        <>
            <Head title="Services" />
            <MarketingLayout>
                <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-black text-[#2B1702]">
                            خدماتنا
                        </h1>
                        <p className="mt-3 text-[14px] leading-7 text-[#2B1702]/80">
                            تصميم + تصنيع + تركيب مطابخ فخمة، مناسب للشقق والفلل
                            <span className="text-[#A67C52] font-semibold"> بمستوى مختلف </span>
                            من التفاصيل.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            {
                                ar: 'مطابخ مودرن فخم',
                                en: 'Luxury Modern Kitchens',
                                descAr: 'خطوط نظيفة + خامات مختارة + تشطيب راقي.',
                                descEn: 'Clean lines with curated materials and premium finishing.',
                            },
                            {
                                ar: 'خشب فخم وتشطيبات دافي',
                                en: 'Warm Wood Finishes',
                                descAr: 'ألوان خشب ودهانات بتطلع “طبقة رقية”.',
                                descEn: 'Wood tones & luxury coatings with a premium look.',
                            },
                            {
                                ar: 'لاكيه مات أو فلات',
                                en: 'Matte Lacquer / Flat',
                                descAr: 'شكل ناعم وراقي مع ثبات أعلى.',
                                descEn: 'Smooth premium look with long-term durability.',
                            },
                            {
                                ar: 'تصميم على المقاس',
                                en: 'Made-to-Size',
                                descAr: 'تفصيل دقيق بناءً على المقاسات والمخططات.',
                                descEn: 'Exact build based on measurements & drawings.',
                            },
                            {
                                ar: 'تشطيب وتسليم منظم',
                                en: 'Organized Delivery',
                                descAr: 'متابعة للتركيب لحد التسليم النهائي.',
                                descEn: 'On-site follow-up until final handover.',
                            },
                            {
                                ar: 'للمقاولين والمهندسين',
                                en: 'For Engineers',
                                descAr: 'تنسيق قبل التصنيع + تنفيذ مطابق.',
                                descEn: 'Coordination before manufacturing and matching execution.',
                            },
                        ].map((s) => (
                            <div
                                key={s.en}
                                className="rounded-3xl bg-white/80 border border-[#D9D9D9] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.04)]"
                            >
                                <div className="text-[#553B1E] font-black text-[16px]">
                                    {s.ar}
                                </div>
                                <div className="mt-1 text-[12px] text-[#2B1702]/70 font-semibold">
                                    <span dir="ltr">{s.en}</span>
                                </div>
                                <div className="mt-4 text-[13px] leading-6 text-[#2B1702]/80">
                                    {s.descAr}
                                </div>
                                <div className="mt-2 text-[12px] leading-5 text-[#2B1702]/60" dir="ltr">
                                    {s.descEn}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 rounded-[32px] bg-[#2B1702] text-[#F5F5F5] p-8 sm:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="text-[#F8B803] font-extrabold text-[12px]">Premium Start</div>
                                <div className="mt-2 text-2xl sm:text-3xl font-black leading-tight">
                                    ابدأ بتصميم مبدئي وخطة تنفيذ واضحة
                                </div>
                                <div className="mt-3 text-[14px] leading-7 text-[#F5F5F5]/85">
                                    English: <span dir="ltr">Get a concept + clear build plan.</span>
                                </div>
                            </div>
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold border border-white/20 bg-white/5 hover:bg-white/10 transition-all"
                            >
                                اطلب تواصل الآن
                            </a>
                        </div>
                    </div>
                </section>
            </MarketingLayout>
        </>
    );
}

