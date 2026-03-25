import { Head } from '@inertiajs/react';
import MarketingLayout from '@/components/marketing/marketing-layout';

export default function About() {
    return (
        <>
            <Head title="About" />
            <MarketingLayout>
                <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
                    <div className="rounded-[32px] bg-[#FFFFFF] border border-[#D9D9D9] p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.05)]">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-black text-[#2B1702] leading-[1.1]">
                                    عن شركتنا
                                </h1>
                                <p className="mt-3 text-[14px] leading-7 text-[#2B1702]/80">
                                    <span className="font-semibold">English:</span>{' '}
                                    <span dir="ltr">
                                        Premium kitchen design & build, tailored for apartments and villas.
                                    </span>
                                </p>
                            </div>

                            <div className="rounded-3xl bg-[#F5F5F5] border border-[#D9D9D9] p-4">
                                <div className="text-[#A67C52] font-extrabold text-[12px]">
                                    Luxury standards
                                </div>
                                <div className="mt-1 font-black text-[#553B1E]">
                                    Design • Build • Finish
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                {
                                    titleAr: 'تشطيب فخم',
                                    titleEn: 'Premium Finishing',
                                    textAr: 'تفاصيل دقيقة وخامات مختارة عشان شكل نهائي يستمر.',
                                    textEn: 'Careful details and curated materials for a lasting finish.',
                                },
                                {
                                    titleAr: 'تصميم واضح قبل التصنيع',
                                    titleEn: 'Concept Before Cut',
                                    textAr: 'بنجهز تصور يطمنك: ستايل + ألوان + توزيع قبل ما نبدأ تصنيع.',
                                    textEn: 'A clear concept: style, colors, and layout before manufacturing.',
                                },
                                {
                                    titleAr: 'دقة تنفيذ',
                                    titleEn: 'Build Precision',
                                    textAr: 'تنفيذ مطابق مع المتابعة لحد التسليم النهائي.',
                                    textEn: 'Built to match with full follow-up until final delivery.',
                                },
                            ].map((c) => (
                                <div
                                    key={c.titleEn}
                                    className="rounded-3xl bg-white/80 border border-[#D9D9D9] p-6"
                                >
                                    <div className="text-[#553B1E] font-black text-[16px]">
                                        {c.titleAr}
                                    </div>
                                    <div className="mt-1 text-[12px] text-[#2B1702]/70 font-semibold">
                                        <span dir="ltr">{c.titleEn}</span>
                                    </div>
                                    <div className="mt-3 text-[13px] leading-6 text-[#2B1702]/80">
                                        {c.textAr}
                                    </div>
                                    <div className="mt-2 text-[12px] leading-5 text-[#2B1702]/60" dir="ltr">
                                        {c.textEn}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                            <div className="text-[12px] text-[#2B1702]/70 leading-5">
                                <div className="font-semibold text-[#553B1E]">For premium clients</div>
                                <div>Designed for discerning individuals & engineers.</div>
                            </div>
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold bg-[#A67C52] text-[#1B1B18] hover:brightness-[1.03] transition-all"
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

