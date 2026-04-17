import { Head } from '@inertiajs/react';
import { useMemo } from 'react';
import MarketingLayout from '@/components/marketing/marketing-layout';
import { useCms } from '@/hooks/use-cms';

export default function About() {
    const { t, locale } = useCms();

    const cards = useMemo(
        () => [
            {
                title: t('about.card1.title', 'تشطيب فخم', 'Premium Finishing'),
                body: t(
                    'about.card1.body',
                    'تفاصيل دقيقة وخامات مختارة عشان شكل نهائي يستمر.',
                    'Careful details and curated materials for a lasting finish.',
                ),
            },
            {
                title: t('about.card2.title', 'تصميم واضح قبل التصنيع', 'Concept Before Cut'),
                body: t(
                    'about.card2.body',
                    'بنجهز تصور يطمنك: ستايل + ألوان + توزيع قبل ما نبدأ تصنيع.',
                    'A clear concept: style, colors, and layout before manufacturing.',
                ),
            },
            {
                title: t('about.card3.title', 'دقة تنفيذ', 'Build Precision'),
                body: t(
                    'about.card3.body',
                    'تنفيذ مطابق مع المتابعة لحد التسليم النهائي.',
                    'Built to match with full follow-up until final delivery.',
                ),
            },
        ],
        [t],
    );

    const dir = locale === 'en' ? 'ltr' : 'rtl';

    return (
        <>
            <Head title={t('about.page.metaTitle', 'عن الشركة', 'About')} />
            <MarketingLayout>
                <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
                    <div className="rounded-[32px] bg-[#FFFFFF] border border-[#D9D9D9] p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.05)]">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            <div dir={dir}>
                                <h1 className="text-3xl sm:text-4xl font-black text-[#2B1702] leading-[1.1]">
                                    {t('about.page.heroTitle', 'عن شركتنا', 'About us')}
                                </h1>
                                <p className="mt-3 text-[14px] leading-7 text-[#2B1702]/80">
                                    {t(
                                        'about.page.heroLead',
                                        'تصميم وتنفيذ مطابخ فاخرة للشقق والفلل والمهندسين، بخطوات واضحة من القياس حتى التسليم.',
                                        'Premium kitchen design & build for apartments, villas, and engineers — clear steps from measure to handover.',
                                    )}
                                </p>
                            </div>

                            <div
                                className="rounded-3xl bg-[#F5F5F5] border border-[#D9D9D9] p-4"
                                dir={dir}
                            >
                                <div className="text-[#A67C52] font-extrabold text-[12px]">
                                    {t('about.side.badge', 'معايير فاخرة', 'Luxury standards')}
                                </div>
                                <div className="mt-1 font-black text-[#553B1E]">
                                    {t('about.side.title', 'تصميم • تصنيع • تشطيب', 'Design • Build • Finish')}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {cards.map((c) => (
                                <div
                                    key={c.title}
                                    className="rounded-3xl bg-white/80 border border-[#D9D9D9] p-6"
                                    dir={dir}
                                >
                                    <div className="text-[#553B1E] font-black text-[16px]">{c.title}</div>
                                    <div className="mt-3 text-[13px] leading-6 text-[#2B1702]/80">{c.body}</div>
                                </div>
                            ))}
                        </div>

                        <div
                            className="mt-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between"
                            dir={dir}
                        >
                            <div className="text-[12px] text-[#2B1702]/70 leading-5">
                                <div className="font-semibold text-[#553B1E]">
                                    {t('about.footer.tagline', 'للطبقة الراقية', 'For premium clients')}
                                </div>
                                <div>
                                    {t(
                                        'about.footer.line',
                                        'تصميم يخدم الأفراد والمهندسين.',
                                        'Designed for discerning individuals & engineers.',
                                    )}
                                </div>
                            </div>
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold bg-[#A67C52] text-[#1B1B18] hover:brightness-[1.03] transition-all"
                            >
                                {t('about.footer.cta', 'اطلب تواصل الآن', 'Contact us now')}
                            </a>
                        </div>
                    </div>
                </section>
            </MarketingLayout>
        </>
    );
}
