import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import MarketingLayout from '@/components/marketing/marketing-layout';
import { RevealOnScroll } from '@/components/marketing/reveal-on-scroll';
import { useCms } from '@/hooks/use-cms';
import { marketingServices, type MarketingService } from '@/data/marketing-services';

export default function Services() {
    const { t, locale } = useCms();
    const isEn = locale === 'en';
    const { props } = usePage<{
        marketingServices?: Array<{
            id: number;
            ar: string;
            en: string;
            descAr: string;
            descEn: string;
            image: string;
            imageAlt: string;
        }>;
    }>();

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

    const pageTitle = t('services.page.metaTitle', 'الخدمات', 'Services');

    return (
        <>
            <Head title={pageTitle} />
            <MarketingLayout>
                <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
                    <RevealOnScroll>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-black text-[#2B1702]">
                                {t('services.page.heroTitle', 'خدماتنا', 'Our Services')}
                            </h1>
                            <p
                                className="mt-3 text-[14px] leading-7 text-[#2B1702]/80"
                                dir={isEn ? 'ltr' : 'rtl'}
                            >
                                {t(
                                    'services.page.leadPart1',
                                    'تصميم + تصنيع + تركيب مطابخ فخمة، مناسب للشقق والفلل',
                                    'Design, manufacturing, and installation of luxury kitchens for apartments and villas',
                                )}
                                <span className="text-[#A67C52] font-semibold">
                                    {' '}
                                    {t(
                                        'services.page.leadHighlight',
                                        'بمستوى مختلف',
                                        'at a different level',
                                    )}
                                    {' '}
                                </span>
                                {t('services.page.leadPart2', 'من التفاصيل.', 'in the details.')}
                            </p>
                        </div>
                    </RevealOnScroll>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {serviceCards.map((s, index) => (
                            <RevealOnScroll key={s.id ?? s.en} delayMs={index * 55}>
                                <article className="group rounded-3xl overflow-hidden bg-white/80 border border-[#D9D9D9] shadow-[0_24px_60px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.07)]">
                                    <div className="relative aspect-[16/11] overflow-hidden">
                                        <img
                                            src={s.image}
                                            alt={isEn && s.imageAlt?.trim() ? s.imageAlt : s.ar}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                                        <div
                                            className="absolute bottom-3 right-3 left-3"
                                            dir={isEn ? 'ltr' : 'rtl'}
                                        >
                                            <div className="text-white font-black text-[15px] drop-shadow-sm">
                                                {isEn && s.en?.trim() ? s.en : s.ar}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 pt-5" dir={isEn ? 'ltr' : 'rtl'}>
                                        <div className="text-[13px] leading-6 text-[#2B1702]/85">
                                            {isEn && s.descEn?.trim() ? s.descEn : s.descAr}
                                        </div>
                                    </div>
                                </article>
                            </RevealOnScroll>
                        ))}
                    </div>

                    <RevealOnScroll delayMs={120}>
                        <div className="mt-10 rounded-[32px] bg-[#2B1702] text-[#F5F5F5] p-8 sm:p-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                <div dir={isEn ? 'ltr' : 'rtl'}>
                                    <div className="text-[#F8B803] font-extrabold text-[12px]">
                                        {t('services.page.ctaBadge', 'بداية احترافية', 'Premium Start')}
                                    </div>
                                    <div className="mt-2 text-2xl sm:text-3xl font-black leading-tight">
                                        {t(
                                            'services.page.ctaTitle',
                                            'ابدأ بتصميم مبدئي وخطة تنفيذ واضحة',
                                            'Start with a concept and a clear build plan',
                                        )}
                                    </div>
                                    <div className="mt-3 text-[14px] leading-7 text-[#F5F5F5]/85">
                                        {t(
                                            'services.page.ctaBody',
                                            'نركّز على وضوح الخطوات والتزام بالمقاسات والتفاصيل حتى التسليم.',
                                            'We focus on clear steps, measurements, and details through handover.',
                                        )}
                                    </div>
                                </div>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {t('services.page.ctaButton', 'اطلب تواصل الآن', 'Contact us now')}
                                </Link>
                            </div>
                        </div>
                    </RevealOnScroll>
                </section>
            </MarketingLayout>
        </>
    );
}
