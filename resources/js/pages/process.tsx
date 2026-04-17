import { Head, Link } from '@inertiajs/react';
import { useMemo } from 'react';
import MarketingLayout from '@/components/marketing/marketing-layout';
import { useCms } from '@/hooks/use-cms';

export default function Process() {
    const { t, locale } = useCms();
    const isEn = locale === 'en';
    const dir = isEn ? 'ltr' : 'rtl';

    const steps = useMemo(
        () => [
            {
                n: '01',
                title: isEn
                    ? t('process.step1.enTitle', 'Measure', 'Measure')
                    : t('process.step1.arTitle', 'استلام المقاسات', 'Measurements'),
                desc: isEn
                    ? t(
                          'process.step1.descEn',
                          'Exact measurements & angles for perfect execution.',
                          'Exact measurements & angles for perfect execution.',
                      )
                    : t(
                          'process.step1.descAr',
                          'تفاصيل دقيقة للمقاس والزوايا عشان التنفيذ يطلع مظبوط.',
                          'Accurate dimensions and angles for correct execution.',
                      ),
            },
            {
                n: '02',
                title: isEn
                    ? t('process.step2.enTitle', '3D Concept', '3D Concept')
                    : t('process.step2.arTitle', 'تصميم وموديل 3D', '3D design'),
                desc: isEn
                    ? t(
                          'process.step2.descEn',
                          'Pick the style & materials before manufacturing.',
                          'Pick the style & materials before manufacturing.',
                      )
                    : t(
                          'process.step2.descAr',
                          'نقترح الستايل والخامات قبل ما نبدأ تصنيع أي جزء.',
                          'We propose style and materials before manufacturing starts.',
                      ),
            },
            {
                n: '03',
                title: isEn
                    ? t('process.step3.enTitle', 'Premium Build', 'Premium Build')
                    : t('process.step3.arTitle', 'تصنيع وتشطيب وتسليم', 'Build & handover'),
                desc: isEn
                    ? t(
                          'process.step3.descEn',
                          'Premium finishing with on-site completion.',
                          'Premium finishing with on-site completion.',
                      )
                    : t(
                          'process.step3.descAr',
                          'تشطيب فخم + متابعة تركيب لحد التسليم النهائي.',
                          'Premium finishing and installation follow-up to final handover.',
                      ),
            },
        ],
        [t, isEn],
    );

    const heroLead = isEn
        ? t(
              'process.hero.subtitleEn',
              'عملية مبنية لنتائج فاخرة.',
              'A process built for premium outcomes.',
          )
        : t(
              'process.hero.subtitleAr',
              'خطوات واضحة من القياس حتى التسليم.',
              'Clear steps from measure to handover.',
          );

    return (
        <>
            <Head title={t('process.meta.title', 'طريقة العمل', 'Process')} />
            <MarketingLayout>
                <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div dir={dir}>
                            <h1 className="text-3xl sm:text-4xl font-black text-[#2B1702]">
                                {t('process.hero.title', 'طريقة العمل', 'Our process')}
                            </h1>
                            <p className="mt-3 text-[14px] leading-7 text-[#2B1702]/80">{heroLead}</p>
                        </div>
                        <div className="rounded-3xl bg-[#A67C52]/10 border border-[#A67C52]/25 p-4" dir={dir}>
                            <div className="text-[#553B1E] font-black text-[14px]">
                                {t(
                                    'process.steps.boxTitle',
                                    'تنفيذ خطوة بخطوة',
                                    'Step-by-step build',
                                )}
                            </div>
                            <div className="mt-1 text-[12px] text-[#2B1702]/70">
                                {t(
                                    'process.steps.boxSubline',
                                    'قياس • تصميم • تصنيع',
                                    'Measure • Design • Build',
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {steps.map((s) => (
                            <div
                                key={s.n}
                                className="rounded-3xl bg-white/80 border border-[#D9D9D9] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.04)]"
                                dir={dir}
                            >
                                <div className="text-[#A67C52] font-extrabold text-lg">{s.n}</div>
                                <div className="mt-3 text-[#553B1E] font-black text-[16px]">{s.title}</div>
                                <div className="mt-3 text-[13px] leading-6 text-[#2B1702]/80">{s.desc}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 rounded-[32px] bg-[#FFFFFF] border border-[#D9D9D9] p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.05)]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div dir={dir}>
                                <div className="text-[#A67C52] font-extrabold text-[12px]">
                                    {t(
                                        'process.bottom.badge',
                                        'من الفكرة إلى التسليم',
                                        'Concept to Delivery',
                                    )}
                                </div>
                                <div className="mt-2 text-2xl sm:text-3xl font-black text-[#2B1702]">
                                    {t(
                                        'process.bottom.title',
                                        'الجودة بتبان من أول خطوة',
                                        'Quality shows from step one',
                                    )}
                                </div>
                                <div className="mt-3 text-[14px] leading-7 text-[#2B1702]/80">
                                    {t(
                                        'process.bottom.body',
                                        'بنشتغل بطريقة منظمة عشان المهندس والعميل يبقوا على نفس الصورة قبل التصنيع.',
                                        'We work in a structured way so engineers and clients share the same picture before manufacturing.',
                                    )}
                                </div>
                            </div>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold bg-[#A67C52] text-[#1B1B18] hover:brightness-[1.03] transition-all"
                            >
                                {t('process.bottom.cta', 'اطلب تصميم مبدئي', 'Request a design draft')}
                            </Link>
                        </div>
                    </div>
                </section>
            </MarketingLayout>
        </>
    );
}
