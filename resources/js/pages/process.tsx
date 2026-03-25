import { Head } from '@inertiajs/react';
import MarketingLayout from '@/components/marketing/marketing-layout';

export default function Process() {
    return (
        <>
            <Head title="Process" />
            <MarketingLayout>
                <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-black text-[#2B1702]">
                                طريقة العمل
                            </h1>
                            <p className="mt-3 text-[14px] leading-7 text-[#2B1702]/80">
                                English:{' '}
                                <span dir="ltr">A process built for premium outcomes.</span>
                            </p>
                        </div>
                        <div className="rounded-3xl bg-[#A67C52]/10 border border-[#A67C52]/25 p-4">
                            <div className="text-[#553B1E] font-black text-[14px]">Step-by-step build</div>
                            <div className="mt-1 text-[12px] text-[#2B1702]/70" dir="ltr">
                                Measure • Design • Build
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            {
                                n: '01',
                                ar: 'استلام المقاسات',
                                en: 'Measure',
                                descAr:
                                    'تفاصيل دقيقة للمقاس والزوايا عشان التنفيذ يطلع مظبوط.',
                                descEn: 'Exact measurements & angles for perfect execution.',
                            },
                            {
                                n: '02',
                                ar: 'تصميم وموديل 3D',
                                en: '3D Concept',
                                descAr:
                                    'نقترح الستايل والخامات قبل ما نبدأ تصنيع أي جزء.',
                                descEn: 'Pick the style & materials before manufacturing.',
                            },
                            {
                                n: '03',
                                ar: 'تصنيع وتشطيب وتسليم',
                                en: 'Premium Build',
                                descAr:
                                    'تشطيب فخم + متابعة تركيب لحد التسليم النهائي.',
                                descEn: 'Premium finishing with on-site completion.',
                            },
                        ].map((s) => (
                            <div
                                key={s.n}
                                className="rounded-3xl bg-white/80 border border-[#D9D9D9] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.04)]"
                            >
                                <div className="text-[#A67C52] font-extrabold text-lg">
                                    {s.n}
                                </div>
                                <div className="mt-3 text-[#553B1E] font-black text-[16px]">
                                    {s.ar}
                                </div>
                                <div className="mt-2 text-[12px] text-[#2B1702]/70 font-semibold">
                                    <span dir="ltr">{s.en}</span>
                                </div>
                                <div className="mt-3 text-[13px] leading-6 text-[#2B1702]/80">
                                    {s.descAr}
                                </div>
                                <div className="mt-2 text-[12px] leading-5 text-[#2B1702]/60" dir="ltr">
                                    {s.descEn}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 rounded-[32px] bg-[#FFFFFF] border border-[#D9D9D9] p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.05)]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="text-[#A67C52] font-extrabold text-[12px]">
                                    Concept to Delivery
                                </div>
                                <div className="mt-2 text-2xl sm:text-3xl font-black text-[#2B1702]">
                                    الجودة بتبان من أول خطوة
                                </div>
                                <div className="mt-3 text-[14px] leading-7 text-[#2B1702]/80">
                                    بنشتغل بطريقة منظمة عشان المهندس والعميل يبقوا على نفس الصورة قبل التصنيع.
                                </div>
                            </div>
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold bg-[#A67C52] text-[#1B1B18] hover:brightness-[1.03] transition-all"
                            >
                                اطلب تصميم مبدئي
                            </a>
                        </div>
                    </div>
                </section>
            </MarketingLayout>
        </>
    );
}

