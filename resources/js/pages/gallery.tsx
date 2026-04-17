import { Head, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import MarketingLayout from '@/components/marketing/marketing-layout';
import { useCms } from '@/hooks/use-cms';

const defaultGalleryImages = [
    '/images/projects/kitchen-01.png',
    '/images/projects/kitchen-02.png',
    '/images/projects/kitchen-03.png',
    '/images/projects/kitchen-04.png',
    '/images/projects/kitchen-05.png',
    '/images/projects/kitchen-06.png',
    '/images/projects/kitchen-07.png',
    '/images/projects/kitchen-08.png',
    '/images/projects/kitchen-09.png',
    '/images/projects/kitchen-10.png',
    '/images/projects/kitchen-11.png',
];

type GalleryCard = {
    id: number;
    image: string;
    labelAr: string | null;
    labelEn: string | null;
    taglineAr: string | null;
    taglineEn: string | null;
};

export default function Gallery() {
    const { t, locale } = useCms();
    const { props } = usePage<{
        galleryItems?: Array<{
            id: number;
            image: string;
            labelAr: string | null;
            labelEn: string | null;
            taglineAr: string | null;
            taglineEn: string | null;
        }>;
    }>();

    const cards = useMemo<GalleryCard[]>(() => {
        const rows = props.galleryItems ?? [];
        const fromDb = rows
            .filter((g) => g.image?.trim())
            .map((g) => ({
                id: g.id,
                image: g.image,
                labelAr: g.labelAr,
                labelEn: g.labelEn,
                taglineAr: g.taglineAr,
                taglineEn: g.taglineEn,
            }));
        if (fromDb.length > 0) {
            return fromDb;
        }
        return defaultGalleryImages.map((image, idx) => ({
            id: -(idx + 1),
            image,
            labelAr: null,
            labelEn: null,
            taglineAr: null,
            taglineEn: null,
        }));
    }, [props.galleryItems]);

    const dir = locale === 'en' ? 'ltr' : 'rtl';

    return (
        <>
            <Head title={t('gallery.page.title', 'المعرض', 'Gallery')} />
            <MarketingLayout>
                <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
                    <div dir={dir}>
                        <h1 className="text-3xl sm:text-4xl font-black text-[#2B1702]">
                            {t('gallery.page.title', 'المعرض', 'Gallery')}
                        </h1>
                        <p className="mt-3 text-[14px] leading-7 text-[#2B1702]/80">
                            {t(
                                'gallery.page.lead',
                                'استايلات وتشطيبات تناسب الشقق والفلل — مجموعة صور من نماذج مطابخ متنوعة.',
                                'Styles and finishes for apartments and villas — a selection of kitchen showcases.',
                            )}
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cards.map((item, idx) => {
                            const n = idx + 1;
                            const pad = String(n).padStart(2, '0');
                            const fbProject = t('gallery.fallback.project', 'مشروع', 'Project');
                            const fbTagline = t(
                                'gallery.fallback.tagline',
                                'مودرن / تشطيب فاخر',
                                'Modern / Premium finish',
                            );

                            const primaryLabel =
                                locale === 'en'
                                    ? item.labelEn?.trim() || item.labelAr?.trim()
                                    : item.labelAr?.trim() || item.labelEn?.trim();
                            const primaryTagline =
                                locale === 'en'
                                    ? item.taglineEn?.trim() || item.taglineAr?.trim()
                                    : item.taglineAr?.trim() || item.taglineEn?.trim();

                            const title =
                                primaryLabel || `${fbProject} ${pad}`;
                            const tagline = primaryTagline || fbTagline;
                            const alt = primaryLabel || `${fbProject} ${n}`;

                            return (
                                <div
                                    key={item.id}
                                    className="rounded-3xl bg-white/80 border border-[#D9D9D9] overflow-hidden"
                                >
                                    <img
                                        src={item.image}
                                        alt={alt}
                                        className="h-52 w-full object-cover"
                                    />
                                    <div className="p-5" dir={dir}>
                                        <div className="font-black text-[#2B1702]">{title}</div>
                                        <div className="mt-1 text-[12px] text-[#2B1702]/70">{tagline}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </MarketingLayout>
        </>
    );
}
