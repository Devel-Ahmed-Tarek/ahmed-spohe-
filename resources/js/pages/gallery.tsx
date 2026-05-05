import { Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MarketingLayout from '@/components/marketing/marketing-layout';
import { useCms } from '@/hooks/use-cms';
import { cn } from '@/lib/utils';

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

type GalleryCategory = {
    id: number;
    nameAr: string;
    nameEn: string;
    slug: string;
};

type GalleryCard = {
    id: number;
    image: string;
    labelAr: string | null;
    labelEn: string | null;
    taglineAr: string | null;
    taglineEn: string | null;
    category: GalleryCategory | null;
};

export default function Gallery() {
    const { t, locale } = useCms();
    const { props } = usePage<{
        galleryCategories?: GalleryCategory[];
        galleryItems?: Array<{
            id: number;
            image: string;
            labelAr: string | null;
            labelEn: string | null;
            taglineAr: string | null;
            taglineEn: string | null;
            category?: GalleryCategory | null;
        }>;
    }>();

    const [activeCategoryId, setActiveCategoryId] = useState<number | 'all'>('all');

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
                category: g.category ?? null,
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
            category: null,
        }));
    }, [props.galleryItems]);

    const categories = props.galleryCategories ?? [];

    const filteredCards = useMemo(() => {
        if (activeCategoryId === 'all') {
            return cards;
        }
        return cards.filter((c) => c.category?.id === activeCategoryId);
    }, [cards, activeCategoryId]);

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

                    {categories.length > 0 ? (
                        <div className="mt-8" dir={dir}>
                            <p className="text-[12px] font-semibold uppercase tracking-wider text-[#553B1E]/75">
                                {t('gallery.filter.hint', 'صفّي المشاريع حسب التصنيف.', 'Filter projects by category.')}
                            </p>
                            <div
                                className="mt-3 flex flex-wrap gap-2"
                                role="tablist"
                                aria-label={t('gallery.page.title', 'المعرض', 'Gallery')}
                            >
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={activeCategoryId === 'all'}
                                    onClick={() => setActiveCategoryId('all')}
                                    className={cn(
                                        'rounded-full border px-4 py-2 text-[13px] font-semibold transition',
                                        activeCategoryId === 'all'
                                            ? 'border-[#A67C52] bg-[#553B1E] text-[#F5F5F5] shadow-[0_8px_24px_rgba(85,59,30,0.22)]'
                                            : 'border-[#D9D9D9] bg-white/90 text-[#553B1E] hover:border-[#A67C52]/5',
                                    )}
                                >
                                    {t('gallery.filter.all', 'الكل', 'All')}
                                </button>
                                {categories.map((cat) => {
                                    const label =
                                        locale === 'en' ? cat.nameEn || cat.nameAr : cat.nameAr || cat.nameEn;
                                    return (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            role="tab"
                                            aria-selected={activeCategoryId === cat.id}
                                            onClick={() => setActiveCategoryId(cat.id)}
                                            className={cn(
                                                'rounded-full border px-4 py-2 text-[13px] font-semibold transition',
                                                activeCategoryId === cat.id
                                                    ? 'border-[#A67C52] bg-[#553B1E] text-[#F5F5F5] shadow-[0_8px_24px_rgba(85,59,30,0.22)]'
                                                    : 'border-[#D9D9D9] bg-white/90 text-[#553B1E] hover:border-[#A67C52]/5',
                                            )}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ) : null}

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredCards.map((item, idx) => {
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

                            const catLabel =
                                item.category &&
                                (locale === 'en'
                                    ? item.category.nameEn || item.category.nameAr
                                    : item.category.nameAr || item.category.nameEn);

                            return (
                                <div
                                    key={item.id}
                                    className="overflow-hidden rounded-3xl border border-[#D9D9D9] bg-white/80"
                                >
                                    <img
                                        src={item.image}
                                        alt={alt}
                                        className="h-52 w-full object-cover"
                                    />
                                    <div className="p-5" dir={dir}>
                                        {catLabel ? (
                                            <div className="mb-2 inline-block rounded-full border border-[#A67C52]/35 bg-[#F5F5F5]/90 px-2.5 py-0.5 text-[11px] font-bold text-[#553B1E]">
                                                {catLabel}
                                            </div>
                                        ) : null}
                                        <div className="font-black text-[#2B1702]">{title}</div>
                                        <div className="mt-1 text-[12px] text-[#2B1702]/70">{tagline}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredCards.length === 0 ? (
                        <p className="mt-8 text-center text-sm text-[#2B1702]/70" dir={dir}>
                            {t(
                                'gallery.filter.empty',
                                'لا توجد مشاريع في هذا التصنيف.',
                                'No projects in this category.',
                            )}
                        </p>
                    ) : null}
                </section>
            </MarketingLayout>
        </>
    );
}
